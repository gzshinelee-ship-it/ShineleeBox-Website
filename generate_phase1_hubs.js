const fs = require('fs');
const path = require('path');
const { headTemplate, headerTemplate, footerTemplate } = require('./templates');

const root = __dirname;

function escapeHtml(value = '') {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function extract(html, regex, fallback = '') {
    const match = html.match(regex);
    return match ? match[1].replace(/\s+/g, ' ').trim() : fallback;
}

function cleanTitle(title) {
    return title
        .replace(/^\[Wholesale\]\s*/i, '')
        .replace(/\s*\|\s*ShineleeBox\s*\|\s*ShineleeBox\s*$/i, ' | ShineleeBox')
        .replace(/\s*\|\s*ShineleeBox.*$/i, '')
        .trim();
}

function loadProducts() {
    return fs.readdirSync(path.join(root, 'products'))
        .filter(file => /^[a-z]+(?:-[a-z]+)*-\d+\.html$/i.test(file))
        .map(file => {
            const html = fs.readFileSync(path.join(root, 'products', file), 'utf8');
            return {
                file,
                id: file.replace('.html', '').toUpperCase(),
                name: cleanTitle(extract(html, /<title>([\s\S]*?)<\/title>/i, file)),
                description: extract(html, /<meta\s+name="description"\s+content="([^"]*)"/i),
                image: extract(html, /<img[^>]+id="main-product-img"[^>]+src="([^"]+)"/i)
                    || extract(html, /<img[^>]+src="([^"]+)"/i)
            };
        });
}

const products = loadProducts();

function byPrefixes(prefixes, extras = []) {
    const selected = products.filter(product => prefixes.some(prefix => product.id.startsWith(prefix)) || extras.includes(product.id));
    return [...new Map(selected.map(product => [product.file, product])).values()];
}

function productCard(product, relativePath) {
    const image = product.image.startsWith('../') ? relativePath + product.image.slice(3) : product.image;
    return `
        <article class="bg-brandWhite border border-brandBeige p-5 flex flex-col luxury-shadow group">
            <a href="${relativePath}products/${product.file}" class="block h-56 bg-white overflow-hidden mb-5" aria-label="View ${escapeHtml(product.name)}">
                <img src="${image}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500">
            </a>
            <p class="text-[10px] text-brandGold font-bold uppercase tracking-[0.18em] mb-2">${escapeHtml(product.id)}</p>
            <h2 class="font-serif text-xl font-bold leading-snug mb-3">${escapeHtml(product.name)}</h2>
            <p class="text-sm text-brandCharcoal/65 leading-relaxed mb-5 line-clamp-3">${escapeHtml(product.description)}</p>
            <a href="${relativePath}products/${product.file}" class="mt-auto text-[10px] font-bold uppercase tracking-widest text-brandBurgundy">View product →</a>
        </article>`;
}

