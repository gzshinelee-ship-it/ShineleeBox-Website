const fs = require('fs');
const path = require('path');
const { headTemplate, headerTemplate, footerTemplate } = require('./templates');

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function parseCSV(content) {
    content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = [];
    let currentLine = '';
    let inQuotes = false;
    
    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        if (char === '"') inQuotes = !inQuotes;
        if (char === '\n' && !inQuotes) {
            lines.push(currentLine);
            currentLine = '';
        } else {
            currentLine += char;
        }
    }
    if (currentLine) lines.push(currentLine);

    if (lines.length === 0) return [];
    
    const headerRow = lines[0].replace(/^\uFEFF/, '').trim();
    const headers = [];
    let cell = '';
    inQuotes = false;
    for (let j = 0; j < headerRow.length; j++) {
        const char = headerRow[j];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
            headers.push(cell.trim());
            cell = '';
        } else cell += char;
    }
    headers.push(cell.trim());

    const records = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        const record = {};
        let cellContent = '';
        inQuotes = false;
        let headerIndex = 0;
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) {
                const colName = headers[headerIndex];
                if (colName) record[colName] = cellContent.trim();
                cellContent = '';
                headerIndex++;
            } else cellContent += char;
        }
        const lastColName = headers[headerIndex];
        if (lastColName) record[lastColName] = cellContent.trim();
        
        Object.keys(record).forEach(k => {
            if (record[k].startsWith('"') && record[k].endsWith('"')) {
                record[k] = record[k].substring(1, record[k].length - 1).trim();
            }
        });
        records.push(record);
    }
    return records;
}

function resolveImageFolder(id) {
    const productsImagesDir = path.join(__dirname, 'images', 'products');
    if (!fs.existsSync(productsImagesDir)) return '';
    const dirs = fs.readdirSync(productsImagesDir);
    const matched = dirs.find(d => d.startsWith(id + '_') || d === id);
    if (matched) return matched;
    return '';
}

function loadAllProductsSimple() {
    const allProducts = [];

    const csvFiles = [
        'Accio_Product_Upload_First20.csv',
        'Accio_Interactive_Product_Upload.csv',
        'Accio_Life_Memory_Upload.csv',
        'Accio_Religious_Product_Upload.csv',
        'Accio_Greeting_Cards_Upload.csv',
        'Accio_Cosmetic_Perfume_Final.csv',
        'Accio_Chocolate_Food_Upload.csv',
        'Accio_Product_Upload_Box_Collections_FULL_IMAGES.csv'
    ];

    csvFiles.forEach(file => {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf8');
            const rows = parseCSV(content);
            rows.forEach(r => {
                const id = r['Product ID'] || r['Product ID '];
                if (!id || id.length > 20) return;
                allProducts.push({
                    'Product ID': id,
                    'Product Name': r['Product Name'] || r['Product Name EN'] || '',
                    'Main Category': r['Main Category'] || r['Category'] || r['Products Directory'] || '',
                    'Subcategory': r['Subcategory'] || r['Product Subcategory'] || r['Box Type'] || '',
                    'Application Tags': r['Application Tags'] || '',
                    'Holiday Tags': r['Holiday Tags'] || r['Holiday / Occasion Tags'] || '',
                    'Custom Options': r['Custom Options'] || '',
                    'Image Folder': r['Image Folder'] || resolveImageFolder(id)
                });
            });
        }
    });

    return allProducts.filter(p => p['Product ID']);
}

const products = loadAllProductsSimple();
const holidayOccasionsDir = path.join(__dirname, 'holiday-occasions');
ensureDir(holidayOccasionsDir);

