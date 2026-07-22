const fs = require('fs');
const path = require('path');
const { headTemplate, headerTemplate, footerTemplate } = require('./templates');

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function parseCSV(content) {
    const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    if (lines.length === 0) return [];
    function splitCSV(line) {
        const result = [];
        let cur = '', inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const c = line[i];
            if (c === '"') {
                if (inQuotes && line[i+1] === '"') { cur += '"'; i++; }
                else inQuotes = !inQuotes;
            } else if (c === ',' && !inQuotes) { result.push(cur.trim()); cur = ''; }
            else cur += c;
        }
        result.push(cur.trim());
        return result;
    }
    const headers = splitCSV(lines[0].replace(/^\uFEFF/, ''));
    const records = [];
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const parts = splitCSV(lines[i]);
        const record = {};
        headers.forEach((h, idx) => { if (h) record[h] = (parts[idx] || '').replace(/^"|"$/g, '').trim(); });
        records.push(record);
    }
    return records;
}

function resolveImageFolder(id) {
    if (!id) return '';
    const idUpper = id.toUpperCase().trim();
    const productsImagesDir = path.join(__dirname, 'images', 'products');
    if (!fs.existsSync(productsImagesDir)) return '';
    const dirs = fs.readdirSync(productsImagesDir);
    const matched = dirs.find(d => d.toUpperCase().startsWith(idUpper + '_') || d.toUpperCase() === idUpper);
    return matched || '';
}

const DEFAULT_IMG = 'https://sc04.alicdn.com/kf/Ab4e81abe62284910abf050838dc1bd50N.jpg';

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
            const rows = parseCSV(fs.readFileSync(file, 'utf8'));
            rows.forEach(r => {
                let id = r['Product ID'] || r['Product ID '] || r['Product Code'];
                if (!id || id.length > 25) return;
                id = id.trim();
                allProducts.push({
                    'Product ID': id,
                    'Product Name': r['Product Name'] || r['Product Name EN'] || r['Product Title'] || '',
                    'Main Category': r['Main Category'] || r['Category'] || r['Products Directory'] || '',
                    'Subcategory': r['Subcategory'] || r['Product Subcategory'] || r['Box Type'] || r['Products Subcategory'] || '',
                    'Application Tags': r['Application Tags'] || '',
                    'Holiday Tags': r['Holiday Tags'] || r['Holiday / Occasion Tags'] || '',
                    'Image Folder': r['Image Folder'] || resolveImageFolder(id)
                });
            });
        }
    });
    return allProducts;
}

