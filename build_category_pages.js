const fs = require('fs');
const path = require('path');
const { headTemplate, headerTemplate, footerTemplate } = require('./templates');

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function parseCSV(content) {
    content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = content.split('\n');
    const header = lines[0].replace(/^\uFEFF/, '').trim();
    const headers = [];
    let currentHeader = '';
    let inQuotes = false;
    for (let j = 0; j < header.length; j++) {
        const char = header[j];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            headers.push(currentHeader.trim());
            currentHeader = '';
        } else {
            currentHeader += char;
        }
    }
    headers.push(currentHeader.trim());

    const records = [];
    let record = {};
    let cell = '';
    inQuotes = false;
    let headerIndex = 0;

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (i === lines.length - 1 && line.trim() === '') continue; // Skip final empty line
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                const colName = headers[headerIndex];
                if (colName) record[colName] = cell.trim();
                cell = '';
                headerIndex++;
            } else {
                cell += char;
            }
        }
        
        if (inQuotes) {
            cell += '\n';
        } else {
            const colName = headers[headerIndex];
            if (colName) record[colName] = cell.trim();
            records.push(record);
            record = {};
            cell = '';
            headerIndex = 0;
        }
    }
    
    // Clean up quotes around cell values if any
    records.forEach(r => {
        Object.keys(r).forEach(k => {
            if (typeof r[k] === 'string') {
                let val = r[k];
                if (val.startsWith('"') && val.endsWith('"')) {
                    val = val.substring(1, val.length - 1);
                }
                r[k] = val.trim();
            }
        });
    });
    return records.filter(r => r['Product ID']);
}

function resolveImageFolder(id) {
    const productsImagesDir = path.join(__dirname, 'images', 'products');
    if (fs.existsSync(productsImagesDir)) {
        const dirs = fs.readdirSync(productsImagesDir);
        const matched = dirs.find(d => d.startsWith(id + '_'));
        if (matched) return matched;
    }
    return '';
}

// Load databases
const csvPath = path.join(__dirname, 'Accio_Product_Upload_First20.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');
const originalProducts = parseCSV(csvContent);

const interactiveCsvPath = path.join(__dirname, 'Accio_Interactive_Product_Upload.csv');
let interactiveProducts = [];
if (fs.existsSync(interactiveCsvPath)) {
    const interactiveContent = fs.readFileSync(interactiveCsvPath, 'utf8');
    const parsedInteractive = parseCSV(interactiveContent);
    interactiveProducts = parsedInteractive.map(p => {
        const id = p['Product ID'];
        const name = p['Product Name EN'];
        const slug = p['URL Slug'];
        return {
            'Product ID': id,
            'Product Name': name,
            'URL Slug': slug,
            'Main Category': 'Interactive Packaging',
            'Subcategory': p['Product Subcategory'] || '',
            'Application Tags': p['Application Tags'] ? p['Application Tags'].replace(/\s*\/\s*/g, ';') : '',
            'Holiday Tags': p['Holiday / Occasion Tags'] ? p['Holiday / Occasion Tags'].replace(/\s*\/\s*/g, ';') : '',
            'Gift Set': p['Advent Calendar Gift Set'] || 'No',
            'SEO Title': p['SEO Title'] || `${name} | ShineleeBox`,
            'Meta Description': p['Meta Description'] || '',
            'H1': name,
            'Short Description': p['Main Selling Point'] || '',
            'Description': `Built with high-end structures and interactive features, this ${name.toLowerCase()} is perfect for luxury brands. ${p['Main Selling Point'] || ''}`,
            'Key Features': p['Key Features'] || '',
            'Best For': '',
            'Custom Options': p['Custom Options'] || '',
            'Manufacturing Support': 'Structure development, module positioning, custom sampling, printing, finishing, hand assembly, function testing, and export packing.',
            'CTA': 'Contact Lisa: info@slpack.net or WhatsApp +86 18818840878 for custom details.',
            'Image Folder': resolveImageFolder(id),
            'Main Image': p['Main Image Filename'] || '',
            'Video': p['Video Filename'] || ''
        };
    });
}

const lmCsvPath = path.join(__dirname, 'Accio_Life_Memory_Upload.csv');
let lmProducts = [];
if (fs.existsSync(lmCsvPath)) {
    const lmContent = fs.readFileSync(lmCsvPath, 'utf8');
    const parsedLm = parseCSV(lmContent);
    lmProducts = parsedLm.map(p => {
        const id = p['Product ID'];
        return {
            'Product ID': id,
            'Product Name': p['Product Name EN'],
            'URL Slug': p['URL Slug'],
            'Main Category': 'Keepsake Boxes',
            'Subcategory': p['Product Subcategory'] || '',
            'Application Tags': p['Application Tags'] || '',
            'Holiday Tags': p['Holiday / Occasion Tags'] || '',
            'Gift Set': 'No',
            'SEO Title': p['SEO Title'] || '',
            'Meta Description': p['Meta Description'] || '',
            'H1': p['Product Name EN'],
            'Short Description': p['Main Selling Point'] || '',
            'Description': p['Meta Description'] || '',
            'Key Features': p['Key Features'] || '',
            'Best For': '',
            'Custom Options': p['Custom Options'] || '',
            'Manufacturing Support': '',
            'CTA': '',
            'Image Folder': resolveImageFolder(id),
            'Main Image': p['Main Image Filename'] || '',
            'Video': ''
        };
    });
}