function collectionPage(config) {
    const relativePath = config.dir.includes('/') ? '../../' : '../';
    const items = config.products.slice(0, config.limit || 24);
    const canonical = `https://www.slpack.net/${config.dir}/${config.slug}.html`;
    let html = headTemplate(config.title, config.description, relativePath)
        .replace('</head>', `    <link rel="canonical" href="${canonical}">\n</head>`);
    html += headerTemplate(relativePath);
    html += `
        <section class="bg-brandCharcoal text-brandIvory border-b border-brandGold/30">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                <p class="text-[10px] uppercase tracking-[0.28em] text-brandGold font-bold mb-5">Direct manufacturer · MOQ from 50 pcs</p>
                <h1 class="font-serif text-4xl sm:text-6xl font-bold max-w-4xl leading-tight">${escapeHtml(config.h1)}</h1>
                <p class="mt-6 max-w-3xl text-base sm:text-lg text-brandIvory/70 leading-relaxed">${escapeHtml(config.intro)}</p>
                <div class="mt-8 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-widest">
                    <span class="border border-brandGold/40 px-4 py-2">Free dieline</span>
                    <span class="border border-brandGold/40 px-4 py-2">5–7 day sampling</span>
                    <span class="border border-brandGold/40 px-4 py-2">FSC options</span>
                </div>
            </div>
        </section>
        <section class="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
                <div>
                    <p class="text-[10px] uppercase tracking-[0.25em] text-brandGold font-bold mb-3">Selected structures</p>
                    <h2 class="font-serif text-3xl sm:text-4xl font-bold">Packaging options for your brief</h2>
                </div>
                <a href="${relativePath}contact.html" class="inline-flex justify-center bg-brandBurgundy text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest">Request custom quote</a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">${items.map(item => productCard(item, relativePath)).join('')}</div>
        </section>
        <section class="bg-brandWhite border-y border-brandBeige py-16">
            <div class="max-w-5xl mx-auto px-4 text-center">
                <h2 class="font-serif text-3xl font-bold">Need a different size, insert or finish?</h2>
                <p class="mt-4 text-brandCharcoal/65">Send your product dimensions, quantity and launch date. Our packaging team will recommend a structure and prepare a production-ready dieline.</p>
                <a href="${relativePath}contact.html" class="inline-flex mt-7 bg-brandCharcoal text-brandIvory px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Start your packaging project</a>
            </div>
        </section>`;
    html += footerTemplate(relativePath);
    const dir = path.join(root, config.dir);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${config.slug}.html`), html);
}

function hubPage(config) {
    const relativePath = '../';
    const canonical = `https://www.slpack.net/${config.dir}/index.html`;
    let html = headTemplate(config.title, config.description, relativePath)
        .replace('</head>', `    <link rel="canonical" href="${canonical}">\n</head>`);
    html += headerTemplate(relativePath);
    html += `
        <section class="bg-brandCharcoal text-brandIvory py-20 sm:py-28 border-b border-brandGold/30">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p class="text-[10px] uppercase tracking-[0.28em] text-brandGold font-bold mb-5">Custom packaging solutions</p>
                <h1 class="font-serif text-4xl sm:text-6xl font-bold">${escapeHtml(config.h1)}</h1>
                <p class="mt-6 max-w-3xl text-brandIvory/70 text-lg leading-relaxed">${escapeHtml(config.intro)}</p>
            </div>
        </section>
        <section class="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                ${config.cards.map(card => `
                    <a href="${card.href}" class="bg-brandWhite border border-brandBeige p-8 luxury-shadow group">
                        <p class="text-[10px] uppercase tracking-[0.2em] text-brandGold font-bold mb-4">${escapeHtml(card.eyebrow)}</p>
                        <h2 class="font-serif text-2xl font-bold mb-4 group-hover:text-brandBurgundy">${escapeHtml(card.title)}</h2>
                        <p class="text-sm text-brandCharcoal/65 leading-relaxed">${escapeHtml(card.text)}</p>
                        <span class="inline-block mt-6 text-[10px] uppercase tracking-widest font-bold text-brandBurgundy">Explore solution →</span>
                    </a>`).join('')}
            </div>
        </section>`;
    html += footerTemplate(relativePath);
    const dir = path.join(root, config.dir);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
}

