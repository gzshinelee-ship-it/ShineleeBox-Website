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

    const acCsvPath = path.join(__dirname, 'Accio_Product_Upload_First20.csv');
    if (fs.existsSync(acCsvPath)) {
        const content = fs.readFileSync(acCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            const id = r['Product ID'];
            if (!id || id.length > 20 || !id.includes('-')) return; 
            allProducts.push({
                'Product ID': id,
                'Product Name': r['Product Name'],
                'Main Category': r['Main Category'] || r['Category'] || 'Advent Calendar Boxes',
                'Subcategory': r['Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': r['Image Folder'] || resolveImageFolder(id)
            });
        });
    }

    const ipCsvPath = path.join(__dirname, 'Accio_Interactive_Product_Upload.csv');
    if (fs.existsSync(ipCsvPath)) {
        const content = fs.readFileSync(ipCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            const id = r['Product ID'];
            if (!id) return;
            allProducts.push({
                'Product ID': id,
                'Product Name': r['Product Name EN'],
                'Main Category': 'Interactive Packaging',
                'Subcategory': r['Product Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday / Occasion Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': r['Image Folder'] || resolveImageFolder(id)
            });
        });
    }

    const lmCsvPath = path.join(__dirname, 'Accio_Life_Memory_Upload.csv');
    if (fs.existsSync(lmCsvPath)) {
        const content = fs.readFileSync(lmCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            const id = r['Product ID'];
            if (!id) return;
            allProducts.push({
                'Product ID': id,
                'Product Name': r['Product Name EN'],
                'Main Category': 'Keepsake Boxes',
                'Subcategory': r['Product Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday / Occasion Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': resolveImageFolder(id)
            });
        });
    }

    const rgCsvPath = path.join(__dirname, 'Accio_Religious_Product_Upload.csv');
    if (fs.existsSync(rgCsvPath)) {
        const content = fs.readFileSync(rgCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            const id = r['Product ID'];
            if (!id) return;
            allProducts.push({
                'Product ID': id,
                'Product Name': r['Product Name EN'],
                'Main Category': 'Religious Gift Packaging',
                'Subcategory': r['Product Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday / Occasion Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': resolveImageFolder(id)
            });
        });
    }

    const gcCsvPath = path.join(__dirname, 'Accio_Greeting_Cards_Upload.csv');
    if (fs.existsSync(gcCsvPath)) {
        const content = fs.readFileSync(gcCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            const id = r['Product ID'];
            if (!id) return;
            allProducts.push({
                'Product ID': id,
                'Product Name': r['Product Name EN'],
                'Main Category': 'Greeting Cards',
                'Subcategory': r['Product Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday / Occasion Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': resolveImageFolder(id)
            });
        });
    }

    const cpCsvPath = path.join(__dirname, 'Accio_Cosmetic_Perfume_Final.csv');
    if (fs.existsSync(cpCsvPath)) {
        const content = fs.readFileSync(cpCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            const id = r['Product ID'];
            if (!id) return;
            allProducts.push({
                'Product ID': id,
                'Product Name': r['Product Name EN'],
                'Main Category': 'Beauty & Perfume Packaging',
                'Subcategory': r['Product Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday / Occasion Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': resolveImageFolder(id)
            });
        });
    }

    const cfpCsvPath = path.join(__dirname, 'Accio_Chocolate_Food_Upload.csv');
    if (fs.existsSync(cfpCsvPath)) {
        const content = fs.readFileSync(cfpCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            const id = r['Product ID'];
            if (!id) return;
            allProducts.push({
                'Product ID': id,
                'Product Name': r['Product Name'],
                'Main Category': r['Products Directory'] || 'Chocolate & Food Packaging',
                'Subcategory': r['Box Type'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': resolveImageFolder(id)
            });
        });
    }

    const collectionsCsvPath = path.join(__dirname, 'Accio_Product_Upload_Box_Collections_FULL_IMAGES.csv');
    if (fs.existsSync(collectionsCsvPath)) {
        const content = fs.readFileSync(collectionsCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            const id = r['Product ID'];
            if (!id) return;
            allProducts.push({
                'Product ID': id,
                'Product Name': r['Product Name'],
                'Main Category': r['Main Category'] || 'Rigid Box',
                'Subcategory': r['Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': r['Image Folder'] || resolveImageFolder(id)
            });
        });
    }

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
        title: 'Custom Advent Calendar Boxes Manufacturer | Luxury Holiday Gift Set Packaging',
        desc: 'Custom advent calendar boxes for beauty, perfume, skincare, chocolate and gift set brands. Factory-direct manufacturer in Guangzhou with low MOQ from 50 pcs, rigid drawer structures, custom inserts, foil stamping, LED and music options.',
        h1: 'Custom Advent Calendar Boxes Manufacturer',
        heroSub: 'Luxury Advent Calendar Packaging for Brand Gift Sets',
        intro: 'Dominating the holiday unboxing season requires both artisanal quality and industrial scale. ShineleeBox is the partner behind European retail giants like Douglas, fulfilling 300,000 double-door calendars in just 2 months. We offer **100% Free 2026 Dieline Services**, rapid 5-7 days sampling, and seamless USA DDP shipping to ensure your brand lands first and stays best.',
        filter: p => p['Main Category'] === 'Advent Calendar Boxes' || (p['Subcategory'] || '').toLowerCase().includes('advent') || (p['Application Tags'] || '').toLowerCase().includes('advent') || (p['Product Name'] || '').toLowerCase().includes('advent')
    },
    {
        dir: 'products',
        slug: 'cake-boxes',
        name: 'Cake Boxes',
        title: 'Custom Cake Boxes & Cupcake Packaging | Wholesale Manufacturer',
        desc: 'Custom cake boxes for cupcakes, mini cakes, pastries and dessert gifting. Food-safe materials, custom size and printing. MOQ from 50 pcs.',
        h1: 'Custom Cake & Cupcake Boxes',
        heroSub: 'Professional bakery packaging for cake shops and dessert brands.',
        intro: 'Deliver your sweetness in style. Our custom cake and cupcake boxes are designed for retail presentation and safe transport, featuring high-quality food-grade boards and elegant window designs.',
        filter: p => p['Main Category'] === 'Cake Boxes'
    },
    {
        dir: 'products',
        slug: 'chocolate-boxes',
        name: 'Chocolate Boxes',
        title: 'Custom Chocolate Boxes & Confectionery Packaging | Wholesale Manufacturer',
        desc: 'Custom chocolate gift boxes for truffles, pralines and premium confectionery gifting. High-end rigid structures, custom trays and inserts. MOQ from 50 pcs.',
        h1: 'Custom Chocolate & Truffle Boxes',
        heroSub: 'Luxury chocolate packaging with custom compartments and premium finishing.',
        intro: 'Turn your chocolates into a luxury gift experience. ShineleeBox specializes in premium rigid chocolate boxes with custom-fit food trays, gold foil accents, and artisanal structures.',
        filter: p => p['Main Category'] === 'Chocolate Boxes'
    },
    {
        dir: 'products',
        slug: 'date-dessert-boxes',
        name: 'Date Dessert Boxes',
        title: 'Custom Date Boxes & Arabic Sweets Packaging | Wholesale Manufacturer',
        desc: 'Custom food gift boxes for dates, Arabic sweets, and Ramadan gifting. Elegant rigid structures, 30-day countdown options, and traditional patterns.',
        h1: 'Custom Date & Arabic Sweets Boxes',
        heroSub: 'Specialist in Ramadan and Eid luxury dates packaging.',
        intro: 'Celebrate traditions with high-end presentation. Our date dessert boxes are engineered for premium gifting, featuring culturally compliant Islamic geometric patterns and secure, elegant structures.',
        filter: p => p['Main Category'] === 'Date Dessert Boxes'
    },
    {
        dir: 'products',
        slug: 'mooncake-boxes',
        name: 'Mooncake Boxes',
        title: 'Custom Mooncake Boxes & Mid-Autumn Gift Packaging | Wholesale Manufacturer',
        desc: 'Custom festive food packaging for mooncakes and seasonal pastry gifting. Luxury drawer structures, premium board, and branded artwork. MOQ from 50 pcs.',
        h1: 'Custom Mooncake Gift Boxes',
        heroSub: 'Prestigious packaging for the Mid-Autumn Festival and festive pastries.',
        intro: 'Honor the harvest with exquisite packaging. Our mooncake boxes combine cultural storytelling with high-end structural engineering, perfect for corporate and retail gifting.',
        filter: p => p['Main Category'] === 'Mooncake Boxes'
    },
    {
        dir: 'products',
        slug: 'beauty-perfume-packaging',
        name: 'Beauty & Perfume Packaging',
        title: 'Custom Beauty & Perfume Packaging | Luxury Rigid Gift Boxes',
        desc: 'Premium manufacturer of custom perfume packaging and cosmetic gift boxes. We supply luxury fragrance discovery sets, skincare PR boxes, and makeup set packaging with gold foil accents.',
        h1: 'Custom Beauty & Perfume Packaging',
        heroSub: 'Factory-direct luxury perfume gift boxes, premium skincare packaging, and custom beauty PR kits starting at 50 pcs MOQ.',
        intro: 'First impressions are critical for premium beauty and fragrance brands. ShineleeBox engineers custom packaging that mirrors the sophistication of your brand. From book-style magnetic closures for perfumes to pull-out drawer sets for skincare, we deliver retail-ready structural masterpieces designed to elevate the unboxing experience.',
        filter: p => p['Main Category'] === 'Perfume Packaging' || p['Main Category'] === 'Cosmetic Packaging' || (p['Subcategory'] || '').toLowerCase().includes('perfume') || (p['Subcategory'] || '').toLowerCase().includes('cosmetic') || (p['Subcategory'] || '').toLowerCase().includes('skincare') || (p['Application Tags'] || '').toLowerCase().includes('perfume') || (p['Application Tags'] || '').toLowerCase().includes('fragrance') || (p['Application Tags'] || '').toLowerCase().includes('beauty') || (p['Application Tags'] || '').toLowerCase().includes('skincare') || (p['Product Name'] || '').toLowerCase().includes('perfume') || (p['Product Name'] || '').toLowerCase().includes('fragrance') || (p['Product Name'] || '').toLowerCase().includes('cosmetic') || (p['Product Name'] || '').toLowerCase().includes('skincare')
    },
    {
        dir: 'products',
        slug: 'rigid-boxes',
        name: 'Rigid Boxes',
        title: 'Custom Rigid Boxes & Premium Cardboard Gift Boxes | ShineleeBox',
        desc: 'ShineleeBox manufactures high-end custom rigid boxes in Guangzhou, including magnetic flip-top boxes, sliding drawer boxes, foldable rigid boxes, and luxury gift set packaging.',
        h1: 'Custom Rigid Boxes',
        heroSub: 'Factory-direct premium rigid cardboard gift boxes with magnetic closures, pull-out drawers, custom sizes, and high-end surface finishes.',
        intro: 'Create a truly premium unboxing experience with our collection of custom rigid boxes. Constructed from high-density chipboard and wrapped in specialty papers, these rigid boxes are perfect for high-end retail, promotional kits, corporate gifting, and product launches.',
        filter: p => p['Main Category'] === 'Luxury Gift Boxes' || (p['Main Category'] || '').toLowerCase().includes('rigid') || (p['Subcategory'] || '').toLowerCase().includes('drawer') || (p['Subcategory'] || '').toLowerCase().includes('magnetic') || (p['Product Name'] || '').toLowerCase().includes('magnetic') || (p['Product Name'] || '').toLowerCase().includes('drawer') || (p['Product Name'] || '').toLowerCase().includes('rigid') || (p['Custom Options'] || '').toLowerCase().includes('magnetic') || (p['Custom Options'] || '').toLowerCase().includes('drawer') || (p['Custom Options'] || '').toLowerCase().includes('rigid') || p['Product ID'].startsWith('RB-')
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'magnetic-gift-boxes',
        name: 'Magnetic Gift Boxes',
        title: 'Custom Magnetic Gift Boxes Manufacturer | ShineleeBox',
        desc: 'Custom magnetic gift boxes for perfume, cosmetics, jewelry, electronics and premium gifts. Rigid board, magnetic closure, custom inserts, foil stamping and MOQ from 50 pcs.',
        h1: 'Custom Magnetic Gift Boxes',
        heroSub: 'Magnetic Gift Boxes With a Smooth, Premium Opening Experience',
        intro: 'Magnetic gift boxes are one of the most practical premium rigid box structures for B2B brand packaging. ShineleeBox manufactures custom magnetic closure boxes for perfume, cosmetics, skincare, jewelry, electronics, luxury food and promotional gifts.',
        filter: p => p['Product ID'].startsWith('MG-') || ((p['Main Category'] === 'Rigid Box' || p['Main Category'] === 'Luxury Gift Boxes') && ((p['Product Name'] || '').toLowerCase().includes('magnetic') || (p['Subcategory'] || '').toLowerCase().includes('magnetic') || (p['Custom Options'] || '').toLowerCase().includes('magnetic')))
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'drawer-gift-boxes',
        name: 'Drawer Gift Boxes',
        title: 'Custom Drawer Gift Boxes Manufacturer | ShineleeBox',
        desc: 'Custom drawer gift boxes for cosmetics, perfume, chocolate, jewelry and retail gift sets. Sliding rigid structure, ribbon pulls, inserts, premium printing and MOQ from 50 pcs.',
        h1: 'Custom Drawer Gift Boxes',
        heroSub: 'Drawer Gift Boxes That Make Small Products Feel More Valuable',
        intro: 'A sliding drawer structure gives products a neat, layered reveal and turns simple packaging into a more memorable opening experience. ShineleeBox creates custom drawer gift boxes for brands that want a compact structure with a premium reveal.',
        filter: p => {
            const id = (p['Product ID'] || '').toUpperCase();
            const name = (p['Product Name'] || '').toLowerCase();
            const sub = (p['Subcategory'] || '').toLowerCase();
            const isMooncake = name.includes('mooncake') || id.startsWith('CFP-02') || id === 'IP-004';
            return id.startsWith('DR-') || name.includes('drawer') || sub.includes('drawer') || isMooncake;
        }
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'lid-and-base-boxes',
        name: 'Lid and Base Boxes',
        title: 'Custom Lid and Base Boxes Manufacturer | ShineleeBox',
        desc: 'Custom lid and base boxes for cosmetics, perfume, chocolate, jewelry and premium gifts. Two-piece rigid structure, inserts, specialty paper, foil stamping and MOQ from 50 pcs.',
        h1: 'Custom Lid and Base Boxes',
        heroSub: 'Custom Lid and Base Boxes for Classic Premium Packaging',
        intro: 'A two-piece rigid structure gives products a simple, premium and reliable presentation for retail and gift packaging. Lid and base boxes are a classic rigid packaging structure for brands that need a clean, stable and premium presentation.',
        filter: p => {
            const id = (p['Product ID'] || '').toUpperCase();
            const name = (p['Product Name'] || '').toLowerCase();
            const sub = (p['Subcategory'] || '').toLowerCase();
            const isMooncake = (name.includes('mooncake') || id.startsWith('CFP-02')) && !id.includes('IP-004');
            return name.includes('lid and base') || name.includes('top and bottom') || sub.includes('lid') || isMooncake;
        }
    },
    {
        dir: 'applications',
        slug: 'mooncake-boxes',
        name: 'Mooncake & Festive Packaging',
        title: 'Custom Mooncake & Festive Food Packaging | ShineleeBox',
        desc: 'Custom festive food packaging for mooncakes and seasonal pastry gifting. Luxury drawer structures and branded artwork.',
        h1: 'Mooncake & Festive Packaging',
        heroSub: 'Prestigious packaging for the Mid-Autumn Festival and festive pastries.',
        intro: 'Honor the harvest with exquisite packaging. Our mooncake boxes combine cultural storytelling with high-end structural engineering.',
        filter: p => (p['Main Category'] || '').includes('Mooncake') || (p['Product Name'] || '').toLowerCase().includes('mooncake')
    },

    {
        dir: 'products/rigid-boxes',
        slug: 'foldable-rigid-boxes',
        name: 'Foldable Rigid Boxes',
        title: 'Custom Foldable Rigid Boxes Manufacturer | ShineleeBox',
        desc: 'Custom foldable rigid boxes for gifts, cosmetics, apparel, candles and e-commerce kits. Premium look, flat-pack shipping, magnetic options and MOQ from 50 pcs.',
        h1: 'Custom Foldable Rigid Boxes',
        heroSub: 'Foldable Rigid Boxes That Save Space Without Losing Luxury',
        intro: 'A premium rigid look with flat-pack efficiency, ideal for brands that need better storage, lower shipping volume and strong gift presentation. Foldable rigid boxes combine the premium feel of rigid packaging with the storage and freight advantages of collapsible structures.',
        filter: p => (p['Main Category'] === 'Rigid Box' || p['Main Category'] === 'Luxury Gift Boxes') && ((p['Product Name'] || '').toLowerCase().includes('foldable') || (p['Product Name'] || '').toLowerCase().includes('collapsible') || (p['Subcategory'] || '').toLowerCase().includes('foldable'))
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'custom-shape-boxes',
        name: 'Custom Shape Boxes',
        title: 'Custom Shape Boxes Manufacturer | Creative Rigid Packaging | ShineleeBox',
        desc: 'Custom shape boxes for perfume, cosmetics, gifts, food and promotional campaigns. Irregular structures, die-cut windows, inserts, premium finishing and MOQ from 50 pcs.',
        h1: 'Custom Shape Boxes',
        heroSub: 'Custom Shape Boxes for Creative Brand Packaging',
        intro: 'From triangle perfume boxes to bottle-shaped, heart-shaped and suitcase-style packaging, ShineleeBox helps brands build structure-led product impact. Custom shape boxes help brands move beyond standard square packaging.',
        filter: p => p['Product ID'].startsWith('CS-') || ((p['Main Category'] === 'Rigid Box' || p['Main Category'] === 'Luxury Gift Boxes' || p['Main Category'] === 'Beauty & Perfume Packaging') && ((p['Product Name'] || '').toLowerCase().includes('shape') || (p['Product Name'] || '').toLowerCase().includes('triangle') || (p['Product Name'] || '').toLowerCase().includes('arch') || (p['Product Name'] || '').toLowerCase().includes('hexagon') || (p['Product Name'] || '').toLowerCase().includes('pyramid') || (p['Subcategory'] || '').toLowerCase().includes('shape')))
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'lid-and-base-boxes',
        name: 'Lid and Base Boxes',
        title: 'Custom Lid and Base Boxes Manufacturer | ShineleeBox',
        desc: 'Custom lid and base boxes for cosmetics, perfume, chocolate, jewelry and premium gifts. Two-piece rigid structure, inserts, specialty paper, foil stamping and MOQ from 50 pcs.',
        h1: 'Custom Lid and Base Boxes',
        heroSub: 'Custom Lid and Base Boxes for Classic Premium Packaging',
        intro: 'A two-piece rigid structure gives products a simple, premium and reliable presentation for retail and gift packaging. Lid and base boxes are a classic rigid packaging structure for brands that need a clean, stable and premium presentation.',
        filter: p => (p['Main Category'] === 'Rigid Box' || p['Main Category'] === 'Luxury Gift Boxes' || p['Main Category'] === 'Chocolate Boxes') && ((p['Product Name'] || '').toLowerCase().includes('lid and base') || (p['Product Name'] || '').toLowerCase().includes('top and bottom') || (p['Product Name'] || '').toLowerCase().includes('telescope') || (p['Subcategory'] || '').toLowerCase().includes('lid'))
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'mailing-gift-boxes',
        name: 'Mailing Gift Boxes',
        title: 'Custom Mailing Gift Boxes Manufacturer | Branded Mailer Boxes | ShineleeBox',
        desc: 'Custom mailing gift boxes for e-commerce, promotional kits, subscription boxes and brand delivery. Corrugated or rigid options, printed inside and outside, MOQ from 50 pcs.',
        h1: 'Custom Mailing Gift Boxes',
        heroSub: 'Custom Mailing Gift Boxes for E-Commerce and Brand Delivery',
        intro: 'Printed mailer boxes turn delivery packaging into a branded experience before the product is even opened. Custom mailing gift boxes are designed for brands that need protective shipping packaging with a strong brand impression.',
        filter: p => (p['Product Name'] || '').toLowerCase().includes('mailer') || (p['Product Name'] || '').toLowerCase().includes('mailing') || (p['Subcategory'] || '').toLowerCase().includes('mailer') || (p['Application Tags'] || '').toLowerCase().includes('e-commerce')
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'round-gift-boxes',
        name: 'Round Gift Boxes',
        title: 'Custom Round Gift Boxes Manufacturer | ShineleeBox',
        desc: 'Custom round gift boxes for luxury gifts, candles, and premium collections. Rigid cylinder structures, inserts, printing, foil stamping and MOQ from 50 pcs.',
        h1: 'Custom Round Gift Boxes',
        heroSub: 'Custom Round Gift Boxes for Premium Retail and Gift Packaging',
        intro: 'Cylinder and round rigid boxes create a distinctive presentation. Our round gift boxes are ideal for brands that want a softer, more decorative structure than standard square packaging.',
        filter: p => {
            const id = (p['Product ID'] || '').toUpperCase();
            const name = (p['Product Name'] || '').toLowerCase();
            const isReligiousKeywords = name.includes('miswak') || name.includes('hajj') || name.includes('zakat') || name.includes('wudu') || name.includes('pad');
            return id.startsWith('RG-') && !isReligiousKeywords; // RG here refers to Round in CSV
        }
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'suitcase-gift-boxes',
        name: 'Suitcase Gift Boxes',
        title: 'Custom Suitcase Gift Boxes Manufacturer | ShineleeBox',
        desc: 'Custom suitcase gift boxes with handles for souvenirs, kids gifts, travel sets, and premium promotions. MOQ from 50 pcs.',
        h1: 'Custom Suitcase Gift Boxes',
        heroSub: 'Custom Suitcase Gift Boxes With Handles for Travel-Themed Packaging',
        intro: 'With handles and locks, suitcase boxes feel collectible. These are a memorable packaging structure for souvenir or travel-themed brands.',
        filter: p => {
            const id = (p['Product ID'] || '').toUpperCase();
            const name = (p['Product Name'] || '').toLowerCase();
            return id.startsWith('SC-') || (name.includes('suitcase') && !name.includes('cake') && !name.includes('folding') && !name.includes('magnetic'));
        }
    },
    {
        dir: 'products',
        slug: 'religious-gift-packaging',
        name: 'Religious Gift Packaging',
        title: 'Custom Religious Gift Packaging | Ramadan, Eid & Hajj Boxes',
        desc: 'Premium religious gift packaging manufacturer. Specialized in luxury Ramadan advent calendars, Eid sweet boxes, Miswak holders, and Islamic prayer set packaging.',
        h1: 'Custom Religious Gift Packaging',
        heroSub: 'Bespoke, culturally-compliant luxury packaging for global religious festivals and sacred ceremonies.',
        intro: 'Respect religious tradition with beautifully crafted, culturally compliant custom religious gift packaging. We specialize in designing intricate geometric patterns, 30-day Ramadan calendars, and robust storage for Quran, Miswak, and Tayammum pad kits.',
        filter: p => {
            const id = (p['Product ID'] || '').toUpperCase();
            const name = (p['Product Name'] || '').toLowerCase();
            const app = (p['Application Tags'] || '').toLowerCase();
            return id.startsWith('RG-') || // Some religious products use RG- in our source CSV
                   name.includes('miswak') || name.includes('hajj') || name.includes('zakat') || 
                   name.includes('wudu') || name.includes('pad') || name.includes('tayammum') || 
                   name.includes('islamic') || name.includes('ramadan') || name.includes('eid') ||
                   app.includes('religious') || app.includes('islamic');
        }
    },
    // --- APPLICATIONS (Industry-based Solutions) ---
    {
        dir: 'applications',
        slug: 'beauty-perfume-personal-care-packaging',
        name: 'Beauty, Perfume & Personal Care',
        title: 'Custom Beauty & Perfume Packaging | Luxury Rigid Gift Boxes',
        desc: 'Premium manufacturer of custom perfume packaging and cosmetic gift boxes. We supply discovery sets, skincare PR boxes, and makeup sets with gold foil.',
        h1: 'Beauty, Perfume & Personal Care Packaging',
        heroSub: 'Factory-direct luxury perfume gift boxes, premium skincare packaging, and custom beauty PR kits starting at 50 pcs MOQ.',
        intro: 'First impressions are critical for premium beauty brands. From magnetic closures for perfumes to pull-out drawer sets for skincare, we deliver structural masterpieces designed to elevate the unboxing experience.',
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('beauty') || (p['Application Tags'] || '').toLowerCase().includes('perfume') || (p['Application Tags'] || '').toLowerCase().includes('fragrance') || (p['Application Tags'] || '').toLowerCase().includes('skincare') || (p['Application Tags'] || '').toLowerCase().includes('cosmetic')
    },
    {
        dir: 'applications',
        slug: 'chocolate-and-food-packaging',
        name: 'Chocolate & Truffle Packaging',
        title: 'Custom Chocolate & Truffle Packaging Solutions | ShineleeBox',
        desc: 'High-end custom food packaging manufacturer. Luxury chocolate boxes and gourmet food gift sets with food-safe materials.',
        h1: 'Chocolate & Truffle Packaging',
        heroSub: 'Premium food-safe rigid boxes for luxury confectionery and festive food brands.',
        intro: 'Elevate the taste of luxury. Our chocolate packaging solutions use food-safe boards and custom-engineered trays to ensure a high-end gift experience.',
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('chocolate') || (p['Main Category'] || '').includes('Chocolate')
    },
    {
        dir: 'applications',
        slug: 'cake-boxes',
        name: 'Cake & Bakery Packaging',
        title: 'Custom Cake & Bakery Packaging Manufacturer | ShineleeBox',
        desc: 'Custom cake boxes for cupcakes, mini cakes, pastries and dessert gifting. Food-safe materials, custom size and printing. MOQ from 50 pcs.',
        h1: 'Cake & Bakery Packaging',
        heroSub: 'Professional bakery packaging for cake shops and dessert brands.',
        intro: 'Deliver your sweetness in style. Our custom cake boxes are designed for retail presentation and safe transport, featuring food-grade boards and elegant window designs.',
        filter: p => (p['Main Category'] || '').includes('Cake') || (p['Application Tags'] || '').toLowerCase().includes('bakery') || (p['Product Name'] || '').toLowerCase().includes('cake')
    },
    {
        dir: 'applications',
        slug: 'date-dessert-boxes',
        name: 'Date & Arabic Sweet Packaging',
        title: 'Custom Date & Arabic Sweet Packaging Manufacturer | ShineleeBox',
        desc: 'Custom food gift boxes for dates, Arabic sweets, and Ramadan gifting. Elegant rigid structures and traditional patterns.',
        h1: 'Date & Arabic Sweet Packaging',
        heroSub: 'Specialist in Ramadan and Eid luxury dates packaging.',
        intro: 'Celebrate traditions with high-end presentation. Our date dessert boxes are engineered for premium gifting, featuring culturally compliant Islamic geometric patterns.',
        filter: p => (p['Main Category'] || '').includes('Date') || (p['Product Name'] || '').toLowerCase().includes('date') || (p['Product Name'] || '').toLowerCase().includes('arabic sweet')
    },
    {
        dir: 'applications',
        slug: 'mooncake-boxes',
        name: 'Mooncake & Festive Food Packaging',
        title: 'Custom Mooncake & Festive Food Packaging | ShineleeBox',
        desc: 'Custom festive food packaging for mooncakes and seasonal pastry gifting. Luxury drawer structures and branded artwork.',
        h1: 'Mooncake & Festive Food Packaging',
        heroSub: 'Prestigious packaging for the Mid-Autumn Festival and festive pastries.',
        intro: 'Honor the harvest with exquisite packaging. Our mooncake boxes combine cultural storytelling with high-end structural engineering.',
        filter: p => (p['Main Category'] || '').includes('Mooncake') || (p['Product Name'] || '').toLowerCase().includes('mooncake')
    },
    {
        dir: 'applications',
        slug: 'wine-liquor-packaging',
        name: 'Wine & Liquor Packaging',
        title: 'Custom Wine & Liquor Packaging Manufacturer | ShineleeBox',
        desc: 'Bespoke wine and spirits packaging. High-end rigid boxes for whiskey, champagne, and limited edition liquor sets.',
        h1: 'Wine & Liquor Packaging',
        heroSub: 'Luxury packaging solutions for premium beverage brands and corporate liquor gifts.',
        intro: 'Protect and present with sophistication. Our wine and liquor boxes are built with high-durability boards and secure inserts for heavy glass bottles.',
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('wine') || (p['Application Tags'] || '').toLowerCase().includes('liquor') || (p['Application Tags'] || '').toLowerCase().includes('spirits') || (p['Product Name'] || '').toLowerCase().includes('wine') || (p['Product Name'] || '').toLowerCase().includes('whiskey')
    },
    {
        dir: 'applications',
        slug: 'jewelry-and-accessories-packaging',
        name: 'Jewelry & Accessories Packaging',
        title: 'Custom Jewelry & Accessories Packaging | ShineleeBox',
        desc: 'Bespoke jewelry box manufacturer. Custom magnetic jewelry boxes and watch packaging with luxury inserts.',
        h1: 'Jewelry & Accessories Packaging',
        heroSub: 'Exquisite custom rigid boxes designed to protect and highlight high-value jewelry and accessories.',
        intro: 'The sparkle of your product deserves a worthy stage. We manufacture high-precision jewelry packaging with soft-touch interiors and elegant branding.',
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('jewelry') || (p['Application Tags'] || '').toLowerCase().includes('accessories') || (p['Application Tags'] || '').toLowerCase().includes('watch')
    },
    {
        dir: 'applications',
        slug: 'corporate-and-retail-packaging',
        name: 'Corporate & Retail Packaging',
        title: 'Custom Corporate & Retail Packaging Solutions | ShineleeBox',
        desc: 'Premium corporate gift boxes and luxury retail packaging manufacturer. Custom PR kits and high-end shopping bags.',
        h1: 'Corporate & Retail Packaging',
        heroSub: 'Bespoke VIP onboarding kits and luxury retail carrier packaging.',
        intro: 'Build professional relationships with packaging that represents your brand values. From branded mailers to extravagant VIP gift boxes.',
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('corporate') || (p['Application Tags'] || '').toLowerCase().includes('retail') || (p['Application Tags'] || '').toLowerCase().includes('promotion')
    },
    {
        dir: 'applications',
        slug: 'electronics-and-premium-gift-packaging',
        name: 'Electronics & Premium Packaging',
        title: 'Electronics & Premium Packaging Manufacturer | ShineleeBox',
        desc: 'Luxury electronics gift boxes and premium LED/sound packaging. Custom rigid box manufacturer with integrated technology.',
        h1: 'Electronics & Premium Packaging',
        heroSub: 'Premium rigid boxes with integrated light sensors, sound modules, and HD video screens.',
        intro: 'Protect and highlight high-value technology. We craft custom electronics packaging with secure shock-absorbing inserts and clean magnetic closures.',
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('electronics') || (p['Application Tags'] || '').toLowerCase().includes('video') || (p['Application Tags'] || '').toLowerCase().includes('led') || (p['Application Tags'] || '').toLowerCase().includes('sound')
    },
    // --- HOLIDAY & OCCASIONS ---
    {
        dir: 'holiday-occasions',
        slug: 'christmas-packaging',
        name: 'Christmas Packaging',
        title: 'Custom Christmas Packaging | Advent Calendar Box Factory',
        desc: 'Direct-factory Christmas packaging. Specialized in luxury 24-day advent calendars and festive gift boxes.',
        h1: 'Christmas Packaging',
        heroSub: 'High-volume production for holiday unboxing campaigns. FSC certified festive packaging.',
        intro: 'Proven scale for global brands. We combine massive production capacity with artisanal rigid box craftsmanship for the unboxing season.',
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('christmas') || (p['Main Category'] === 'Advent Calendar Boxes'),
        thumbnail: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'ramadan-and-eid-packaging',
        name: 'Ramadan & Eid Packaging',
        title: 'Custom Ramadan & Eid Gift Packaging | Luxury Islamic Gift Boxes',
        desc: 'Bespoke Ramadan advent calendars, Eid sweet boxes, and traditional Islamic pattern gift packaging. Miswak and Zakat storage solutions.',
        h1: 'Ramadan & Eid Packaging',
        heroSub: 'Respectful and elegant custom packaging for the holy month of Ramadan and Eid celebrations.',
        intro: 'Honor tradition with sophistication. Our collection features specialized structures like 30-compartment dates boxes and religious ritual storage.',
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('ramadan') || (p['Holiday Tags'] || '').toLowerCase().includes('eid') || (p['Product Name'] || '').toLowerCase().includes('miswak') || (p['Product Name'] || '').toLowerCase().includes('zakat') || (p['Product Name'] || '').toLowerCase().includes('wudu'),
        thumbnail: 'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'valentines-day-packaging',
        name: "Valentine's Day Packaging",
        title: "Custom Valentine's Day Gift Boxes | ShineleeBox",
        desc: "Premium Valentine's Day gift packaging. Custom heart-shaped boxes and luxury flower gift sets.",
        h1: "Valentine's Day Packaging",
        heroSub: 'Capture the essence of romance with premium custom gift boxes.',
        intro: "Love is in the details. We create romantic, high-end packaging that speaks to the heart.",
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('valentine'),
        thumbnail: 'https://images.unsplash.com/photo-1518199266791-739d6ff26ef0?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'wedding-and-anniversary-packaging',
        name: 'Wedding & Anniversary Packaging',
        title: 'Custom Wedding & Anniversary Gift Boxes | ShineleeBox',
        desc: 'Bespoke wedding and anniversary packaging manufacturer. Luxury invitation boxes and bridal gift sets.',
        h1: 'Wedding & Anniversary Packaging',
        heroSub: 'Timeless and elegant custom packaging for life’s most precious commitments.',
        intro: 'Make the commitment as beautiful as the celebration. Our collection focuses on timeless elegance.',
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('wedding') || (p['Holiday Tags'] || '').toLowerCase().includes('anniversary'),
        thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'baby-and-family-keepsake-packaging',
        name: 'Baby & Family Keepsake Packaging',
        title: 'Custom Baby Milestone & Family Memory Boxes | ShineleeBox',
        desc: 'Bespoke baby shower gift boxes and newborn milestone keepsake boxes. Durable rigid packaging meant to last.',
        h1: 'Baby & Family Keepsake Packaging',
        heroSub: 'Protect your most precious memories for generations.',
        intro: 'Packaging that preserves a lifetime. We specialize in durable, museum-quality keepsake boxes for families.',
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('baby') || (p['Holiday Tags'] || '').toLowerCase().includes('family') || (p['Main Category'] === 'Keepsake Boxes'),
        thumbnail: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'graduation-packaging',
        name: 'Graduation Packaging',
        title: 'Custom Graduation Gift Boxes & Diploma Cases | ShineleeBox',
        desc: 'Bespoke graduation gift packaging and diploma certificate cases.',
        h1: 'Graduation Packaging',
        heroSub: 'Honor academic excellence with prestigious custom graduation gift boxes.',
        intro: 'Mark the milestone of success with prestigious packaging designed for institutions.',
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('graduation'),
        thumbnail: 'https://images.unsplash.com/photo-1523050853051-be991f85a6ad?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'mothers-day-fathers-day-packaging',
        name: "Corporate Holiday Gifts",
        title: "Custom Corporate Holiday Gift Packaging | ShineleeBox",
        desc: "Custom gift boxes for corporate holiday events and employee gifts.",
        h1: "Corporate Holiday Gifts",
        heroSub: 'Celebrate milestones with premium branded gift sets.',
        intro: "Gratitude deserves a grand presentation. We manufacture limited-edition gift packaging for corporate milestones.",
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('corporate') && (p['Holiday Tags'] || '').toLowerCase().includes('holiday'),
        thumbnail: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'other-occasions',
        name: 'Other Occasions',
        title: 'Custom Special Occasion Packaging | ShineleeBox',
        desc: 'Bespoke packaging for all of life’s unique celebrations.',
        h1: 'Other Occasions Packaging',
        heroSub: 'Custom high-end packaging solutions for every unique event in your calendar.',
        intro: 'Every celebration is an unboxing opportunity. Our "Other Occasions" collection serves the unique and the cultural.',
        filter: p => p['Product ID'].startsWith('RG-') || p['Product ID'].startsWith('LM-') || p['Product ID'].startsWith('CS-'),
        thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
    }
];