// Load and parse religious products
const rgCsvPath = path.join(__dirname, 'Accio_Religious_Product_Upload.csv');
let rgProducts = [];
if (fs.existsSync(rgCsvPath)) {
    const rgContent = fs.readFileSync(rgCsvPath, 'utf8');
    const parsedRg = parseCSV(rgContent);
    rgProducts = parsedRg.map(p => {
        const id = p['Product ID'];
        return {
            'Product ID': id,
            'Product Name': p['Product Name EN'],
            'URL Slug': p['URL Slug'],
            'Main Category': 'Religious Gift Packaging',
            'Subcategory': p['Product Subcategory'] || '',
            'Application Tags': p['Application Tags'] || '',
            'Holiday Tags': p['Holiday / Occasion Tags'] || '',
            'Gift Set': 'No',
            'SEO Title': p['SEO Title'] || '',
            'Meta Description': p['Meta Description'] || '',
            'H1': p['Product Name EN'],
            'Short Description': p['Main Selling Point'] || '',
            'Description': p['Meta Description'] || '',
            'Key Features': p['Key Features'] || '',
            'Best For': '',
            'Custom Options': p['Custom Options'] || '',
            'Manufacturing Support': '',
            'CTA': '',
            'Image Folder': resolveImageFolder(id),
            'Main Image': p['Main Image Filename'] || '',
            'Video': ''
        };
    });
}

const products = originalProducts.concat(interactiveProducts).concat(lmProducts).concat(rgProducts);

// Ensure directories exist
const productsDir = path.join(__dirname, 'products');
const applicationsDir = path.join(__dirname, 'applications');
const holidayOccasionsDir = path.join(__dirname, 'holiday-occasions');

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}
ensureDir(productsDir);
ensureDir(applicationsDir);
ensureDir(holidayOccasionsDir);