const configs = [
    { dir: 'products', slug: 'keepsake-boxes', title: 'Custom Keepsake Boxes with Video Screens | ShineleeBox', description: 'Custom video keepsake boxes for weddings, baby milestones, memorials, graduations and corporate gifting. Factory-direct production with custom LCD screens and inserts.', h1: 'Custom Keepsake & Video Gift Boxes', intro: 'Turn important stories into premium presentation boxes with integrated video screens, magnetic closures and tailored compartments.', products: byPrefixes(['LM-']) },
    { dir: 'products', slug: 'greeting-cards', title: 'Custom 3D Pop-Up, Light & Music Greeting Cards | ShineleeBox', description: 'Custom 3D pop-up greeting cards with optional LED light, music and branded artwork for retail campaigns and premium gift sets.', h1: 'Custom Interactive Greeting Cards', intro: 'Create memorable branded cards with dimensional paper engineering, sound, light and custom artwork for campaigns and gift sets.', products: byPrefixes(['GC-']) },
    { dir: 'products/rigid-boxes', slug: 'foldable-rigid-boxes', title: 'Custom Foldable Rigid Gift Boxes Manufacturer | ShineleeBox', description: 'Space-saving foldable rigid boxes with magnetic closures, custom inserts and premium finishes. MOQ from 50 pieces for selected structures.', h1: 'Custom Foldable Rigid Boxes', intro: 'Reduce storage and freight volume while keeping the premium feel of a rigid gift box. Choose magnetic, ribbon and handled collapsible structures.', products: byPrefixes(['AC-SLF-']) },
    { dir: 'products/rigid-boxes', slug: 'custom-shape-boxes', title: 'Custom Shape Rigid Gift Boxes Manufacturer | ShineleeBox', description: 'Custom shape rigid boxes for cosmetics, gifts and retail launches with structural engineering, fitted inserts and premium finishes.', h1: 'Custom Shape Rigid Gift Boxes', intro: 'Move beyond standard rectangles with engineered shapes, sculptural openings and inserts developed around your product and campaign.', products: byPrefixes(['CS-'], ['AC-093']) },
    { dir: 'applications', slug: 'beauty-perfume-personal-care-packaging', title: 'Custom Beauty, Perfume & Personal Care Packaging | ShineleeBox', description: 'Luxury custom packaging for perfume, skincare, cosmetics, PR kits and discovery sets. Custom inserts, finishes and low-MOQ sampling.', h1: 'Beauty, Perfume & Personal Care Packaging', intro: 'Protect delicate products and create a camera-ready reveal with custom rigid structures, fitted inserts and premium decorative finishes.', products: byPrefixes(['PP-', 'CP-'], ['AC-091', 'AC-094', 'AC-095']) },
    { dir: 'applications', slug: 'wine-liquor-packaging', title: 'Custom Wine & Liquor Gift Box Packaging | ShineleeBox', description: 'Custom rigid wine and spirits gift boxes with magnetic, drawer, suitcase and presentation structures for premium beverage brands.', h1: 'Wine & Liquor Gift Box Packaging', intro: 'Build a premium bottle presentation with protective inserts, reinforced structures and finishes tailored for wine, whisky and spirits launches.', products: byPrefixes(['RB-', 'SC-']).slice(0, 12) },
    { dir: 'applications', slug: 'jewelry-and-accessories-packaging', title: 'Custom Jewelry & Accessories Gift Boxes | ShineleeBox', description: 'Custom rigid jewelry, watch and accessories boxes with magnetic, drawer and suitcase structures plus tailored velvet or paper inserts.', h1: 'Jewelry & Accessories Packaging', intro: 'Present jewelry, watches and accessories in compact luxury boxes engineered for protection, display and a refined unboxing experience.', products: byPrefixes(['MG-', 'DR-', 'SC-']).slice(0, 18) },
    { dir: 'applications', slug: 'corporate-and-retail-packaging', title: 'Custom Corporate & Retail Gift Packaging | ShineleeBox', description: 'Custom corporate gift boxes, retail presentation kits and VIP packaging with branded inserts, premium finishes and global B2B delivery.', h1: 'Corporate & Retail Gift Packaging', intro: 'Bring product launches, employee gifts and VIP campaigns together in one consistent, premium packaging system.', products: byPrefixes(['RB-', 'IP-'], ['LM-009']).slice(0, 15) },
    { dir: 'applications', slug: 'religious-and-cultural-gift-packaging', title: 'Custom Religious & Cultural Gift Packaging | ShineleeBox', description: 'Purpose-built packaging and paper products for Ramadan, Eid, Hajj, Umrah, keepsakes and culturally significant gifting programs.', h1: 'Religious & Cultural Gift Packaging', intro: 'Develop respectful, practical packaging for religious gifting, ritual kits, community programs and seasonal campaigns.', products: byPrefixes(['RG-'], ['LM-004', 'CFP-013', 'CFP-018', 'CFP-020']) },
    { dir: 'applications', slug: 'electronics-and-premium-gift-packaging', title: 'Custom Electronics & Premium Presentation Boxes | ShineleeBox', description: 'Custom presentation boxes for electronics, smart devices and premium gift sets with protective inserts, lighting and video options.', h1: 'Electronics & Premium Presentation Packaging', intro: 'Combine protective engineering with an elevated reveal using precision inserts, rigid structures, lighting or integrated video screens.', products: byPrefixes(['IP-', 'RB-'], ['LM-009']).slice(0, 15) },
    { dir: 'holiday-occasions', slug: 'valentines-day-packaging', title: 'Custom Valentine’s Day Gift Packaging | ShineleeBox', description: 'Custom Valentine gift boxes for chocolate, cosmetics, jewelry and fragrance with heart-shaped, drawer and premium rigid structures.', h1: 'Valentine’s Day Gift Packaging', intro: 'Create romantic seasonal packaging for chocolate, beauty, jewelry and fragrance campaigns with custom color, inserts and finishing.', products: byPrefixes(['CHOC-COL-', 'CP-', 'MG-']).filter(p => /02|heart|pink|jewelry/i.test(`${p.id} ${p.name}`)).slice(0, 12) },
    { dir: 'holiday-occasions', slug: 'wedding-and-anniversary-packaging', title: 'Custom Wedding & Anniversary Gift Packaging | ShineleeBox', description: 'Custom wedding keepsake boxes, invitation cards, jewelry packaging and anniversary presentation boxes for brands and event partners.', h1: 'Wedding & Anniversary Packaging', intro: 'Unite invitations, keepsakes and premium gifts with coordinated structures, materials and brand-ready finishes.', products: byPrefixes(['GC-', 'MG-', 'DR-'], ['LM-002']).slice(0, 13) },
    { dir: 'holiday-occasions', slug: 'baby-and-family-keepsake-packaging', title: 'Custom Baby & Family Keepsake Boxes | ShineleeBox', description: 'Custom baby milestone, family memory and video keepsake boxes with personalized artwork, magnetic closures and fitted compartments.', h1: 'Baby & Family Keepsake Packaging', intro: 'Preserve milestone moments in personalized keepsake boxes designed for photos, gifts, documents and video memories.', products: byPrefixes([], ['LM-001', 'LM-007', 'GC-002', 'GC-004']) },
    { dir: 'holiday-occasions', slug: 'graduation-packaging', title: 'Custom Graduation Gift & Certificate Packaging | ShineleeBox', description: 'Custom graduation certificate boxes, video keepsakes, admission cards and presentation packaging for schools, brands and institutions.', h1: 'Graduation Gift & Certificate Packaging', intro: 'Celebrate academic milestones with premium certificate cases, video keepsakes and presentation-ready gift packaging.', products: byPrefixes([], ['LM-008', 'GC-003', 'RB-001', 'RB-002']) },
    { dir: 'holiday-occasions', slug: 'mothers-day-fathers-day-packaging', title: 'Custom Mother’s Day, Father’s Day & Corporate Holiday Packaging | ShineleeBox', description: 'Custom seasonal gift packaging for Mother’s Day, Father’s Day and corporate holiday campaigns with premium rigid and interactive boxes.', h1: 'Seasonal & Corporate Holiday Gift Packaging', intro: 'Create adaptable premium gift sets for appreciation campaigns, family occasions and corporate seasonal gifting.', products: byPrefixes(['RB-', 'IP-', 'MG-']).slice(0, 15) },
    { dir: 'holiday-occasions', slug: 'other-occasions', title: 'Custom Packaging for Special Occasions | ShineleeBox', description: 'Custom packaging for birthdays, launches, ceremonies, cultural events and special campaigns with low-MOQ structural development.', h1: 'Packaging for Special Occasions', intro: 'Adapt proven rigid, interactive and keepsake structures to birthdays, launches, ceremonies and one-of-a-kind branded moments.', products: byPrefixes(['GC-', 'IP-', 'LM-']).slice(0, 18) }
];