function buildCategoryPages() {
    categories.forEach(cat => {
        const categoryDir = path.join(__dirname, cat.dir);
        ensureDir(categoryDir);

        const marketSuffix = " | FSC Certified Manufacturer for USA & Middle East";
        const customTitle = `[Wholesale] ${cat.title}${marketSuffix}`;
        const customDesc = `${cat.desc} Disney FAMA & BSCI certified factory. Supporting 5-7 days fast sampling, free dielines, and USA DDP shipping. Specialist in Middle East luxury cultural packaging.`;

        let html = headTemplate(customTitle, customDesc, cat.dir.includes('/') ? '../../' : '../') + headerTemplate(cat.dir.includes('/') ? '../../' : '../');
        
        let matchedProducts = products.filter(cat.filter);

        if (cat.slug === 'other-occasions') {
            matchedProducts = products.filter(p => p['Product ID'].startsWith('RG-') || p['Product ID'].startsWith('LM-') || p['Main Category'] === 'Mooncake Boxes' || p['Product ID'].startsWith('CS-'));
        } else if (matchedProducts.length === 0) {
            matchedProducts = products.slice(0, 8);
        }

        html += `
    <section class="bg-brandGreen text-white py-16 sm:py-24 border-b border-brandGold-dark">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav class="mb-6 text-[10px] font-bold uppercase tracking-widest text-brandGold-light flex items-center space-x-2">
                <a href="${cat.dir.includes('/') ? '../../' : '../'}index.html" class="hover:text-white transition-colors">Home</a>
                <span>/</span>
                <span>${cat.dir.startsWith('products') ? 'Products' : cat.dir.startsWith('applications') ? 'Applications' : 'Holiday Occasions'}</span>
                <span>/</span>
                <span class="text-white">${cat.name}</span>
            </nav>
            <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">${cat.h1}</h1>
            <p class="text-slate-300 text-lg sm:text-xl max-w-3xl font-light leading-relaxed">${cat.heroSub}</p>
        </div>
    </section>

    <section class="py-16 bg-brandIvory border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-8">
                    <h2 class="text-sm font-bold text-brandGreen uppercase tracking-widest mb-4">B2B Manufacturing Excellence</h2>
                    <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">${cat.intro}</p>
                </div>
                <div class="lg:col-span-4 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <h3 class="text-xs font-bold text-brandGreen uppercase tracking-widest mb-4">Core Specifications</h3>
                    <ul class="space-y-3 text-xs text-slate-500 font-semibold">
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Custom Sizes & Structural Design</li>
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Premium Paper: Art, Kraft, Specialty</li>
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Finishing: Foil, UV, Emboss, Matte</li>
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Tailored Inner Dividers</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div class="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all flex flex-col group h-full">
                <div class="h-64 overflow-hidden bg-white relative p-4 flex items-center justify-center cursor-pointer" onclick="window.location.href='${cat.dir.includes('/') ? '../../' : '../'}products/${prefix}-${idLower}.html'">
                    <img src="${imgPath}" alt="${escapeHtml(name)}" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-brandGreen/0 group-hover:bg-brandGreen/5 transition-colors"></div>
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between border-t border-slate-50">
                    <div>
                        <div class="text-[10px] font-bold text-brandGold uppercase tracking-tighter mb-1">${escapeHtml(p['Subcategory'] || 'Custom Rigid Packaging')}</div>
                        <h3 class="font-serif text-base font-bold text-brandGreen mb-3 group-hover:text-brandGold transition-colors leading-snug">
                            <a href="${cat.dir.includes('/') ? '../../' : '../'}products/${prefix}-${idLower}.html">${escapeHtml(name)}</a>
                        </h3>
                    </div>
                    <div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MOQ 50</span>
                        <a href="${cat.dir.includes('/') ? '../../' : '../'}products/${prefix}-${idLower}.html" class="text-[10px] font-bold text-brandGreen uppercase border-b border-brandGreen hover:text-brandGold hover:border-brandGold transition-all">Details</a>
                    </div>
                </div>
            </div>`;
                        }).join('')}
        </div>
        
        ${cat.slug === 'advent-calendar-boxes' ? `
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
            <div class="bg-brandGreen text-white p-8 sm:p-12 rounded-2xl shadow-2xl border-2 border-brandGold-dark overflow-hidden relative group">
                <div class="absolute top-0 right-0 w-64 h-64 bg-brandGold/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div class="md:col-span-8">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-brandGold text-brandGreen uppercase tracking-widest mb-4">Limited Offer for 2026</span>
                        <h2 class="font-serif text-3xl sm:text-4xl font-bold mb-4">🎁 FREE 2026 ADVENT CALENDAR DIELINE SERVICE</h2>
                        <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">Eliminate structural design complexity. Our engineers provide **100% free production-ready vector dielines** for your holiday campaigns.</p>
                    </div>
                    <div class="md:col-span-4 text-center md:text-right">
                        <a href="${cat.dir.includes('/') ? '../../' : '../'}contact.html?subject=Request%20Free%202026%20Advent%20Dieline&dieline=true" class="inline-flex items-center justify-center px-8 py-4 bg-brandGold text-brandGreen-dark font-bold rounded-lg hover:bg-brandGold-light transition-all shadow-lg transform hover:-translate-y-1">Claim Free Dieline</a>
                    </div>
                </div>
            </div>
        </section>` : ''}

        <div class="mt-20 border-t border-slate-200 pt-16 text-center max-w-3xl mx-auto">
            <h2 class="font-serif text-2xl font-bold text-brandGreen mb-6">Partnering for Global B2B Scale</h2>
            <p class="text-slate-600 text-sm leading-relaxed mb-8">ShineleeBox is a Disney FAMA, BSCI, and FSC certified manufacturer. We delivered 300,000 advent calendars in 60 days for Douglas. Service includes USA DDP logistics, free dielines, and 5-7 days rapid prototyping.</p>
            <a href="${cat.dir.includes('/') ? '../../' : '../'}contact.html" class="inline-flex items-center text-brandGold font-bold border-b-2 border-brandGold pb-1 hover:text-brandGreen hover:border-brandGreen transition-all">Request Wholesale Pricing & Catalog →</a>
        </div>
    </section>`;

        html += footerTemplate(cat.dir.includes('/') ? '../../' : '../');
        fs.writeFileSync(path.join(categoryDir, `${cat.slug}.html`), html, 'utf8');
    });

    let holidaysHtml = headTemplate("Holiday & Special Occasions Custom Packaging | ShineleeBox", "Custom holiday gift packaging for Christmas, Ramadan, Eid, Weddings and more. Disney FAMA certified factory.", '../') + headerTemplate('../');
    holidaysHtml += `
    <section class="bg-brandGreen text-white py-20 border-b border-brandGold-dark">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="font-serif text-4xl sm:text-6xl font-bold mb-6">Holiday & Special Occasions</h1>
            <p class="text-slate-300 text-lg max-w-2xl font-light">Tailored packaging solutions that honor tradition and celebrate success. From 24-day advent calendars to luxury cultural gift sets.</p>
        </div>
    </section>
    <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            ${categories.filter(c => c.dir === 'holiday-occasions')
            .map(h => `
            <div class="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                    <div class="h-48 overflow-hidden bg-slate-100">
                        <img src="${h.thumbnail || 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80'}" alt="${h.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-8"><h3 class="font-serif text-2xl font-bold text-brandGreen mb-3">${h.name}</h3><p class="text-slate-500 text-sm leading-relaxed mb-6">${h.desc}</p></div>
                </div>
                <div class="p-8 pt-0"><a href="${h.slug}.html" class="block text-center text-xs font-bold text-brandGreen hover:text-brandGold border border-brandGreen hover:border-brandGold py-2 rounded transition-colors uppercase tracking-widest">View Solutions</a></div>
            </div>`).join('')}
        </div>
    </section>`;
    holidaysHtml += footerTemplate('../');
    fs.writeFileSync(path.join(holidayOccasionsDir, 'index.html'), holidaysHtml, 'utf8');
}

buildCategoryPages();
console.log("All B2B Category and Holiday landing pages generated successfully!");