// Categories Mapping metadata
const categories = [
    // --- PRODUCTS (products/) ---
    {
        dir: 'products',
        slug: 'advent-calendar-boxes',
        name: 'Advent Calendar Boxes',
        title: 'Custom Advent Calendar Boxes Manufacturer | ShineleeBox',
        desc: 'ShineleeBox is a leading custom advent calendar boxes manufacturer in Guangzhou, China. We supply bespoke 12, 24, and 25-day rigid card drawer boxes for beauty, perfume, cosmetics, jewelry, chocolate, and retail brands.',
        h1: 'Custom Advent Calendar Boxes',
        heroSub: 'Guangzhou factory-direct manufacturing of premium book-style, sliding drawer, rotating tower, and custom-shaped advent calendars with low 50 pcs MOQ.',
        intro: 'Elevate your holiday marketing campaigns with high-end, custom-made advent calendar packaging. Our Guangzhou-based engineering team specializes in designing intricate, multi-compartment rigid board structures that provide a premium unboxing experience and drive organic social sharing.',
        filter: p => p['Main Category'] === 'Advent Calendar Boxes' || p['Subcategory'].toLowerCase().includes('advent') || p['Product Name'].toLowerCase().includes('advent')
    },
    {
        dir: 'products',
        slug: 'advent-calendar-gift-set',
        name: 'Advent Calendar Gift Set',
        title: 'Custom Advent Calendar Gift Set Packaging | ShineleeBox',
        desc: 'Design custom advent calendar gift set packaging with ShineleeBox. Premium rigid holiday gift sets featuring sliding drawers, magnetic closure panels, custom structural trays, and gold hot stamping decoration.',
        h1: 'Custom Advent Calendar Gift Sets',
        heroSub: 'Complete customized holiday gift set boxes and advent calendar collections built for international brands with Disney FAMA and BSCI certification.',
        intro: 'A complete holiday gift set demands packaging that tells a story. ShineleeBox develops bespoke advent calendar gift sets with coordinated outer cases and inner numbered drawers, creating a cohesive, high-impact seasonal campaign for your brand.',
        filter: p => p['Gift Set'] === 'Yes' || p['Subcategory'].toLowerCase().includes('gift set') || p['Product Name'].toLowerCase().includes('gift set')
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
        filter: p => p['Main Category'] === 'Perfume Packaging' || p['Main Category'] === 'Cosmetic Packaging' || p['Subcategory'].toLowerCase().includes('perfume') || p['Subcategory'].toLowerCase().includes('cosmetic') || p['Subcategory'].toLowerCase().includes('skincare') || p['Application Tags'].toLowerCase().includes('perfume') || p['Application Tags'].toLowerCase().includes('fragrance') || p['Application Tags'].toLowerCase().includes('beauty') || p['Application Tags'].toLowerCase().includes('skincare') || p['Product Name'].toLowerCase().includes('perfume') || p['Product Name'].toLowerCase().includes('fragrance') || p['Product Name'].toLowerCase().includes('cosmetic') || p['Product Name'].toLowerCase().includes('skincare')
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
        filter: p => p['Main Category'] === 'Luxury Gift Boxes' || p['Main Category'].toLowerCase().includes('rigid') || p['Subcategory'].toLowerCase().includes('drawer') || p['Subcategory'].toLowerCase().includes('magnetic') || p['Product Name'].toLowerCase().includes('magnetic') || p['Product Name'].toLowerCase().includes('drawer') || p['Product Name'].toLowerCase().includes('rigid') || p['Custom Options'].toLowerCase().includes('magnetic') || p['Custom Options'].toLowerCase().includes('drawer') || p['Custom Options'].toLowerCase().includes('rigid')
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
        filter: p => p['Main Category'] === 'Keepsake Boxes' || p['Product ID'].startsWith('LM-') || p['Subcategory'].toLowerCase().includes('keepsake') || p['Application Tags'].toLowerCase().includes('keepsake') || p['Product Name'].toLowerCase().includes('keepsake') || p['Product Name'].toLowerCase().includes('memorial') || p['Product ID'] === 'IP-006' || p['Product ID'] === 'IP-007' || p['Product ID'] === 'AC-003' || p['Product ID'] === 'AC-015' || p['Product ID'] === 'AC-016'
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
        filter: p => p['Product Name'].toLowerCase().includes('card') || p['Subcategory'].toLowerCase().includes('card') || p['Product ID'] === 'IP-004' || p['Product ID'] === 'IP-005'
    },
    {
        dir: 'products',
        slug: 'religious-gift-packaging',
        name: 'Religious Gift Packaging',
        title: 'Custom Religious Gift Packaging | Ramadan, Eid & Islamic Boxes',
        desc: 'Guangzhou factory supplying custom religious gift packaging, including 30-day Ramadan calendar boxes, Eid sweet gift boxes, Islamic prayer sets, and Tayammum pad packaging.',
        h1: 'Custom Religious Gift Packaging',
        heroSub: 'Bespoke Ramadan & Eid drawer calendars, luxury Quran boxes, and high-quality Islamic pattern rigid packaging with gold foil accents.',
        intro: 'Respect religious tradition with beautifully crafted, culturally compliant custom religious gift packaging. ShineleeBox specializes in designing intricate geometric patterns, multi-layer drawer calendars for the 30 days of Ramadan, and robust keepsake boxes for Quran storage, Eid sweets, and Tayammum pad kits.',
        filter: p => p['Main Category'] === 'Religious Gift Packaging' || p['Product ID'].startsWith('RG-') || p['Subcategory'].toLowerCase().includes('ramadan') || p['Subcategory'].toLowerCase().includes('eid') || p['Application Tags'].toLowerCase().includes('religious') || p['Product Name'].toLowerCase().includes('ramadan') || p['Product Name'].toLowerCase().includes('eid') || p['Product Name'].toLowerCase().includes('islamic') || p['Product Name'].toLowerCase().includes('tayammum') || p['Product Name'].toLowerCase().includes('wudu') || p['Product Name'].toLowerCase().includes('miswak')
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
        filter: p => p['Application Tags'].toLowerCase().includes('perfume') || p['Application Tags'].toLowerCase().includes('fragrance') || p['Application Tags'].toLowerCase().includes('beauty') || p['Application Tags'].toLowerCase().includes('skincare') || p['Application Tags'].toLowerCase().includes('cosmetic') || p['Application Tags'].toLowerCase().includes('personal care') || p['Application Tags'].toLowerCase().includes('bath') || p['Application Tags'].toLowerCase().includes('candle') || p['Application Tags'].toLowerCase().includes('spa') || p['Product Name'].toLowerCase().includes('perfume') || p['Product Name'].toLowerCase().includes('fragrance') || p['Product Name'].toLowerCase().includes('beauty') || p['Product Name'].toLowerCase().includes('skincare') || p['Product Name'].toLowerCase().includes('cosmetic') || p['Product Name'].toLowerCase().includes('candle') || p['Product Name'].toLowerCase().includes('soap') || p['Product Name'].toLowerCase().includes('bath')
    },
    {
        dir: 'applications',
        slug: 'chocolate-and-food-packaging',
        name: 'Chocolate & Food Packaging',
        title: 'Chocolate & Gourmet Food Packaging Manufacturer | ShineleeBox',
        desc: 'Luxury chocolate boxes, macaron packaging, tea sample sets, and holiday cookie gift box manufacturer. Premium food-safe custom paper structures with gold foil highlights.',
        h1: 'Chocolate & Food Packaging',
        heroSub: 'Factory-direct premium rigid cardboard packaging for chocolate, tea, macarons, dates, and gourmet food gift sets.',
        intro: 'Ensure your gourmet sweets and delicacies look as exquisite as they taste. ShineleeBox manufactures elegant custom chocolate and food packaging, featuring rigid sliding drawers, numbered advent countdown boxes, and multi-compartment layouts equipped with FDA-compliant food safe interior inserts.',
        filter: p => p['Application Tags'].toLowerCase().includes('chocolate') || p['Application Tags'].toLowerCase().includes('food') || p['Application Tags'].toLowerCase().includes('sweet') || p['Application Tags'].toLowerCase().includes('cookie') || p['Application Tags'].toLowerCase().includes('tea') || p['Product Name'].toLowerCase().includes('chocolate') || p['Product Name'].toLowerCase().includes('food') || p['Product Name'].toLowerCase().includes('dates')
    },
    {
        dir: 'applications',
        slug: 'jewelry-and-accessories-packaging',
        name: 'Jewelry & Accessories Packaging',
        title: 'Jewelry & Accessories Packaging Manufacturer | ShineleeBox',
        desc: 'Elegant sliding drawer jewelry boxes, velvet arch calendars, and watch rigid cases. Premium custom jewelry and accessory gift box manufacturer with high-quality velvet flocking.',
        h1: 'Jewelry & Accessories Packaging',
        heroSub: 'Bespoke sliding drawer boxes, rigid ring cases, and luxury accessory advent calendars lined with premium velvet and soft sponge dividers.',
        intro: 'Cradle your fine metals, watches, and precious accessories in packaging that mirrors their intrinsic value. ShineleeBox constructs elegant, heavy rigid boxes with sliding drawers, ribbon pulls, and secure magnetic panels, all lined with custom velvet flocking and sponge trays for ultimate protection and luxury appeal.',
        filter: p => p['Application Tags'].toLowerCase().includes('jewelry') || p['Application Tags'].toLowerCase().includes('accessory') || p['Application Tags'].toLowerCase().includes('ring') || p['Product Name'].toLowerCase().includes('jewelry') || p['Product Name'].toLowerCase().includes('watch') || p['Product Name'].toLowerCase().includes('ring')
    },
    {
        dir: 'applications',
        slug: 'corporate-and-retail-packaging',
        name: 'Corporate & Retail Packaging',
        title: 'Corporate Gift Boxes & Luxury Retail Packaging | ShineleeBox',
        desc: 'Premium corporate gift packaging, VIP client unboxing kits, product launch boxes, and luxury retail rigid bags. Custom sizes and gold foil logos from Guangzhou factory.',
        h1: 'Corporate & Retail Packaging',
        heroSub: 'Bespoke VIP onboarding welcome kits, luxury PR campaign mailers, and premium custom retail carrier packaging.',
        intro: 'Forge a powerful connection with clients, employees, and retail buyers. ShineleeBox manufactures high-impact corporate and retail packaging that carries your brand logo with absolute prestige. Perfect for luxury boutique packaging, high-profile corporate welcome gifts, and influencer unboxing kits.',
        filter: p => p['Application Tags'].toLowerCase().includes('corporate') || p['Application Tags'].toLowerCase().includes('retail') || p['Application Tags'].toLowerCase().includes('pr') || p['Application Tags'].toLowerCase().includes('promotion') || p['Product Name'].toLowerCase().includes('pr ') || p['Product Name'].toLowerCase().includes('corporate') || p['Product Name'].toLowerCase().includes('retail')
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
        filter: p => p['Main Category'] === 'Religious Gift Packaging' || p['Product ID'].startsWith('RG-') || p['Application Tags'].toLowerCase().includes('religious') || p['Application Tags'].toLowerCase().includes('cultural') || p['Application Tags'].toLowerCase().includes('islamic') || p['Product Name'].toLowerCase().includes('ramadan') || p['Product Name'].toLowerCase().includes('eid') || p['Product Name'].toLowerCase().includes('islamic') || p['Product Name'].toLowerCase().includes('wudu') || p['Product Name'].toLowerCase().includes('miswak') || p['Product Name'].toLowerCase().includes('hajj')
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
        filter: p => p['Application Tags'].toLowerCase().includes('electronics') || p['Application Tags'].toLowerCase().includes('video') || p['Application Tags'].toLowerCase().includes('led') || p['Application Tags'].toLowerCase().includes('sound') || p['Product Name'].toLowerCase().includes('video') || p['Product Name'].toLowerCase().includes('led') || p['Product Name'].toLowerCase().includes('music')
    },

    // --- HOLIDAY & OCCASIONS (holiday-occasions/) ---
    {
        dir: 'holiday-occasions',
        slug: 'christmas-packaging',
        name: 'Christmas Packaging',
        title: 'Christmas Packaging Manufacturer | Holiday Advent Calendars | ShineleeBox',
        desc: 'Custom Christmas advent calendar boxes, Christmas tree rigid boxes, round holiday cylinder boxes, and red-gold gift sets for festive retail and influencer campaigns.',
        h1: 'Christmas Packaging',
        heroSub: 'Guangzhou factory-direct custom Christmas advent calendars, rigid holiday gift sets, and red & gold foiled retail packaging.',
        intro: 'Make the holidays unforgettable with stunning custom Christmas packaging. As a specialized B2B manufacturer in Guangzhou, ShineleeBox engineers premium 12, 24, and 25-day countdown advent calendars, book-style magnetic holiday gift sets, and gold-foiled red rigid boxes that elevate seasonal sales and influencer unboxings.',
        filter: p => p['Holiday Tags'].toLowerCase().includes('christmas') || p['Holiday Tags'].toLowerCase().includes('holiday') || p['Product Name'].toLowerCase().includes('christmas') || p['Product Name'].toLowerCase().includes('holiday')
    },
    {
        dir: 'holiday-occasions',
        slug: 'ramadan-and-eid-packaging',
        name: 'Ramadan & Eid Packaging',
        title: 'Ramadan & Eid Packaging Manufacturer | Islamic Gift Boxes',
        desc: 'Custom 30-day Ramadan drawer calendar boxes, Eid sweet gift boxes, and Islamic pattern rigid cases with gold foil accents from Guangzhou packaging manufacturer.',
        h1: 'Ramadan & Eid Packaging',
        heroSub: 'Factory-direct 30-day numbered drawer countdown calendars and gold-embossed blue Eid sweets boxes.',
        intro: 'Honor the blessed months of Ramadan and Eid with custom gift boxes that celebrate traditional elegance. ShineleeBox designs and manufactures heavy rigid cardboard countdown calendars with 30 numbered drawers, and premium gold foil-embossed boxes for dates, sweets, and religious keepsake storage.',
        filter: p => p['Holiday Tags'].toLowerCase().includes('ramadan') || p['Holiday Tags'].toLowerCase().includes('eid') || p['Product Name'].toLowerCase().includes('ramadan') || p['Product Name'].toLowerCase().includes('eid')
    },
    {
        dir: 'holiday-occasions',
        slug: 'valentines-day-packaging',
        name: 'Valentine’s Day Packaging',
        title: 'Valentine’s Day Packaging Manufacturer | Romantic Gift Boxes',
        desc: 'Guangzhou factory supplying custom Valentine’s Day packaging, including heart-shaped gift boxes, double door romantic perfume boxes, and chocolate gift packaging.',
        h1: 'Valentine’s Day Packaging',
        heroSub: 'Bespoke heart boxes, romantic pink-red double-door gift cases, and luxury chocolate drawer sets for Valentine\'s promotions.',
        intro: 'Incite emotion and brand loyalty with romantic custom packaging designed for Valentine\'s Day. ShineleeBox manufactures high-end rigid heart gift boxes, sliding drawers, and ribbon-tied double-door opening gift sets, perfect for couples\' fragrances, limited-edition cosmetics, jewelry, and gourmet chocolates.',
        filter: p => p['Holiday Tags'].toLowerCase().includes('valentine') || p['Product Name'].toLowerCase().includes('valentine') || p['Product Name'].toLowerCase().includes('love') || p['Product Name'].toLowerCase().includes('heart')
    },
    {
        dir: 'holiday-occasions',
        slug: 'wedding-and-anniversary-packaging',
        name: 'Wedding & Anniversary Packaging',
        title: 'Wedding & Anniversary Packaging | Premium Keepsake Gift Boxes',
        desc: 'Guangzhou factory-direct wedding keepsake boxes, bridal invitation card cases, anniversary gift boxes, and high-end rigid ribbon boxes with custom compartments.',
        h1: 'Wedding & Anniversary Packaging',
        heroSub: 'Bespoke bridal souvenir boxes, luxury wedding invitation cases, and gold-stamped marriage anniversary gift boxes.',
        intro: 'Commemorate love and milestones with luxury packaging built to stand the test of time. ShineleeBox specializes in constructing premium wedding keepsake boxes, high-end bridal party invitation cards, and custom gift boxes with elegant ribbon closures, soft velvet inserts, and delicate hot foil lettering.',
        filter: p => p['Holiday Tags'].toLowerCase().includes('wedding') || p['Holiday Tags'].toLowerCase().includes('anniversary') || p['Product Name'].toLowerCase().includes('wedding') || p['Product Name'].toLowerCase().includes('anniversary')
    },
    {
        dir: 'holiday-occasions',
        slug: 'baby-and-family-keepsake-packaging',
        name: 'Baby & Family Keepsake Packaging',
        title: 'Baby & Family Keepsake Packaging | Custom Rigid Memory Boxes',
        desc: 'Custom baby keepsake boxes, family memory rigid cases, custom milestone packaging, and children\'s event gift box manufacturer in Guangzhou, China.',
        h1: 'Baby & Family Keepsake Packaging',
        heroSub: 'Premium rigid storage and keepsake packaging for baby milestones, family memories, and children\'s gift campaigns.',
        intro: 'Cherish family milestones forever with custom baby and family keepsake packaging. ShineleeBox constructs highly durable, luxury paper memory boxes, complete with sliding drawers, ribbon handles, and secure magnetic flips, making them perfect for holding early milestone keepsakes and family heirlooms.',
        filter: p => p['Holiday Tags'].toLowerCase().includes('baby') || p['Holiday Tags'].toLowerCase().includes('family') || p['Holiday Tags'].toLowerCase().includes('keepsake') || p['Product Name'].toLowerCase().includes('baby') || p['Product Name'].toLowerCase().includes('memory') || p['Product Name'].toLowerCase().includes('keepsake')
    },
    {
        dir: 'holiday-occasions',
        slug: 'graduation-packaging',
        name: 'Graduation Packaging',
        title: 'Graduation Packaging Manufacturer | Premium Keepsake Box Supplier',
        desc: 'Bespoke graduation keepsake boxes, custom certificate cases, university gift sets, and academic memory packaging with gold hot stamping and custom layouts.',
        h1: 'Graduation Packaging',
        heroSub: 'Guangzhou factory-direct high-end university souvenir boxes, certificate cases, and academic graduation gift packaging.',
        intro: 'Honor academic achievement with high-quality, professional custom graduation packaging. ShineleeBox designs and manufactures durable souvenir storage boxes, custom book-style certificate folders, and elegant rigid card gift sets printed with custom crests, gold hot foil stamps, and secure silk linings.',
        filter: p => p['Holiday Tags'].toLowerCase().includes('graduation') || p['Product Name'].toLowerCase().includes('graduation') || p['Product Name'].toLowerCase().includes('certificate')
    },
    {
        dir: 'holiday-occasions',
        slug: 'mothers-day-fathers-day-packaging',
        name: 'Mother’s Day / Father’s Day Packaging',
        title: 'Mother’s & Father’s Day Packaging Manufacturer | Premium Gift Boxes',
        desc: 'Custom gift boxes for Mother’s Day and Father’s Day campaigns. Premium rigid skincare sets, fragrance drawer boxes, leather-touch cases, and limited edition gift sets.',
        h1: 'Mother’s / Father’s Day Packaging',
        heroSub: 'Premium rigid gift sets, fragrance countdown drawers, and cosmetic skincare boxes for parent celebration campaigns.',
        intro: 'Deliver a heartfelt unboxing experience for parent appreciation campaigns. ShineleeBox manufactures elegant, limited-edition custom gift boxes for Mother\'s Day and Father\'s Day, specializing in deep rigid drawer boxes, magnetic flip-open perfume cases, and luxury retail gift sets with clean foil lettering.',
        filter: p => p['Holiday Tags'].toLowerCase().includes('mother') || p['Holiday Tags'].toLowerCase().includes('father') || p['Product Name'].toLowerCase().includes('mother') || p['Product Name'].toLowerCase().includes('father')
    },
    {
        dir: 'holiday-occasions',
        slug: 'other-occasions',
        name: 'Other Occasions',
        title: 'Custom Special Occasion Packaging & Specialty Gift Boxes',
        desc: 'Bespoke packaging manufacturer for special events, limited editions, corporate promotions, PR campaigns, and seasonal holidays. High quality custom rigid boxes in Guangzhou.',
        h1: 'Custom Special Occasion Packaging',
        heroSub: 'Flexible rigid packaging solutions, limited-edition promotional kits, and versatile gift packaging starting at 50 pcs MOQ.',
        intro: 'No matter the milestone or event, ShineleeBox possesses the structural expertise to design compliant, luxury packaging. From annual company galas and boutique product launch PR kits to long-tail holidays, our Guangzhou paper packaging engineers translate your artwork into tangible unboxing magic.',
        filter: p => true // Catch-all showing versatile high-end packages
    }
];