const products = loadAllProductsSimple();

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
        filter: p => {
            const cat = (p['Main Category'] || '').toLowerCase();
            const sub = (p['Subcategory'] || '').toLowerCase();
            const name = (p['Product Name'] || '').toLowerCase();
            return cat.includes('advent') || sub.includes('advent') || name.includes('advent');
        }
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
        filter: p => {
            const cat = (p['Main Category'] || '').toLowerCase();
            const id = (p['Product ID'] || '').toUpperCase();
            return cat.includes('rigid') || cat.includes('luxury gift') || id.startsWith('RB-') || id.startsWith('MG-') || id.startsWith('DR-') || id.startsWith('RG-') || id.startsWith('SC-') || id.startsWith('CS-');
        }
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
            const id = (p['Product ID'] || '').toUpperCase();
            const name = (p['Product Name'] || '').toLowerCase();
            const sub = (p['Subcategory'] || '').toLowerCase();
            const isMagnetic = id.startsWith('MG-') || name.includes('magnetic') || sub.includes('magnetic');
            const isExclude = name.includes('bag') || name.includes('advent calendar') || name.includes('foldable');
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
        intro: 'A neat, layered reveal for brands that want a compact structure with a premium reveal.',
        filter: p => {
            const id = (p['Product ID'] || '').toUpperCase();
            const name = (p['Product Name'] || '').toLowerCase();
            const sub = (p['Subcategory'] || '').toLowerCase();
            return (id.startsWith('DR-') || name.includes('drawer') || sub.includes('drawer')) && !name.includes('advent calendar');
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
            const id = (p['Product ID'] || '').toUpperCase();
            const name = (p['Product Name'] || '').toLowerCase();
            const sub = (p['Subcategory'] || '').toLowerCase();
            const religiousKeywords = ['miswak', 'hajj', 'zakat', 'wudu', 'pad', 'charity', 'islamic', 'funeral', 'qibla'];
            const isReligious = religiousKeywords.some(k => name.includes(k) || sub.includes(k));
            return (id.startsWith('RG-') || name.includes('round') || name.includes('cylinder')) && !isReligious && !name.includes('advent calendar');
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
            const id = (p['Product ID'] || '').toUpperCase();
            const name = (p['Product Name'] || '').toLowerCase();
            const sub = (p['Subcategory'] || '').toLowerCase();
            return (id.startsWith('SC-') || name.includes('suitcase') || sub.includes('suitcase')) && !name.includes('advent calendar');
        }
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'custom-shape-boxes',
        name: 'Custom Shape Boxes',
        title: 'Custom Shape Gift Boxes Manufacturer | Die-Cut Specialty Packaging',
        desc: 'Bespoke custom shape gift boxes for unique product launches, heart-shaped boxes, hexagon boxes, and innovative die-cut rigid packaging.',
        h1: 'Custom Shape Gift Boxes Manufacturer',
        heroSub: 'Distinctive Die-Cut Structural Packaging',
        intro: 'Stand out on the shelf with non-traditional box structures designed for impact.',
        filter: p => {
            const id = (p['Product ID'] || '').toUpperCase();
            const name = (p['Product Name'] || '').toLowerCase();
            const sub = (p['Subcategory'] || '').toLowerCase();
            return (id.startsWith('CS-') || name.includes('shape') || sub.includes('shape') || name.includes('heart')) && !name.includes('advent');
        }
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'lid-and-base-boxes',
        name: 'Lid and Base Boxes',
        title: 'Custom Lid and Base Boxes Manufacturer | Luxury Two-Piece Boxes',
        desc: 'Custom lid and base boxes for jewelry, gift sets, premium chocolates and electronics. High-density rigid board with luxury finishing and custom inserts.',
        h1: 'Custom Lid and Base Boxes Manufacturer',
        heroSub: 'Classic Two-Piece Rigid Packaging for Premium Gifts',
        intro: 'The timeless choice for premium brands. Our lid and base boxes provide superior structural integrity and a high-end unboxing experience.',
        filter: p => {
            const name = (p['Product Name'] || '').toLowerCase();
            const sub = (p['Subcategory'] || '').toLowerCase();
            const id = (p['Product ID'] || '').toUpperCase();
            return (name.includes('lid') && name.includes('base')) || sub.includes('lid') || id.startsWith('RB-');
        }
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'mailing-gift-boxes',
        name: 'Mailing Gift Boxes',
        title: 'Custom Mailing Gift Boxes Manufacturer | Corrugated Rigid Mailers',
        desc: 'Custom mailing gift boxes and corrugated rigid mailers for ecommerce, luxury shipping, and brand launches. Secure, durable, and luxury finishing options.',
        h1: 'Custom Mailing Gift Boxes Manufacturer',
        heroSub: 'Secure & Elegant Corrugated Mailing Solutions',
        intro: 'The perfect blend of durability and luxury. Our mailing boxes protect your products while providing a premium unboxing experience.',
        filter: p => {
            const id = (p['Product ID'] || '').toUpperCase();
            const name = (p['Product Name'] || '').toLowerCase();
            const sub = (p['Subcategory'] || '').toLowerCase();
            return id.startsWith('MB-') || name.includes('mailing') || name.includes('mailer') || sub.includes('mailing') || sub.includes('mailer') || name.includes('shipping box');
        }
    },
    {
        dir: 'holiday-occasions',
        slug: 'christmas-packaging',
        name: 'Christmas Packaging',
        title: 'Custom Christmas Packaging Manufacturer | Holiday Gift Boxes',
        desc: 'Custom Christmas gift boxes, advent calendars, and festive packaging for holiday retail and corporate gifting.',
        h1: 'Custom Christmas Packaging Manufacturer',
        heroSub: 'Festive Packaging for the Holiday Season',
        intro: 'Elevate your holiday collection with our premium Christmas-themed packaging solutions.',
        filter: p => {
            const h = (p['Holiday Tags'] || '').toLowerCase();
            const n = (p['Product Name'] || '').toLowerCase();
            return h.includes('christmas') || n.includes('christmas') || n.includes('holiday') || n.includes('xmas');
        }
    },
    {
        dir: 'holiday-occasions',
        slug: 'ramadan-and-eid-packaging',
        name: 'Ramadan & Eid Packaging',
        title: 'Custom Ramadan & Eid Packaging Manufacturer | Halal Gift Boxes',
        desc: 'Custom Ramadan gift boxes, Eid Mubarak sweets packaging, dates boxes and Islamic themed rigid gift sets.',
        h1: 'Custom Ramadan & Eid Packaging Manufacturer',
        heroSub: 'Spiritual & Elegant Gifting for Ramadan & Eid',
        intro: 'Premium packaging solutions designed for the Middle Eastern gifting market.',
        filter: p => {
            const h = (p['Holiday Tags'] || '').toLowerCase();
            const n = (p['Product Name'] || '').toLowerCase();
            return h.includes('ramadan') || h.includes('eid') || n.includes('ramadan') || n.includes('eid') || n.includes('halal') || n.includes('miswak') || n.includes('hajj');
        }
    }
];