const categories = [
    {
        dir: 'products',
        slug: 'advent-calendar-boxes',
        name: 'Advent Calendar Boxes',
        title: 'Custom Advent Calendar Boxes Manufacturer | Luxury Gift Set Packaging',
        desc: 'Custom advent calendar boxes for beauty, perfume, skincare, chocolate and gift brands. Factory-direct manufacturer with low MOQ, custom inserts, LED and music options.',
        h1: 'Custom Advent Calendar Boxes Manufacturer',
        heroSub: 'Luxury Advent Calendar Packaging for Brand Gift Sets',
        intro: 'Dominating the holiday unboxing season requires both artisanal quality and industrial scale. ShineleeBox is the partner behind European retail giants like Douglas, fulfilling 300,000 double-door calendars in just 2 months.',
        filter: p => p['Main Category'].includes('Advent') || (p['Subcategory'] || '').toLowerCase().includes('advent') || (p['Product Name'] || '').toLowerCase().includes('advent')
    },
    {
        dir: 'products',
        slug: 'rigid-boxes',
        name: 'Rigid Gift Boxes',
        title: 'Custom Rigid Gift Boxes Manufacturer | Luxury Paper Packaging',
        desc: 'Factory-direct custom rigid gift boxes with magnetic, drawer, lid-and-base, round, suitcase and custom shape structures for premium brands.',
        h1: 'Custom Rigid Gift Boxes Manufacturer',
        heroSub: 'Premium Rigid Packaging for Global Brands',
        intro: 'Create a truly premium unboxing experience with our collection of custom rigid boxes, constructed from high-density chipboard and wrapped in luxury specialty papers.',
        filter: p => p['Main Category'].includes('Rigid') || p['Main Category'].includes('Luxury Gift') || p['Product ID'].startsWith('RB-') || p['Product ID'].startsWith('MG-') || p['Product ID'].startsWith('DR-') || p['Product ID'].startsWith('RG-') || p['Product ID'].startsWith('SC-') || p['Product ID'].startsWith('CS-')
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'magnetic-gift-boxes',
        name: 'Magnetic Gift Boxes',
        title: 'Custom Magnetic Gift Boxes Manufacturer | Premium Magnetic Closure Boxes',
        desc: 'Custom magnetic gift boxes for cosmetics, perfume, chocolate, jewelry and corporate gifts. Factory-direct rigid packaging with premium finishing and inserts.',
        h1: 'Custom Magnetic Gift Boxes Manufacturer',
        heroSub: 'Premium Magnetic Closure Rigid Boxes',
        intro: 'Our magnetic gift boxes feature a smooth, reliable opening experience. Perfect for high-end retail and luxury gift collections.',
        filter: p => {
            const id = p['Product ID'].toUpperCase();
            const name = p['Product Name'].toLowerCase();
            const sub = p['Subcategory'].toLowerCase();
            const isMagnetic = id.startsWith('MG-') || name.includes('magnetic') || sub.includes('magnetic');
            const isExclude = name.includes('bag') || name.includes('advent');
            return isMagnetic && !isExclude;
        }
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'drawer-gift-boxes',
        name: 'Drawer Gift Boxes',
        title: 'Custom Drawer Gift Boxes Manufacturer | Sliding Rigid Packaging',
        desc: 'Custom drawer gift boxes for beauty, jewelry, perfume, chocolate and gift set packaging. Premium sliding structure with custom inserts and finishing.',
        h1: 'Custom Drawer Gift Boxes Manufacturer',
        heroSub: 'Sliding Drawer Boxes with Premium Reveal',
        intro: 'A neat, layered reveal for brands that want a compact structure with a premium reveal. Features custom inserts and high-end surface finishes.',
        filter: p => {
            const id = p['Product ID'].toUpperCase();
            const name = p['Product Name'].toLowerCase();
            const sub = p['Subcategory'].toLowerCase();
            return (id.startsWith('DR-') || name.includes('drawer') || sub.includes('drawer')) && !name.includes('advent');
        }
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'round-gift-boxes',
        name: 'Round Gift Boxes',
        title: 'Custom Round Gift Boxes Manufacturer | Cylinder Paper Gift Boxes',
        desc: 'Custom round gift boxes and cylinder rigid packaging for perfume, candles, chocolate, flowers and premium gift products.',
        h1: 'Custom Round Gift Boxes Manufacturer',
        heroSub: 'Cylinder Packaging for Luxury Gifting',
        intro: 'Round rigid boxes create a distinctive presentation for lifestyle and food products.',
        filter: p => {
            const id = p['Product ID'].toUpperCase();
            const name = p['Product Name'].toLowerCase();
            const religiousKeywords = ['miswak', 'hajj', 'zakat', 'wudu', 'pad', 'charity'];
            const isReligious = religiousKeywords.some(k => name.includes(k));
            return id.startsWith('RG-') && !isReligious;
        }
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'suitcase-gift-boxes',
        name: 'Suitcase Gift Boxes',
        title: 'Custom Suitcase Gift Boxes Manufacturer | Travel Themed Gift Packaging',
        desc: 'Custom suitcase gift boxes with handles and travel-inspired details for beauty, kids gifts, souvenirs and premium retail campaigns.',
        h1: 'Custom Suitcase Gift Boxes Manufacturer',
        heroSub: 'Suitcase-Style Packaging with Travel Theme',
        intro: 'Memorable travel-themed packaging with handles and locks.',
        filter: p => {
            const id = p['Product ID'].toUpperCase();
            const name = p['Product Name'].toLowerCase();
            return (id.startsWith('SC-') || (name.includes('suitcase') && name.includes('handle'))) && !id.startsWith('AC-') && !name.includes('cake');
        }
    },
    {
        dir: 'products',
        slug: 'interactive-packaging',
        name: 'Interactive Packaging',
        title: 'Custom Interactive Packaging Boxes | Video, Music & LED Gift Boxes',
        desc: 'Custom video gift boxes, music boxes and LED packaging for brands that want memorable unboxing experiences and high-value gift campaigns.',
        h1: 'Custom Interactive Packaging Boxes with Video, Music and LED Lights',
        heroSub: 'Packaging That Tells a Digital Story',
        intro: 'Engage all senses with sensor-activated light, sound, and HD video.',
        filter: p => {
            const id = p['Product ID'].toUpperCase();
            const name = p['Product Name'].toLowerCase();
            const isInteractive = id.startsWith('IP-') || name.includes('video') || name.includes('music') || name.includes('led') || name.includes('light-up') || name.includes('sound');
            return isInteractive && (!id.startsWith('AC-') || name.includes('led') || name.includes('music'));
        }
    },
    {
        dir: 'products',
        slug: 'keepsake-boxes',
        name: 'Keepsake Boxes',
        title: 'Custom Keepsake Boxes Manufacturer | Premium Memory Packaging',
        desc: 'Bespoke rigid keepsake and memory boxes for baby milestones, weddings, and anniversaries. High-durability packaging designed to be kept for years.',
        h1: 'Custom Keepsake Boxes Manufacturer',
        heroSub: 'Memory Packaging Too Good To Throw Away',
        intro: 'We design and construct heavy, high-durability custom keepsake boxes meant to be stored and cherished for years.',
        filter: p => p['Main Category'].includes('Keepsake') || p['Product ID'].startsWith('LM-') || (p['Subcategory'] || '').toLowerCase().includes('keepsake')
    },
    {
        dir: 'applications',
        slug: 'religious-and-cultural-gift-packaging',
        name: 'Religious & Cultural Packaging',
        title: 'Custom Religious & Cultural Gift Packaging Manufacturer | ShineleeBox',
        desc: 'Bespoke cultural and religious packaging, featuring Ramadan dates boxes, Eid sweet gift boxes, Miswak holders, and luxury Islamic prayer set storage.',
        h1: 'Religious & Cultural Packaging Manufacturer',
        heroSub: 'Culturally-Compliant Packaging for Sacred Ceremonies',
        intro: 'Respectful, premium packaging for religious milestones.',
        filter: p => {
            const name = p['Product Name'].toLowerCase();
            const id = p['Product ID'].toUpperCase();
            return id.startsWith('RG-') || name.includes('miswak') || name.includes('hajj') || name.includes('zakat') || name.includes('wudu') || name.includes('pad') || name.includes('charity') || name.includes('islamic') || name.includes('ramadan') || name.includes('eid');
        }
    },
    {
        dir: 'applications',
        slug: 'beauty-perfume-personal-care-packaging',
        name: 'Beauty, Perfume & Personal Care',
        title: 'Custom Beauty & Perfume Packaging | Cosmetic Gift Box Manufacturer',
        desc: 'Custom cosmetic gift boxes, perfume packaging, skincare gift sets and beauty PR boxes for premium brands. Low MOQ and custom structure support.',
        h1: 'Custom Beauty & Perfume Packaging',
        heroSub: 'Luxury Fragrance & Cosmetic Sourcing Solutions',
        intro: 'First impressions are critical for premium beauty brands.',
        filter: p => p['Application Tags'].toLowerCase().includes('beauty') || p['Application Tags'].toLowerCase().includes('perfume') || p['Application Tags'].toLowerCase().includes('skincare') || p['Product Name'].toLowerCase().includes('beauty') || p['Product Name'].toLowerCase().includes('skincare') || p['Product Name'].toLowerCase().includes('perfume')
    },
    {
        dir: 'applications',
        slug: 'chocolate-and-food-packaging',
        name: 'Chocolate & Food Packaging',
        title: 'Custom Chocolate & Food Packaging | Dessert Gift Box Manufacturer',
        desc: 'Custom chocolate boxes, dessert gift boxes, date packaging, bakery boxes and mooncake packaging for premium food brands.',
        h1: 'Custom Chocolate & Food Packaging',
        heroSub: 'Food-Safe Rigid Packaging for High-End Gifting',
        intro: 'Protect and present with sophistication.',
        filter: p => p['Application Tags'].toLowerCase().includes('food') || p['Application Tags'].toLowerCase().includes('chocolate') || p['Product Name'].toLowerCase().includes('food') || p['Product Name'].toLowerCase().includes('chocolate') || p['Product Name'].toLowerCase().includes('date') || p['Product Name'].toLowerCase().includes('mooncake') || p['Product Name'].toLowerCase().includes('cake')
    },
    {
        dir: 'applications',
        slug: 'wine-liquor-packaging',
        name: 'Wine & Liquor Packaging',
        title: 'Custom Wine Boxes & Liquor Gift Packaging Manufacturer',
        desc: 'Custom wine boxes, liquor gift packaging and premium rigid bottle boxes for brands, corporate gifts and holiday campaigns.',
        h1: 'Custom Wine & Liquor Packaging',
        heroSub: 'Bespoke Spirits & Liquor Bottle Packaging',
        intro: 'Durable, high-end rigid boxes for champagne, whiskey and wine gifting.',
        filter: p => p['Application Tags'].toLowerCase().includes('wine') || p['Application Tags'].toLowerCase().includes('liquor') || p['Product Name'].toLowerCase().includes('wine') || p['Product Name'].toLowerCase().includes('liquor') || p['Product Name'].toLowerCase().includes('spirits')
    },
    {
        dir: 'applications',
        slug: 'electronics-and-premium-gift-packaging',
        name: 'Electronics & Premium Packaging',
        title: 'Electronics & Premium Packaging Manufacturer | ShineleeBox',
        desc: 'Luxury electronics gift boxes and premium LED/sound packaging. Custom rigid box manufacturer with integrated technology.',
        h1: 'Electronics & Premium Packaging',
        heroSub: 'Premium rigid boxes with integrated light sensors, sound modules, and HD video screens.',
        intro: 'Protect and highlight high-value technology.',
        filter: p => {
            const id = p['Product ID'].toUpperCase();
            const name = p['Product Name'].toLowerCase();
            const isInteractive = id.startsWith('IP-') || name.includes('video') || name.includes('music') || name.includes('led') || name.includes('light-up') || name.includes('sound');
            return isInteractive && (!id.startsWith('AC-') || name.includes('led') || name.includes('music'));
        }
    },
    {
        dir: 'holiday-occasions',
        slug: 'ramadan-and-eid-packaging',
        name: 'Ramadan & Eid Packaging',
        title: 'Custom Ramadan & Eid Gift Packaging | Luxury Islamic Gift Boxes',
        desc: 'Bespoke Ramadan advent calendars, Eid sweet boxes, and traditional Islamic pattern gift packaging. Miswak and Zakat storage solutions.',
        h1: 'Ramadan & Eid Packaging',
        heroSub: 'Elegant Cultural Packaging for the Holy Month',
        intro: 'Celebrate faith with premium custom packaging.',
        filter: p => {
            const name = p['Product Name'].toLowerCase();
            return name.includes('ramadan') || name.includes('eid') || name.includes('miswak') || name.includes('zakat') || name.includes('wudu') || name.includes('islamic') || name.includes('charity');
        }
    }
];