// Helper to build list index pages
function buildSubdirectoryIndices() {
    // 1. Applications Index (applications/index.html)
    let appsHtml = headTemplate("Industry Packaging Applications & Solutions | ShineleeBox", "Browse custom packaging and rigid cardboard box application solutions across beauty, perfume, food, jewelry, Ramadan, Christmas and luxury retail.", '../') + headerTemplate('../');
    appsHtml += `
    <section class="bg-brandGreen text-white py-16 border-b border-brandGold-dark">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span class="text-xs font-semibold text-brandGold uppercase tracking-widest">Target Solutions</span>
            <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-1">Industry Packaging Applications</h1>
            <p class="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl font-light">
                Explore custom-designed paper box solutions engineered for specific brand unboxing scenarios and product safety.
            </p>
        </div>
    </section>

    <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    `;

    categories.filter(c => c.dir === 'applications').forEach(a => {
        let matchedCount = products.filter(a.filter).length;
        appsHtml += `
            <div class="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                    <div class="h-48 overflow-hidden bg-slate-100">
                        <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80" alt="${a.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-5">
                        <h3 class="font-serif text-lg font-bold text-brandGreen mb-2">${a.name}</h3>
                        <p class="text-xs text-slate-500 mb-4 line-clamp-3">${a.desc}</p>
                    </div>
                </div>
                <div class="px-5 pb-5">
                    <a href="${a.slug}.html" class="block text-center text-xs font-bold text-brandGreen hover:text-brandGold border border-brandGreen hover:border-brandGold py-2 rounded transition-colors">
                        View ${matchedCount} Custom Solutions
                    </a>
                </div>
            </div>
        `;
    });

    appsHtml += `
        </div>
    </section>
    `;
    appsHtml += footerTemplate('../');
    fs.writeFileSync(path.join(applicationsDir, 'index.html'), appsHtml, 'utf8');

    // 2. Holiday & Occasions Index (holiday-occasions/index.html)
    let holidaysHtml = headTemplate("Holiday & Special Occasions Custom Packaging | ShineleeBox", "Custom holiday gift boxes and countdown advent calendar packaging solutions for Christmas, Ramadan, Eid, Valentine's Day, weddings, family keepsakes, and graduations.", '../') + headerTemplate('../');
    holidaysHtml += `
    <section class="bg-brandGreen text-white py-16 border-b border-brandGold-dark">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span class="text-xs font-semibold text-brandGold uppercase tracking-widest">Seasonal Highlights</span>
            <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-1">Holiday & Special Occasions Packaging</h1>
            <p class="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl font-light">
                Deliver festive cheer and make life's grand celebrations memorable with direct-factory custom seasonal gift packaging.
            </p>
        </div>
    </section>

    <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    `;

    categories.filter(c => c.dir === 'holiday-occasions').forEach(h => {
        let matchedCount = products.filter(h.filter).length;
        holidaysHtml += `
            <div class="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                    <div class="h-48 overflow-hidden bg-slate-100">
                        <img src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80" alt="${h.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-5">
                        <h3 class="font-serif text-lg font-bold text-brandGreen mb-2">${h.name}</h3>
                        <p class="text-xs text-slate-500 mb-4 line-clamp-3">${h.desc}</p>
                    </div>
                </div>
                <div class="px-5 pb-5">
                    <a href="${h.slug}.html" class="block text-center text-xs font-bold text-brandGreen hover:text-brandGold border border-brandGreen hover:border-brandGold py-2 rounded transition-colors">
                        View ${matchedCount} Custom Items
                    </a>
                </div>
            </div>
        `;
    });

    holidaysHtml += `
        </div>
    </section>
    `;
    holidaysHtml += footerTemplate('../');
    fs.writeFileSync(path.join(holidayOccasionsDir, 'index.html'), holidaysHtml, 'utf8');
}