configs.forEach(collectionPage);

hubPage({
    dir: 'applications', title: 'Custom Packaging Solutions by Industry | ShineleeBox', description: 'Explore custom packaging solutions for beauty, perfume, food, wine, jewelry, retail, religious gifting and electronics.', h1: 'Packaging Solutions by Industry', intro: 'Start with your product and market. Each solution combines suitable structures, inserts, finishes and production support for your category.',
    cards: [
        ['Beauty & Perfume', 'beauty-perfume-personal-care-packaging.html', 'Cosmetics, fragrance, skincare and PR kits.'],
        ['Chocolate & Food', 'chocolate-and-food-packaging.html', 'Chocolate, bakery, dates, sweets and festive food gifting.'],
        ['Wine & Liquor', 'wine-liquor-packaging.html', 'Protective bottle presentation for wine and spirits.'],
        ['Jewelry & Accessories', 'jewelry-and-accessories-packaging.html', 'Compact premium boxes for jewelry, watches and accessories.'],
        ['Corporate & Retail', 'corporate-and-retail-packaging.html', 'Launch kits, VIP gifts and branded retail presentation.'],
        ['Religious & Cultural', 'religious-and-cultural-gift-packaging.html', 'Ramadan, Eid, Hajj, Umrah and community programs.'],
        ['Electronics & Premium', 'electronics-and-premium-gift-packaging.html', 'Protective inserts with lighting and video options.']
    ].map(([title, href, text]) => ({ eyebrow: 'Industry solution', title, href, text }))
});

hubPage({
    dir: 'holiday-occasions', title: 'Custom Holiday & Occasion Packaging | ShineleeBox', description: 'Explore custom packaging for Christmas, Ramadan, Eid, Valentine’s Day, weddings, baby keepsakes, graduations and corporate holidays.', h1: 'Holiday & Occasion Packaging', intro: 'Plan seasonal packaging around launch dates, retail calendars and gifting moments with low-MOQ sampling and scalable production.',
    cards: [
        ['Christmas Packaging', 'christmas-packaging.html', 'Advent calendars and premium holiday gift sets.'],
        ['Ramadan & Eid', 'ramadan-and-eid-packaging.html', 'Dates, sweets, gifts and ritual packaging.'],
        ['Valentine’s Day', 'valentines-day-packaging.html', 'Romantic packaging for chocolate, beauty and jewelry.'],
        ['Wedding & Anniversary', 'wedding-and-anniversary-packaging.html', 'Keepsakes, invitations and premium gifts.'],
        ['Baby & Family Keepsake', 'baby-and-family-keepsake-packaging.html', 'Milestone, memory and personalized presentation boxes.'],
        ['Graduation', 'graduation-packaging.html', 'Certificate cases, keepsakes and institutional gifting.'],
        ['Seasonal Corporate Gifts', 'mothers-day-fathers-day-packaging.html', 'Appreciation and corporate holiday campaigns.'],
        ['Other Occasions', 'other-occasions.html', 'Birthdays, launches, ceremonies and custom events.']
    ].map(([title, href, text]) => ({ eyebrow: 'Occasion', title, href, text }))
});

console.log(`Generated ${configs.length + 2} phase-one category and hub pages.`);
