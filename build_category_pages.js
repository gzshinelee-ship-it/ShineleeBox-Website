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

function resolveImageFolder(id) {
    const productsImagesDir = path.join(__dirname, 'images', 'products');
    if (!fs.existsSync(productsImagesDir)) return '';
    const folders = fs.readdirSync(productsImagesDir);
    const matched = folders.find(f => f.startsWith(id + '_') || f === id);
    if (matched) return matched;
    return '';
}

function parseCSV(content) {
    content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = content.split('\n');
    if (lines.length === 0) return [];
    
    const headerRow = lines[0].replace(/^\uFEFF/, '').trim();
    const headers = [];
    let currentHeader = '';
    let inQuotes = false;
    for (let j = 0; j < headerRow.length; j++) {
        const char = headerRow[j];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
            headers.push(currentHeader.trim());
            currentHeader = '';
        } else currentHeader += char;
    }
    headers.push(currentHeader.trim());

    const records = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        const record = {};
        let cell = '';
        inQuotes = false;
        let headerIndex = 0;
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) {
                const colName = headers[headerIndex];
                if (colName) record[colName] = cell.trim();
                cell = '';
                headerIndex++;
            } else cell += char;
        }
        const lastColName = headers[headerIndex];
        if (lastColName) record[lastColName] = cell.trim();
        
        Object.keys(record).forEach(k => {
            if (record[k].startsWith('"') && record[k].endsWith('"')) {
                record[k] = record[k].substring(1, record[k].length - 1).trim();
            }
        });
        records.push(record);
    }
    return records;
}

function loadAllProductsSimple() {
    const allProducts = [];

    // 1. AC series
    const acCsvPath = path.join(__dirname, '07_AC001_to_AC020_Product_Cards_SEO.csv');
    if (fs.existsSync(acCsvPath)) {
        const content = fs.readFileSync(acCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            allProducts.push({
                'Product ID': r['Product ID'],
                'Product Name': r['Product Name'],
                'Main Category': r['Main Category'] || r['Category'] || 'Advent Calendar Boxes',
                'Subcategory': r['Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': r['Image Folder'] || resolveImageFolder(r['Product ID'])
            });
        });
    }

    // 2. Interactive (IP series)
    const ipCsvPath = path.join(__dirname, 'Accio_Interactive_Product_Upload.csv');
    if (fs.existsSync(ipCsvPath)) {
        const content = fs.readFileSync(ipCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            allProducts.push({
                'Product ID': r['Product ID'],
                'Product Name': r['Product Name EN'],
                'Main Category': 'Interactive Packaging',
                'Subcategory': r['Product Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday / Occasion Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': r['Image Folder'] || resolveImageFolder(r['Product ID'])
            });
        });
    }

    // 3. Life Memory (LM series)
    const lmCsvPath = path.join(__dirname, 'Accio_Life_Memory_Upload.csv');
    if (fs.existsSync(lmCsvPath)) {
        const content = fs.readFileSync(lmCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            allProducts.push({
                'Product ID': r['Product ID'],
                'Product Name': r['Product Name EN'],
                'Main Category': 'Keepsake Boxes',
                'Subcategory': r['Product Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday / Occasion Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': resolveImageFolder(r['Product ID'])
            });
        });
    }

    // 4. Religious (RG series)
    const rgCsvPath = path.join(__dirname, 'Accio_Religious_Product_Upload.csv');
    if (fs.existsSync(rgCsvPath)) {
        const content = fs.readFileSync(rgCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            allProducts.push({
                'Product ID': r['Product ID'],
                'Product Name': r['Product Name EN'],
                'Main Category': 'Religious Gift Packaging',
                'Subcategory': r['Product Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday / Occasion Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': resolveImageFolder(r['Product ID'])
            });
        });
    }

    // 5. Greeting Cards (GC series)
    const gcCsvPath = path.join(__dirname, 'Accio_Greeting_Cards_Upload.csv');
    if (fs.existsSync(gcCsvPath)) {
        const content = fs.readFileSync(gcCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            allProducts.push({
                'Product ID': r['Product ID'],
                'Product Name': r['Product Name EN'],
                'Main Category': 'Greeting Cards',
                'Subcategory': r['Product Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday / Occasion Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': resolveImageFolder(r['Product ID'])
            });
        });
    }

    // 6. Cosmetic & Perfume (PP/CP series)
    const cpCsvPath = path.join(__dirname, 'Accio_Cosmetic_Perfume_Final.csv');
    if (fs.existsSync(cpCsvPath)) {
        const content = fs.readFileSync(cpCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            allProducts.push({
                'Product ID': r['Product ID'],
                'Product Name': r['Product Name EN'],
                'Main Category': 'Beauty & Perfume Packaging',
                'Subcategory': r['Product Subcategory'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday / Occasion Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': resolveImageFolder(r['Product ID'])
            });
        });
    }

    // 7. Chocolate & Food (CFP series)
    const cfpCsvPath = path.join(__dirname, 'Accio_Chocolate_Food_Upload.csv');
    if (fs.existsSync(cfpCsvPath)) {
        const content = fs.readFileSync(cfpCsvPath, 'utf8');
        const rows = parseCSV(content);
        rows.forEach(r => {
            allProducts.push({
                'Product ID': r['Product ID'],
                'Product Name': r['Product Name'],
                'Main Category': r['Products Directory'] || 'Chocolate & Food Packaging',
                'Subcategory': r['Box Type'] || '',
                'Application Tags': r['Application Tags'] || '',
                'Holiday Tags': r['Holiday Tags'] || '',
                'Custom Options': r['Custom Options'] || '',
                'Image Folder': resolveImageFolder(r['Product ID'])
            });
        });
    }

    return allProducts.filter(p => p['Product ID']);
}