function buildCategoryPages() {
    categories.forEach(cat => {
        let html = headTemplate(cat.title, cat.desc, '../') + headerTemplate('../');
        
        let matchedProducts = products.filter(cat.filter);
        
        // For Other Occasions or empty-match pages, fill with products starting with RG- or specific reference items
        if (cat.slug === 'other-occasions') {
            matchedProducts = products.filter(p => p['Product ID'].startsWith('RG-') || p['Product ID'].startsWith('LM-'));
            if (matchedProducts.length === 0) matchedProducts = products.slice(0, 8);
        } else if (matchedProducts.length === 0) {
            matchedProducts = products.slice(0, 8);
        }

        html += `
        <!-- Hero Section -->
        <section class="bg-brandGreen text-white py-16 border-b border-brandGold-dark">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span class="text-xs font-semibold text-brandGold uppercase tracking-widest">Premium Collection</span>
                <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-1">${cat.h1}</h1>
                <p class="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl font-light">
                    ${cat.heroSub}
                </p>
            </div>
        </section>

        <!-- Manufacturer Introduction -->
        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                <div class="lg:col-span-7">
                    <h2 class="font-serif text-2xl sm:text-3xl font-bold text-brandGreen mb-4">Direct Factory Manufacturer Of ${cat.name}</h2>
                    <p class="text-slate-600 leading-relaxed text-sm mb-6">${cat.intro}</p>
                    <div class="flex space-x-4">
                        <a href="../contact.html?category=${cat.slug}" class="inline-flex items-center px-6 py-3 bg-brandGold text-brandGreen-dark font-bold rounded-md hover:bg-brandGold-light transition-all shadow text-sm">
                            Request Custom Quotation
                        </a>
                    </div>
                </div>
                <div class="lg:col-span-5 bg-brandIvory-dark p-8 rounded-lg border border-slate-200">
                    <h3 class="font-serif text-base font-bold text-brandGreen mb-4">Core Custom Specifications</h3>
                    <ul class="space-y-3 text-xs text-slate-700">
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Custom Dimensions to Fit Your Products</li>
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Premium Art Paper, Kraft, Textured & Specialty Stocks</li>
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Premium Hot Stamping Foil, Spot UV & Debossing</li>
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Tailored Inner Dividers (EVA, Flocked Trays, Cardboard)</li>
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Low Manufacturing MOQ starting at 50 PCS</li>
                    </ul>
                </div>
            </div>

            <!-- Dynamically Render Category Products Grid -->
            <div class="mb-16">
                <h3 class="font-serif text-2xl font-bold text-brandGreen text-center mb-8">Premium ${cat.name} Showcase</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${matchedProducts
                        .map(p => {
                            const id = p['Product ID'];
                            const name = p['Product Name'];
                            const folderName = p['Image Folder'];
                            const prefix = id.startsWith('IP-') ? 'ip' : 'ac';
                            const idLower = id.toLowerCase().replace('ac-', '').replace('ip-', '');
                            
                            let imgPath = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80';
                            const imageFolderPath = path.join(__dirname, 'images', 'products', folderName);
                            if (fs.existsSync(imageFolderPath)) {
                                const dirFiles = fs.readdirSync(imageFolderPath);
                                const imgFiles = dirFiles.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f)).sort();
                                if (imgFiles.length > 0) {
                                    imgPath = `../images/products/${folderName}/${imgFiles[0]}`;
                                }
                            }

                            return `
                                <div class="group bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:border-brandGold/30 transition-all flex flex-col justify-between cursor-pointer"
                                     onclick="window.location.href='../products/${prefix}-${idLower}.html'">
                                    <div>
                                        <div class="h-56 overflow-hidden bg-white relative p-1 flex items-center justify-center">
                                            <img src="${imgPath}" alt="${escapeHtml(name)}" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500">
                                            <span class="absolute top-2 left-2 text-[10px] font-bold bg-brandGreen text-white px-2 py-0.5 rounded shadow">${id}</span>
                                        </div>
                                        <div class="p-4 border-t border-slate-100">
                                            <h4 class="font-serif text-sm font-bold text-brandGreen group-hover:text-brandGold transition-colors line-clamp-1">${escapeHtml(name)}</h4>
                                            <p class="text-[10px] text-brandGold font-semibold italic mb-2">${escapeHtml(p['Main Category'])}</p>
                                            <p class="text-[11px] text-slate-500 line-clamp-2">${escapeHtml(p['Short Description'])}</p>
                                        </div>
                                    </div>
                                    <div class="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-50">
                                        <span class="text-[9px] font-bold text-slate-400">Low MOQ 50</span>
                                        <span class="inline-flex items-center text-[11px] font-bold text-brandGreen hover:text-brandGold transition-colors">
                                            Specs <svg class="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                                        </span>
                                    </div>
                                </div>
                            `;
                        })
                        .join('')}
                </div>
            </div>

            <!-- CTA to full catalog -->
            <div class="text-center bg-brandIvory p-12 rounded-lg border border-slate-200">
                <h3 class="font-serif text-2xl font-bold text-brandGreen mb-4">Need A Custom Structure?</h3>
                <p class="text-slate-600 text-sm mb-8 max-w-2xl mx-auto">Our in-house structural engineers can design completely custom dielines to suit your seasonal PR campaigns or retail launches.</p>
                <a href="../contact.html?subject=Custom%20${encodeURIComponent(cat.name)}" class="inline-flex items-center px-8 py-4 bg-brandGreen text-white font-bold rounded-md hover:bg-brandGreen-light transition-all shadow-lg text-sm">
                    Contact Our Engineers
                </a>
            </div>
        </section>
        `;
        
        html += footerTemplate('../');
        
        const targetPath = path.join(__dirname, cat.dir, `${cat.slug}.html`);
        fs.writeFileSync(targetPath, html, 'utf8');
        console.log(`Generated page: ${cat.dir}/${cat.slug}.html`);
    });
    console.log("All individual category landing pages generated successfully!");
}

buildSubdirectoryIndices();
buildCategoryPages();