function buildCategoryPages() {
    categories.forEach(cat => {
        const categoryDir = path.join(__dirname, cat.dir);
        ensureDir(categoryDir);
        const matchedProducts = products.filter(cat.filter);
        const productsHtml = matchedProducts.map(p => {
            const id = p['Product ID'];
            const idUpper = id.toUpperCase();
            const name = p['Product Name'];
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
            else if (idUpper.startsWith('CHOC-COL-')) prefix = 'choc';
            else if (idUpper.startsWith('MB-')) prefix = 'mb';
            const idLower = id.toLowerCase().replace('ac-', '').replace('ip-', '').replace('lm-', '').replace('rg-', '').replace('gc-', '').replace('slf-', '').replace('pp-', '').replace('cp-', '').replace('cfp-', '').replace('mg-', '').replace('dr-', '').replace('cs-', '').replace('sc-', '').replace('rb-', '').replace('choc-col-', '').replace('mb-', '');
            let folderName = p['Image Folder'];
            const checkPath = path.join(__dirname, 'images', 'products', folderName);
            if (!folderName || !fs.existsSync(checkPath) || fs.readdirSync(checkPath).length === 0) folderName = resolveImageFolder(id);
            let imgPath = DEFAULT_IMG;
            if (folderName) {
                const folderPath = path.join(__dirname, 'images', 'products', folderName);
                if (fs.existsSync(folderPath)) {
                    const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort();
                    if (files.length > 0) {
                        const mainFile = files.find(f => f.startsWith('00_main'));
                        imgPath = `${cat.dir.includes('/') ? '../../' : '../'}images/products/${folderName}/${mainFile || files[0]}`;
                    }
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
        }).join('');
        let html = headTemplate(cat.title, cat.desc, cat.dir.includes('/') ? '../../' : '../') + headerTemplate(cat.dir.includes('/') ? '../../' : '../');
        html += `
    <section class="bg-brandCharcoal py-20 border-b border-brandGold/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div class="lg:col-span-8 space-y-6 text-brandIvory">
                    <nav class="text-[10px] font-bold uppercase tracking-[0.2em] text-brandGold flex items-center space-x-2">
                        <a href="${cat.dir.includes('/') ? '../../' : '../'}index.html" class="hover:text-brandWhite transition-colors">Home</a><span>/</span>
                        <span>Products</span><span>/</span><span class="text-brandWhite">${cat.name}</span>
                    </nav>
                    <h1 class="font-serif text-4xl sm:text-6xl font-bold text-brandWhite leading-tight">${cat.h1}</h1>
                    <p class="text-lg text-brandIvory/80 font-light max-w-2xl">${cat.heroSub}</p>
                </div>
                <div class="lg:col-span-4 pb-2">
                    <p class="text-xs text-brandIvory/60 leading-relaxed italic border-l-2 border-brandGold pl-4">${cat.intro}</p>
                </div>
            </div>
        </div>
    </section>
    <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">${productsHtml}</div>
    </section>`;
        html += footerTemplate(cat.dir.includes('/') ? '../../' : '../');
        fs.writeFileSync(path.join(categoryDir, `${cat.slug}.html`), html, 'utf8');
    });
}
buildCategoryPages();
console.log("Category pages optimized and cleaned with final strict filters!");