function buildCategoryPages() {
    categories.forEach(cat => {
        const categoryDir = path.join(__dirname, cat.dir);
        ensureDir(categoryDir);

        let html = headTemplate(cat.title, cat.desc, cat.dir.includes('/') ? '../../' : '../') + headerTemplate(cat.dir.includes('/') ? '../../' : '../');
        
        let matchedProducts = products.filter(cat.filter);

        html += `
    <section class="bg-brandIvory py-20 border-b border-brandBeige/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav class="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-brandGold flex items-center space-x-2">
                <a href="${cat.dir.includes('/') ? '../../' : '../'}index.html" class="hover:text-brandCharcoal transition-colors">Home</a>
                <span>/</span>
                <span>${cat.dir.startsWith('products') ? 'Products' : 'Applications'}</span>
                <span>/</span>
                <span class="text-brandCharcoal font-extrabold underline decoration-brandGold decoration-2 underline-offset-4">${cat.name}</span>
            </nav>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div class="lg:col-span-8 space-y-6">
                    <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-brandCharcoal leading-tight">${cat.h1}</h1>
                    <p class="text-brandCharcoal/70 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">${cat.heroSub}</p>
                </div>
                <div class="lg:col-span-4 pb-2">
                    <p class="text-xs text-brandCharcoal/60 leading-relaxed italic border-l-2 border-brandGold pl-4">${cat.intro}</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            ${matchedProducts
                .map(p => {
                    const id = p['Product ID'];
                    const idUpper = id.toUpperCase();
                    const name = p['Product Name'];
                    const folderName = p['Image Folder'] || resolveImageFolder(id);
                    let prefix = 'ac';
                    if (idUpper.startsWith('IP-')) prefix = 'ip';
                    else if (idUpper.startsWith('LM-')) prefix = 'lm';
                    else if (idUpper.startsWith('RG-')) prefix = 'rg';
                    else if (idUpper.startsWith('GC-')) prefix = 'gc';
                    else if (idUpper.startsWith('SLF-')) prefix = 'slf';
                    else if (idUpper.startsWith('PP-')) prefix = 'pp';
                    else if (idUpper.startsWith('CP-')) prefix = 'cp';
                    else if (idUpper.startsWith('CFP-')) prefix = 'cfp';
                    else if (idUpper.startsWith('MG-')) prefix = 'mg';
                    else if (idUpper.startsWith('DR-')) prefix = 'dr';
                    else if (idUpper.startsWith('CS-')) prefix = 'cs';
                    else if (idUpper.startsWith('SC-')) prefix = 'sc';
                    else if (idUpper.startsWith('RB-')) prefix = 'rb';
                    
                    const idLower = id.toLowerCase()
                        .replace('ac-', '')
                        .replace('ip-', '')
                        .replace('lm-', '')
                        .replace('rg-', '')
                        .replace('gc-', '')
                        .replace('slf-', '')
                        .replace('pp-', '')
                        .replace('cp-', '')
                        .replace('cfp-', '')
                        .replace('mg-', '')
                        .replace('dr-', '')
                        .replace('cs-', '')
                        .replace('sc-', '')
                        .replace('rb-', '');
                    
                    let imgPath = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80';
                    if (folderName) {
                        const imageFolderPath = path.join(__dirname, 'images', 'products', folderName);
                        if (fs.existsSync(imageFolderPath)) {
                            const imgFiles = fs.readdirSync(imageFolderPath).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f)).sort();
                            if (imgFiles.length > 0) imgPath = `${cat.dir.includes('/') ? '../../' : '../'}images/products/${folderName}/${imgFiles[0]}`;
                        }
                    }

                    return `
            <div class="bg-brandWhite rounded-sm overflow-hidden border border-brandBeige hover:border-brandGold transition-all flex flex-col group h-full luxury-shadow">
                <div class="h-64 overflow-hidden bg-brandWhite relative p-8 flex items-center justify-center cursor-pointer" onclick="window.location.href='${cat.dir.includes('/') ? '../../' : '../'}products/${prefix}-${idLower}.html'">
                    <img src="${imgPath}" alt="${escapeHtml(name)}" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700">
                </div>
                <div class="p-6 flex-grow flex flex-col justify-between border-t border-brandBeige/40">
                    <div>
                        <div class="text-[9px] font-bold text-brandGold uppercase tracking-[0.2em] mb-2">${escapeHtml(p['Subcategory'] || 'Custom Packaging')}</div>
                        <h3 class="font-serif text-lg font-bold text-brandCharcoal mb-4 group-hover:text-brandGold transition-colors leading-tight">
                            <a href="${cat.dir.includes('/') ? '../../' : '../'}products/${prefix}-${idLower}.html">${escapeHtml(name)}</a>
                        </h3>
                    </div>
                    <div class="flex items-center justify-between mt-4 pt-4 border-t border-brandBeige/20">
                        <span class="text-[9px] font-bold text-brandCharcoal/30 uppercase tracking-widest">MOQ 50 PCS</span>
                        <a href="${cat.dir.includes('/') ? '../../' : '../'}products/${prefix}-${idLower}.html" class="text-[9px] font-bold text-brandBurgundy uppercase border-b border-brandBurgundy hover:text-brandGold hover:border-brandGold transition-all tracking-widest">Details</a>
                    </div>
                </div>
            </div>`;
                }).join('')}
        </div>
    </section>`;

        html += footerTemplate(cat.dir.includes('/') ? '../../' : '../');
        fs.writeFileSync(path.join(categoryDir, `${cat.slug}.html`), html, 'utf8');
    });
}

buildCategoryPages();
console.log("Category pages optimized and cleaned with strict filters!");