const products = loadAllProductsSimple();
const holidayOccasionsDir = path.join(__dirname, 'holiday-occasions');
ensureDir(holidayOccasionsDir);

const categories = [
    // --- PRODUCTS (products/) ---
    {
        dir: 'products',
        slug: 'advent-calendar-boxes',
        name: 'Advent Calendar Boxes',
        title: 'Custom Advent Calendar Boxes Manufacturer | 300k sets per 60 days',
        desc: 'Bespoke advent calendar box manufacturer. Proven capacity: 300,000 sets delivered in 60 days for Douglas. Luxury 12, 24, and 30-day countdown boxes wholesale.',
        h1: 'Custom Advent Calendar Boxes',
        heroSub: 'The ultimate unboxing authority. We manufacture 300k+ set campaigns for global retailers and bespoke limited editions for niche brands.',
        intro: 'Unlock massive sales with high-engagement packaging. ShineleeBox is the manufacturing partner for high-volume retailers like Douglas (Europe), for whom we fulfilled 300,000 double-door sets in just 2 months. Whether you need 50,000 premium rigid boxes (Just Case) or 300,000 retail-ready units, we deliver the quality, speed, and FSC-certified sustainability required for global B2B excellence.',
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
        filter: p => p['Main Category'] === 'Luxury Gift Boxes' || (p['Main Category'] || '').toLowerCase().includes('rigid') || (p['Subcategory'] || '').toLowerCase().includes('drawer') || (p['Subcategory'] || '').toLowerCase().includes('magnetic') || (p['Product Name'] || '').toLowerCase().includes('magnetic') || (p['Product Name'] || '').toLowerCase().includes('drawer') || (p['Product Name'] || '').toLowerCase().includes('rigid') || (p['Custom Options'] || '').toLowerCase().includes('magnetic') || (p['Custom Options'] || '').toLowerCase().includes('drawer') || (p['Custom Options'] || '').toLowerCase().includes('rigid')
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
        filter: p => (p['Main Category'] === 'Rigid Box' || p['Main Category'] === 'Luxury Gift Boxes') && ((p['Product Name'] || '').toLowerCase().includes('magnetic') || (p['Subcategory'] || '').toLowerCase().includes('magnetic') || (p['Custom Options'] || '').toLowerCase().includes('magnetic'))
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
        filter: p => (p['Main Category'] === 'Rigid Box' || p['Main Category'] === 'Beauty & Perfume Packaging' || p['Main Category'] === 'Luxury Gift Boxes') && ((p['Product Name'] || '').toLowerCase().includes('drawer') || (p['Subcategory'] || '').toLowerCase().includes('drawer') || (p['Custom Options'] || '').toLowerCase().includes('drawer'))
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
        filter: p => (p['Main Category'] === 'Rigid Box' || p['Main Category'] === 'Luxury Gift Boxes' || p['Main Category'] === 'Beauty & Perfume Packaging') && ((p['Product Name'] || '').toLowerCase().includes('shape') || (p['Product Name'] || '').toLowerCase().includes('triangle') || (p['Product Name'] || '').toLowerCase().includes('arch') || (p['Product Name'] || '').toLowerCase().includes('hexagon') || (p['Product Name'] || '').toLowerCase().includes('pyramid') || (p['Subcategory'] || '').toLowerCase().includes('shape'))
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
        desc: 'Custom round gift boxes for chocolate, desserts, flowers, cosmetics, candles and luxury gifts. Rigid cylinder structures, inserts, printing, foil stamping and MOQ from 50 pcs.',
        h1: 'Custom Round Gift Boxes',
        heroSub: 'Custom Round Gift Boxes for Premium Retail and Food Packaging',
        intro: 'Cylinder and round rigid boxes create a distinctive presentation for food, beauty, floral and lifestyle products. Round gift boxes are ideal for brands that want a softer, more decorative structure than standard square packaging.',
        filter: p => (p['Product Name'] || '').toLowerCase().includes('round') || (p['Product Name'] || '').toLowerCase().includes('cylinder') || (p['Product Name'] || '').toLowerCase().includes('cylindrical') || (p['Subcategory'] || '').toLowerCase().includes('round')
    },
    {
        dir: 'products/rigid-boxes',
        slug: 'suitcase-gift-boxes',
        name: 'Suitcase Gift Boxes',
        title: 'Custom Suitcase Gift Boxes Manufacturer | ShineleeBox',
        desc: 'Custom suitcase gift boxes with handles for souvenirs, kids gifts, travel sets, cosmetics, retail gifts and premium promotions. Rigid or corrugated options, MOQ from 50 pcs.',
        h1: 'Custom Suitcase Gift Boxes',
        heroSub: 'Custom Suitcase Gift Boxes With Handles for Travel-Themed Packaging',
        intro: 'With handles, locks and travel-inspired details, suitcase boxes feel collectible and are often kept long after the product is opened. Suitcase gift boxes are a memorable packaging structure for brands that want a travel, childhood, souvenir or collectible theme.',
        filter: p => (p['Product Name'] || '').toLowerCase().includes('suitcase') || (p['Subcategory'] || '').toLowerCase().includes('suitcase') || (p['Product Name'] || '').toLowerCase().includes('handle')
    },
    {
        dir: 'products',
        slug: 'interactive-packaging',
        name: 'Interactive Packaging',
        title: 'Custom Interactive Packaging | Music, LED & Video Boxes | ShineleeBox',
        desc: 'ShineleeBox is the leading Chinese manufacturer of custom interactive packaging, including LED light-up boxes, music gift boxes, and video presentation boxes with integrated LCD screens.',
        h1: 'Custom Interactive Packaging',
        heroSub: 'Elevate your unboxing with sensor-activated light-up gift boxes, embedded music modules, and integrated video screens for premium brand engagement.',
        intro: 'Engage all of your customer\'s senses with interactive packaging. ShineleeBox leads the industry in integrating electronic sound modules, LED lighting arrays, and digital video screens directly into rigid box structures, creating a memorable, shareable social media moment for influencer PR campaigns and luxury launches.',
        filter: p => p['Main Category'] === 'Interactive Packaging' || p['Product ID'].startsWith('IP-')
    },
    {
        dir: 'products',
        slug: 'keepsake-boxes',
        name: 'Keepsake Boxes',
        title: 'Custom Keepsake Boxes & Premium Memory Packaging | ShineleeBox',
        desc: 'Manufacturer of custom keepsake boxes for baby milestones, weddings, anniversaries, graduations, and religious memories. Heavy rigid board boxes with luxury lining and dividers.',
        h1: 'Custom Keepsake Boxes',
        heroSub: 'Bespoke, long-lasting rigid memory and keepsake packaging with premium ribbon closures and velvet-touch drawers.',
        intro: 'Some packaging is simply "Too Good To Throw Away." ShineleeBox designs and constructs heavy, high-durability custom keepsake boxes meant to be stored and cherished for years. These high-end memory containers are ideal for baby milestones, wedding invitations, graduations, and emotional commemorative campaigns.',
        filter: p => p['Main Category'] === 'Keepsake Boxes' || p['Product ID'].startsWith('LM-') || (p['Subcategory'] || '').toLowerCase().includes('keepsake') || (p['Application Tags'] || '').toLowerCase().includes('keepsake') || (p['Product Name'] || '').toLowerCase().includes('keepsake') || (p['Product Name'] || '').toLowerCase().includes('memorial') || p['Product ID'] === 'IP-006' || p['Product ID'] === 'IP-007' || p['Product ID'] === 'AC-003' || p['Product ID'] === 'AC-015' || p['Product ID'] === 'AC-016'
    },
    {
        dir: 'products',
        slug: 'greeting-cards',
        name: 'Greeting Cards',
        title: 'Custom Luxury Greeting Cards & PR Invitation Cards | ShineleeBox',
        desc: 'Bespoke greeting card manufacturer in Guangzhou, China. Custom luxury greeting cards, interactive sound & music cards, pop-up 3D cards, and premium video invitations for corporate events.',
        h1: 'Custom Luxury Greeting Cards',
        heroSub: 'Custom pop-up cards, electronic music greeting cards, and LCD video invitation mailers with hot foil stamping and premium envelopes.',
        intro: 'Complement your product packaging or launch custom mailing campaigns with our bespoke luxury greeting cards. ShineleeBox manufactures premium hot foil-stamped cards, intricate 3D pop-up structural cards, and high-tech greeting cards with embedded music chips and video displays for corporate announcements and VIP invitations.',
        filter: p => p['Main Category'] === 'Greeting Cards' || p['Product ID'].startsWith('GC-') || (p['Product Name'] || '').toLowerCase().includes('card') || (p['Subcategory'] || '').toLowerCase().includes('card') || p['Product ID'] === 'IP-004' || p['Product ID'] === 'IP-005'
    },
    {
        dir: 'products',
        slug: 'religious-gift-packaging',
        name: 'Religious Gift Packaging',
        title: 'Custom Religious Gift Packaging | Ramadan, Eid & Hajj Boxes',
        desc: 'Premium religious gift packaging manufacturer. Specialized in luxury Ramadan advent calendars, Eid sweet boxes, Holy Water bottle boxes, and Islamic prayer set packaging.',
        h1: 'Custom Religious Gift Packaging',
        heroSub: 'Bespoke, culturally-compliant luxury packaging for global religious festivals and sacred ceremonies manufactured in China.',
        intro: 'Respect religious tradition with beautifully crafted, culturally compliant custom religious gift packaging. ShineleeBox specializes in designing intricate geometric patterns, multi-layer drawer calendars for the 30 days of Ramadan, and robust keepsake boxes for Quran storage, Eid sweets, and Tayammum pad kits.',
        filter: p => p['Main Category'] === 'Religious Gift Packaging' || p['Product ID'].startsWith('RG-') || (p['Subcategory'] || '').toLowerCase().includes('ramadan') || (p['Subcategory'] || '').toLowerCase().includes('eid') || (p['Application Tags'] || '').toLowerCase().includes('religious') || (p['Product Name'] || '').toLowerCase().includes('ramadan') || (p['Product Name'] || '').toLowerCase().includes('eid') || (p['Product Name'] || '').toLowerCase().includes('islamic') || (p['Product Name'] || '').toLowerCase().includes('tayammum') || (p['Product Name'] || '').toLowerCase().includes('wudu') || (p['Product Name'] || '').toLowerCase().includes('miswak') || (p['Product Name'] || '').toLowerCase().includes('hajj')
    },
    // --- APPLICATIONS (applications/) ---
    {
        dir: 'applications',
        slug: 'beauty-perfume-personal-care-packaging',
        name: 'Beauty, Perfume & Personal Care',
        title: 'Beauty, Perfume & Personal Care Packaging Solutions | ShineleeBox',
        desc: 'Bespoke packaging manufacturer for beauty, fragrance, and personal care brands. Custom perfume gift boxes, skincare packaging, spa gift packs, and luxury candle cases.',
        h1: 'Beauty, Perfume & Personal Care Packaging',
        heroSub: 'Luxury rigid box solutions, discovery sets, and custom-shaped display cases manufactured for premium beauty and fragrance houses.',
        intro: 'Deliver a sensory masterpiece before the product is even used. Our custom beauty, perfume, and personal care packaging solutions feature high-density boards, premium textured art wraps, custom-engineered protective inserts, and elegant hot foil stamping details designed for luxury retail and PR campaigns.',
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('perfume') || (p['Application Tags'] || '').toLowerCase().includes('fragrance') || (p['Application Tags'] || '').toLowerCase().includes('beauty') || (p['Application Tags'] || '').toLowerCase().includes('skincare') || (p['Application Tags'] || '').toLowerCase().includes('cosmetic') || (p['Application Tags'] || '').toLowerCase().includes('personal care') || (p['Application Tags'] || '').toLowerCase().includes('bath') || (p['Application Tags'] || '').toLowerCase().includes('candle') || (p['Application Tags'] || '').toLowerCase().includes('spa') || (p['Product Name'] || '').toLowerCase().includes('perfume') || (p['Product Name'] || '').toLowerCase().includes('fragrance') || (p['Product Name'] || '').toLowerCase().includes('beauty') || (p['Product Name'] || '').toLowerCase().includes('skincare') || (p['Product Name'] || '').toLowerCase().includes('cosmetic') || (p['Product Name'] || '').toLowerCase().includes('candle') || (p['Product Name'] || '').toLowerCase().includes('soap') || (p['Product Name'] || '').toLowerCase().includes('bath')
    },
    {
        dir: 'applications',
        slug: 'chocolate-and-food-packaging',
        name: 'Chocolate & Food Packaging',
        title: 'Custom Chocolate & Food Packaging Solutions | ShineleeBox',
        desc: 'High-end custom food packaging manufacturer. Luxury chocolate boxes, dates gift packaging, mooncake boxes, and gourmet food gift sets with food-safe materials.',
        h1: 'Chocolate & Gourmet Food Packaging',
        heroSub: 'Premium food-safe rigid boxes and custom packaging solutions for luxury confectionery, bakery, and festive food brands.',
        intro: 'Elevate the taste of luxury with packaging that protects and presents. Our chocolate and gourmet food packaging solutions use food-safe boards and linings, custom-engineered trays for truffles or dates, and premium finishing to ensure your culinary creations are delivered as a high-end gift experience.',
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('food') || (p['Application Tags'] || '').toLowerCase().includes('chocolate') || (p['Application Tags'] || '').toLowerCase().includes('cake') || (p['Application Tags'] || '').toLowerCase().includes('bakery') || (p['Application Tags'] || '').toLowerCase().includes('dessert') || (p['Product Name'] || '').toLowerCase().includes('chocolate') || (p['Product Name'] || '').toLowerCase().includes('date') || (p['Product Name'] || '').toLowerCase().includes('cake') || (p['Product Name'] || '').toLowerCase().includes('food') || p['Main Category'] === 'Cake Boxes' || p['Main Category'] === 'Chocolate Boxes' || p['Main Category'] === 'Date Dessert Boxes' || p['Main Category'] === 'Mooncake Boxes'
    },
    {
        dir: 'applications',
        slug: 'jewelry-and-accessories-packaging',
        name: 'Jewelry & Accessories Packaging',
        title: 'Custom Jewelry & Accessories Packaging | ShineleeBox',
        desc: 'Bespoke jewelry box manufacturer. Custom magnetic jewelry boxes, luxury watch packaging, and accessories gift boxes with velvet inserts and premium finishing.',
        h1: 'Jewelry & Luxury Accessories Packaging',
        heroSub: 'Exquisite custom rigid boxes designed to protect and highlight high-value jewelry, watches, and premium fashion accessories.',
        intro: 'The sparkle of your product deserves a worthy stage. ShineleeBox manufactures high-precision jewelry and accessories packaging, featuring soft-touch velvet interiors, secure magnetic closures, and elegant hot foil branding to create a timeless unboxing moment for your customers.',
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('jewelry') || (p['Application Tags'] || '').toLowerCase().includes('accessories') || (p['Application Tags'] || '').toLowerCase().includes('watch') || (p['Product Name'] || '').toLowerCase().includes('jewelry') || (p['Product Name'] || '').toLowerCase().includes('watch') || (p['Product Name'] || '').toLowerCase().includes('ring')
    },
    {
        dir: 'applications',
        slug: 'corporate-and-retail-packaging',
        name: 'Corporate & Retail Packaging',
        title: 'Custom Corporate & Retail Packaging Solutions | ShineleeBox',
        desc: 'Premium corporate gift boxes and luxury retail packaging manufacturer. Custom PR kits, employee welcome boxes, and high-end retail carrier packaging.',
        h1: 'Corporate & Retail Packaging',
        heroSub: 'Bespoke VIP onboarding welcome kits, luxury PR campaign mailers, and premium custom retail carrier packaging.',
        intro: 'Build professional relationships with packaging that represents your brand values. Our corporate and retail packaging solutions range from sturdy, branded mailers for e-commerce to extravagant VIP gift boxes for corporate milestones and high-end retail shopping experiences.',
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('corporate') || (p['Application Tags'] || '').toLowerCase().includes('retail') || (p['Application Tags'] || '').toLowerCase().includes('promotion') || (p['Product Name'] || '').toLowerCase().includes('corporate') || (p['Product Name'] || '').toLowerCase().includes('retail') || (p['Product Name'] || '').toLowerCase().includes('promotion')
    },
    {
        dir: 'applications',
        slug: 'religious-and-cultural-gift-packaging',
        name: 'Religious & Cultural Gift Packaging',
        title: 'Religious & Cultural Gift Packaging Manufacturer | ShineleeBox',
        desc: 'Bespoke cultural and religious packaging, featuring Ramadan dates boxes, Eid sweet gift boxes, and luxury Islamic prayer set storage. Hot foil geometric patterns.',
        h1: 'Religious & Cultural Gift Packaging',
        heroSub: 'Factory-direct high-end cultural gift packaging, Quran rigid storage boxes, and traditional Islamic pattern gold foiled boxes.',
        intro: 'Celebrate faith and cultural heritage with highly respectful, premium custom packaging. ShineleeBox creates religious and cultural gift packaging built with gold foil Islamic geometric lines, custom compartment boards for religious texts or prayer pads, and sweets boxes for major cultural festivals.',
        filter: p => p['Main Category'] === 'Religious Gift Packaging' || p['Product ID'].startsWith('RG-') || (p['Application Tags'] || '').toLowerCase().includes('religious') || (p['Application Tags'] || '').toLowerCase().includes('cultural') || (p['Application Tags'] || '').toLowerCase().includes('islamic') || (p['Product Name'] || '').toLowerCase().includes('ramadan') || (p['Product Name'] || '').toLowerCase().includes('eid') || (p['Product Name'] || '').toLowerCase().includes('islamic') || (p['Product Name'] || '').toLowerCase().includes('wudu') || (p['Product Name'] || '').toLowerCase().includes('miswak') || (p['Product Name'] || '').toLowerCase().includes('hajj')
    },
    {
        dir: 'applications',
        slug: 'electronics-and-premium-gift-packaging',
        name: 'Electronics & Premium Gift Packaging',
        title: 'Electronics & Premium Gift Packaging Manufacturer | ShineleeBox',
        desc: 'Luxury electronics gift boxes, executive smart gadgets unboxing sets, and premium LED/sound gift packaging. Custom rigid box manufacturer with integrated electronics.',
        h1: 'Electronics & Premium Gift Packaging',
        heroSub: 'Premium rigid boxes with integrated light sensors, sound modules, and charging ports for high-end digital accessories and digital packaging.',
        intro: 'Protect and highlight high-value technology with packaging that feels just as innovative. ShineleeBox crafts custom electronics and premium gift packaging, featuring secure shock-absorbing inserts, clean magnetic flip closures, and option for integrated light-up panels or video screens to display your technical specs.',
        filter: p => (p['Application Tags'] || '').toLowerCase().includes('electronics') || (p['Application Tags'] || '').toLowerCase().includes('video') || (p['Application Tags'] || '').toLowerCase().includes('led') || (p['Application Tags'] || '').toLowerCase().includes('sound') || (p['Product Name'] || '').toLowerCase().includes('video') || (p['Product Name'] || '').toLowerCase().includes('led') || (p['Product Name'] || '').toLowerCase().includes('music')
    },
    // --- HOLIDAY & OCCASIONS (holiday-occasions/) ---
    {
        dir: 'holiday-occasions',
        slug: 'christmas-packaging',
        name: 'Christmas & Holiday Packaging',
        title: 'Custom Christmas Advent Calendar Boxes | 300k Sets Fast Capacity',
        desc: 'Direct-factory Christmas packaging. Fulfilled 300,000 sets in 60 days for Douglas. Specialized in luxury 12/24-day advent calendars with premium finishes.',
        h1: 'Christmas & Holiday Packaging',
        heroSub: 'Trusted by European retail giants for 300k+ set campaigns. Bespoke luxury advent calendars and festive gift boxes manufactured at scale.',
        intro: 'Proven scale for global brands. ShineleeBox is a B2B manufacturing authority that recently delivered 300,000 custom advent calendar sets in just 60 days for Douglas (2000+ stores). We combine massive production capacity with artisanal rigid box craftsmanship, helping high-volume retailers dominate the unboxing season with FSC-certified, retail-ready festive packaging.',
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('christmas') || (p['Holiday Tags'] || '').toLowerCase().includes('holiday') || p['Main Category'] === 'Advent Calendar Boxes',
        thumbnail: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'ramadan-and-eid-packaging',
        name: 'Ramadan & Eid Packaging',
        title: 'Custom Ramadan & Eid Gift Packaging | Luxury Islamic Gift Boxes',
        desc: 'Bespoke Ramadan advent calendars, Eid sweet boxes, and traditional Islamic pattern gift packaging. High-end luxury rigid boxes with gold foil geometric designs.',
        h1: 'Ramadan & Eid Gift Packaging',
        heroSub: 'Respectful and elegant custom packaging for the holy month of Ramadan and Eid al-Fitr celebrations. Specialized in 30-day countdown boxes.',
        intro: 'Honor tradition with sophistication. Our Ramadan and Eid packaging collection features intricate Islamic geometric art, moon and star motifs, and specialized structures like 30-compartment dates boxes and luxury gift sets for family and corporate sharing.',
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('ramadan') || (p['Holiday Tags'] || '').toLowerCase().includes('eid') || (p['Application Tags'] || '').toLowerCase().includes('islamic') || p['Main Category'] === 'Date Dessert Boxes',
        thumbnail: 'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'valentines-day-packaging',
        name: "Valentine's Day Packaging",
        title: "Custom Valentine's Day Gift Boxes | Romantic Luxury Packaging",
        desc: "Premium Valentine's Day gift packaging manufacturer. Custom heart-shaped boxes, romantic red and pink rigid boxes, and luxury flower gift set packaging.",
        h1: "Valentine's Day Gift Packaging",
        heroSub: 'Capture the essence of romance with premium custom gift boxes designed for high-end jewelry, perfumes, and luxury confectionery gifts.',
        intro: "Love is in the details. ShineleeBox creates romantic, high-end Valentine's Day packaging that speaks to the heart. We specialize in deep red and soft pink finishes, soft-touch textures, and elegant opening structures that make every romantic gift feel like a treasure.",
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('valentine') || (p['Product Name'] || '').toLowerCase().includes('valentine') || (p['Application Tags'] || '').toLowerCase().includes('jewelry'),
        thumbnail: 'https://images.unsplash.com/photo-1518199266791-739d6ff26ef0?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'wedding-and-anniversary-packaging',
        name: 'Wedding & Anniversary Packaging',
        title: 'Custom Wedding Invitation & Anniversary Gift Boxes | ShineleeBox',
        desc: 'Bespoke wedding and anniversary packaging manufacturer. Luxury wedding invitation boxes, bridesmaid proposal kits, and elegant anniversary gift sets.',
        h1: 'Wedding & Anniversary Packaging',
        heroSub: 'Timeless and elegant custom packaging for life’s most precious commitments. High-end bridal gift boxes and luxury invitation suites.',
        intro: 'Make the commitment as beautiful as the celebration. Our wedding and anniversary collection focuses on timeless elegance—featuring pearlized papers, delicate silk ribbon closures, and high-density rigid structures designed to be kept as lifelong keepsakes.',
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('wedding') || (p['Holiday Tags'] || '').toLowerCase().includes('anniversary') || (p['Product Name'] || '').toLowerCase().includes('wedding'),
        thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'baby-and-family-keepsake-packaging',
        name: 'Baby & Family Keepsake Packaging',
        title: 'Custom Baby Milestone & Family Keepsake Boxes | ShineleeBox',
        desc: 'Bespoke baby shower gift boxes, newborn milestone keepsake boxes, and family memory storage boxes. Durable high-end rigid packaging meant to last a lifetime.',
        h1: 'Baby & Family Keepsake Packaging',
        heroSub: 'Celebrate the journey of family with "too good to throw away" keepsake boxes that protect your most precious memories for generations.',
        intro: 'Packaging that preserves a lifetime. ShineleeBox specializes in durable, museum-quality keepsake boxes for families. From baby milestone kits to multi-generational photo storage, our boxes are built with archival-safe materials and elegant, nursery-friendly aesthetics.',
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('baby') || (p['Holiday Tags'] || '').toLowerCase().includes('family') || (p['Application Tags'] || '').toLowerCase().includes('keepsake') || p['Main Category'] === 'Keepsake Boxes',
        thumbnail: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'graduation-packaging',
        name: 'Graduation Packaging',
        title: 'Custom Graduation Gift Boxes & Diploma Cases | ShineleeBox',
        desc: 'Bespoke graduation gift packaging and diploma certificate cases. High-end rigid boxes for universities, schools, and executive education gifts.',
        h1: 'Graduation & Achievement Packaging',
        heroSub: 'Honor academic excellence with prestigious custom graduation gift boxes, luxury certificate holders, and commemorative achievement kits.',
        intro: 'Mark the milestone of success with prestigious packaging. Our graduation collection is designed for institutions and gift brands that require an atmosphere of achievement. We utilize collegiate colors, heavy-duty diploma-safe structures, and elegant gold foil academic crests.',
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('graduation') || (p['Application Tags'] || '').toLowerCase().includes('education') || (p['Product Name'] || '').toLowerCase().includes('graduation'),
        thumbnail: 'https://images.unsplash.com/photo-1523050853051-be991f85a6ad?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'mothers-day-fathers-day-packaging',
        name: "Mother's & Father's Day Packaging",
        title: "Custom Mother's & Father's Day Gift Boxes | ShineleeBox",
        desc: "Custom gift boxes for Mother's Day and Father's Day campaigns. Premium rigid skincare sets, fragrance drawer boxes, leather-touch cases, and limited edition gift sets.",
        h1: "Mother's & Father's Day Packaging",
        heroSub: 'Celebrate parents with premium custom gift sets. Specialized in luxury beauty packaging for Mom and sophisticated grooming cases for Dad.',
        intro: "Gratitude deserves a grand presentation. ShineleeBox manufactures limited-edition gift packaging for parental holidays, from floral-inspired luxury skincare sets to refined, tech-friendly rigid boxes for men's grooming and executive gifts.",
        filter: p => (p['Holiday Tags'] || '').toLowerCase().includes('mother') || (p['Holiday Tags'] || '').toLowerCase().includes('father') || (p['Product Name'] || '').toLowerCase().includes('mother') || (p['Product Name'] || '').toLowerCase().includes('father'),
        thumbnail: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
    },
    {
        dir: 'holiday-occasions',
        slug: 'other-occasions',
        name: 'Other Occasions',
        title: 'Custom Special Occasion Packaging | ShineleeBox',
        desc: 'Bespoke packaging for all of life’s unique celebrations. Custom rigid boxes for religious events, cultural festivals, corporate milestones, and bespoke gifting.',
        h1: 'Special Occasion Packaging',
        heroSub: 'From cultural festivals to corporate milestones, we provide custom high-end packaging solutions for every unique event in your calendar.',
        intro: 'Every celebration is an unboxing opportunity. Our "Other Occasions" collection serves the unique, the cultural, and the corporate. Whether it’s a regional festival or a high-end corporate PR reveal, our structural engineering team builds the perfect stage for your unique event.',
        filter: p => p['Product ID'].startsWith('RG-') || p['Product ID'].startsWith('LM-') || p['Main Category'] === 'Mooncake Boxes',
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
            matchedProducts = products.filter(p => p['Product ID'].startsWith('RG-') || p['Product ID'].startsWith('LM-') || p['Main Category'] === 'Mooncake Boxes');
            if (matchedProducts.length === 0) matchedProducts = products.slice(0, 8);
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
                            const name = p['Product Name'];
                            const folderName = p['Image Folder'] || resolveImageFolder(id);
                            let prefix = 'ac';
                            if (id.startsWith('IP-')) prefix = 'ip';
                            else if (id.startsWith('LM-')) prefix = 'lm';
                            else if (id.startsWith('RG-')) prefix = 'rg';
                            else if (id.startsWith('GC-')) prefix = 'gc';
                            else if (id.startsWith('SLF-')) prefix = 'slf';
                            else if (id.startsWith('PP-')) prefix = 'pp';
                            else if (id.startsWith('CP-')) prefix = 'cp';
                            else if (id.startsWith('CFP-')) prefix = 'cfp';
                            
                            const idLower = id.toLowerCase().replace('ac-', '').replace('ip-', '').replace('lm-', '').replace('rg-', '').replace('gc-', '').replace('slf-', '').replace('pp-', '').replace('cp-', '').replace('cfp-', '');
                            
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

    // 2. Holiday & Occasions Index
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
