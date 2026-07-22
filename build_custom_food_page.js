const fs = require('fs');
const path = require('path');
const { headTemplate, headerTemplate, footerTemplate } = require('./templates');

const cat = {
    slug: 'chocolate-and-food-packaging',
    name: 'Chocolate & Food Packaging',
    title: 'Custom Chocolate & Food Packaging Manufacturer | Bakery, Dates & Dessert Gift Boxes',
    desc: 'Custom food packaging manufacturer for chocolate boxes, bakery boxes, cupcake boxes, dates gift boxes, Ramadan food packaging, mooncake boxes, and premium dessert gift packaging. MOQ from 50 pcs.',
    h1: 'Custom Chocolate & Food Packaging',
    heroSub: 'Food-Safe Rigid Packaging for Chocolate, Bakery, Dates & Dessert Brands',
    intro: 'Protect delicate sweets, elevate your gifting experience, and create packaging that customers want to keep. ShineleeBox designs and manufactures custom food-safe paper packaging for chocolate, bakery, dates, mooncake, macaron, cake, pastry, and premium dessert brands.'
};

const sections = [
    {
        title: 'Cake & Bakery Packaging',
        subtitle: 'Window cake boxes, cupcake boxes, pastry boxes, and bakery gift packaging for premium dessert brands.',
        products: [
            { id: 'CFP-001', name: 'Custom Window Handle Cake Box', img: 'images/products/food/custom-window-handle-cake-box.png' },
            { id: 'CFP-002', name: 'Custom 1-Piece Cupcake Box', img: 'images/products/food/custom-1-piece-cupcake-box.png' },
            { id: 'CFP-003', name: 'Custom Mini Cupcake Box', img: '../images/products/CFP-003_custom-mini-cupcake-box/image_01.jpg' },
            { id: 'CFP-004', name: 'Custom 4-Piece Cupcake Box', img: 'images/products/food/custom-4-piece-cupcake-box.png' },
            { id: 'CFP-005', name: 'Custom 6-Piece Cupcake Box', img: 'images/products/food/custom-6-piece-cupcake-box.png' },
            { id: 'CFP-006', name: 'Custom 9-Piece Cupcake Box', img: '../images/products/CFP-006_custom-9-piece-cupcake-box/image_01.jpg' },
            { id: 'CFP-007', name: 'Custom Folding Cake and Pastry Box', img: 'images/products/food/custom-folding-cake-pastry-box.png' },
            { id: 'CFP-AI-004', name: 'Custom Macaron Gift Box', img: '../images/products/CFP-AI-004/main.png' },
            { id: 'CFP-AI-005', name: 'Custom Cookie Gift Box', img: '../images/products/CFP-AI-005/main.png' },
            { id: 'CFP-AI-005', name: 'Custom Bakery Gift Box with Window', img: '../images/products/CFP-AI-005/main.png' }
        ]
    },
    {
        title: 'Chocolate Packaging',
        subtitle: 'Luxury rigid chocolate boxes, tray boxes, drawer boxes, and seasonal chocolate gift packaging.',
        products: [
            { id: 'CFP-008', name: 'Custom Geometric Chocolate Gift Box', img: 'images/products/food/custom-geometric-chocolate-box.png' },
            { id: 'CFP-009', name: 'Custom Rigid Chocolate Gift Box', img: 'images/products/food/custom-rigid-chocolate-box.png' },
            { id: 'CFP-010', name: 'Custom Premium Chocolate Box', img: '../images/products/CFP-010_custom-premium-chocolate-box/image_01.jpg' },
            { id: 'CFP-011', name: 'Custom Round Chocolate Gift Box', img: '../images/products/CFP-011_custom-round-chocolate-gift-box/image_01.jpg' },
            { id: 'CFP-012', name: 'Custom Chocolate Tray Gift Box', img: '../images/products/CFP-012_custom-chocolate-tray-gift-box/image_01.jpg' },
            { id: 'CHOC-COL-01', name: 'Christmas Countdown Chocolate Box', img: 'images/products/CHOC-COL-01/main.png' },
            { id: 'CHOC-COL-02', name: 'Valentine Countdown Chocolate Box', img: 'images/products/CHOC-COL-02/main.png' },
            { id: 'CHOC-COL-03', name: 'Mothers Day Rigid Chocolate Box', img: 'images/products/CHOC-COL-03/main.png' },
            { id: 'CHOC-COL-04', name: 'Eid Mubarak Rigid Chocolate Box', img: 'images/products/CHOC-COL-04/main.png' },
            { id: 'CHOC-COL-05', name: 'Christmas Gift Rigid Chocolate Box', img: 'images/products/CHOC-COL-05/main.png' },
            { id: 'CHOC-COL-06', name: 'Halloween Shaped Chocolate Box', img: 'images/products/CHOC-COL-06/main.png' },
            { id: 'CHOC-COL-07', name: 'Wedding Rigid Chocolate Box', img: 'images/products/CHOC-COL-07/main.png' },
            { id: 'CHOC-COL-08', name: 'Birthday Card Chocolate Box', img: 'images/products/CHOC-COL-08/main.png' },
            { id: 'CHOC-COL-09', name: 'Luxury Christmas Calendar Box', img: 'images/products/CHOC-COL-09/main.png' },
            { id: 'CHOC-COL-10', name: 'Romantic Valentine Calendar Box', img: 'images/products/CHOC-COL-10/main.png' },
            { id: 'CHOC-COL-11', name: 'Heart Shaped Wedding Favor Box', img: 'images/products/CHOC-COL-11/main.png' },
            { id: 'CHOC-COL-12', name: 'Premium Eid Rigid Drawer Box', img: 'images/products/CHOC-COL-12/main.png' },
            { id: 'CHOC-COL-13', name: 'Mini Halloween Card Sleeve Box', img: 'images/products/CHOC-COL-13/main.png' },
            { id: 'CHOC-COL-14', name: 'Mothers Day Rigid Book Box', img: 'images/products/CHOC-COL-14/main.png' },
            { id: 'CHOC-COL-15', name: 'Birthday Cake Shaped Box', img: 'images/products/CHOC-COL-15/main.png' }
        ]
    },
    {
        title: 'Dates, Ramadan & Eid Food Packaging',
        subtitle: 'Premium dates boxes, Ramadan food gift boxes, Eid sweet boxes, and halal gifting packaging.',
        products: [
            { id: 'RG-001', name: 'Premium Rigid Miswak Gift Box', img: 'images/products/RG-001_premium-rigid-miswak-gift-box/00_main.jpg' },
            { id: 'CFP-013', name: 'Custom Light-Up Dates Gift Box', img: '../images/products/CFP-013_custom-light-up-dates-gift-box/image_01.jpg' },
            { id: 'CFP-014', name: 'Custom Drawer Dates Gift Box', img: 'images/products/food/custom-drawer-dates-box.png' },
            { id: 'CFP-015', name: 'Custom Floral Drawer Dates Box', img: '../images/products/CFP-015_custom-floral-drawer-dates-box/image_01.jpg' },
            { id: 'CFP-016', name: 'Custom Velvet Dates Gift Box', img: '../images/products/CFP-016_custom-velvet-dates-gift-box/image_01.jpg' },
            { id: 'CFP-017', name: 'Custom Halal Dates Gift Box', img: '../images/products/CFP-017_custom-halal-dates-gift-box/image_01.jpg' },
            { id: 'CFP-019', name: 'Custom Cylindrical Dates Gift Box', img: '../images/products/CFP-019_custom-cylindrical-dates-gift-box/image_01.jpg' },
            { id: 'CFP-020', name: 'Custom Arch Window Ramadan Gift Box', img: 'images/products/food/custom-arch-window-ramadan-box.png' },
            { id: 'CFP-021', name: 'Custom Heart-Shaped Dates Gift Box', img: '../images/products/CFP-021_custom-heart-shaped-dates-gift-box/image_01.jpg' },
            { id: 'CFP-023', name: 'Custom Crescent Ramadan Chocolate Box', img: 'images/products/food/custom-crescent-ramadan-chocolate-box.png' },
            { id: 'CFP-025', name: 'Custom Printed Dates and Dessert Box', img: '../images/products/CFP-025_custom-printed-dates-and-dessert-box/image_01.jpg' }
        ]
    },
    {
        title: 'Mooncake, Festival & Food Gift Boxes',
        subtitle: 'Custom rigid food gift boxes for mooncakes, seasonal sweets, corporate food gifts, and festival gifting.',
        products: [
            { id: 'CFP-026', name: 'Custom Mooncake Gift Box Style 01', img: '../images/products/CFP-026_custom-mooncake-gift-box-style-01/image_01.jpg' },
            { id: 'CFP-027', name: 'Custom Mooncake Gift Box Style 02', img: '../images/products/CFP-027_custom-mooncake-gift-box-style-02/image_01.jpg' },
            { id: 'CFP-028', name: 'Custom Mooncake Gift Box Style 03', img: '../images/products/CFP-028_custom-mooncake-gift-box-style-03/image_01.jpg' },
            { id: 'CFP-029', name: 'Custom Mooncake Gift Box Style 04', img: '../images/products/CFP-029_custom-mooncake-gift-box-style-04/image_01.jpg' },
            { id: 'CFP-AI-002', name: 'Double-Layer Sliding Mooncake Box', img: '../images/products/CFP-AI-002/main.png' },
            { id: 'IP-004', name: 'Custom Light-Up Mooncake Gift Box', img: '../images/products/IP-004_Sensor_Light-Up_Mooncake_Gift_Box/IP-004_01.jpg' },
            { id: 'CFP-AI-002', name: 'Custom Festival Food Gift Box', img: '../images/products/CFP-AI-002/main.png' },
            { id: 'CFP-014', name: 'Custom Premium Dessert Gift Box', img: 'images/products/food/custom-drawer-dates-box.png' }
        ]
    }
];

const faq = [
    { q: 'Can you make custom packaging for cakes and cupcakes?', a: 'Yes. We can customize window cake boxes, cupcake boxes, pastry boxes, macaron boxes, cookie boxes, and bakery gift boxes with custom size, insert, window, logo, and finishing.' },
    { q: 'Can you make luxury chocolate boxes?', a: 'Yes. We manufacture rigid chocolate boxes, drawer chocolate boxes, tray boxes, round boxes, magnetic chocolate gift boxes, and custom-shaped chocolate packaging.' },
    { q: 'Can you make dates boxes for Ramadan and Eid?', a: 'Yes. We support custom dates gift boxes, Ramadan food boxes, Eid sweet boxes, arch window boxes, crescent boxes, drawer dates boxes, and premium halal gift packaging.' },
    { q: 'What is the MOQ?', a: 'MOQ starts from 50 pcs for selected custom packaging projects. Final MOQ depends on box structure, size, material, printing, and finishing.' },
    { q: 'Can you provide inserts for food packaging?', a: 'Yes. We can provide paperboard inserts, PET trays, blister trays, EVA inserts, cupcake holders, chocolate trays, and custom compartment inserts.' },
    { q: 'Can I customize the box with my logo?', a: 'Yes. We support logo printing, foil stamping, embossing, debossing, spot UV, Pantone color matching, and full custom artwork.' },
    { q: 'Can you make food packaging with a clear window?', a: 'Yes. We can make front windows, top windows, arch windows, crescent windows, and custom die-cut windows using clear PET material.' },
    { q: 'Can you help design the box structure?', a: 'Yes. We can help create the structure based on your product size, weight, display requirements, shipping needs, and gifting experience.' }
];

const customOptions = [
    { title: 'Box Structure', desc: 'Window box, drawer box, rigid box, folding box, magnetic box, lid and base box, round box, custom shape box.' },
    { title: 'Food Insert', desc: 'Paperboard insert, PET tray, EVA insert, blister tray, compartment tray, cupcake holder, chocolate tray.' },
    { title: 'Window Design', desc: 'Clear PET window, arch window, crescent window, front window, top window, custom die-cut window.' },
    { title: 'Printing', desc: 'CMYK printing, Pantone color, logo printing, pattern printing, inside printing.' },
    { title: 'Surface Finishing', desc: 'Matte lamination, gloss lamination, soft-touch coating, foil stamping, embossing, debossing, spot UV.' },
    { title: 'Add-On Features', desc: 'Ribbon puller, handle, magnetic closure, LED light, music module, greeting card, sleeve, belly band.' }
];

function generatePage() {
    let html = headTemplate(cat.title, cat.desc, '../') + headerTemplate('../');

    // Hero Section
    html += `
    <section class="relative h-[600px] flex items-center overflow-hidden">
        <div class="absolute inset-0 z-0">
            <img src="../images/products/food/custom-geometric-chocolate-box.png" alt="Custom Chocolate & Food Packaging" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-brandCharcoal/40"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-brandWhite">
            <div class="max-w-3xl space-y-8">
                <nav class="text-[10px] font-bold uppercase tracking-[0.2em] text-brandGold flex items-center space-x-2">
                    <a href="../index.html" class="hover:text-brandWhite transition-colors">Home</a>
                    <span>/</span>
                    <span>Applications</span>
                    <span>/</span>
                    <span class="underline decoration-brandGold decoration-2 underline-offset-4">${cat.name}</span>
                </nav>
                <h1 class="font-serif text-5xl sm:text-7xl font-bold leading-tight">${cat.h1}</h1>
                <p class="text-xl sm:text-2xl font-light max-w-2xl leading-relaxed opacity-90">${cat.heroSub}</p>
                <div class="flex flex-wrap gap-4 pt-4">
                    <a href="../contact.html" class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-[10px] font-bold uppercase tracking-widest rounded-sm text-brandWhite bg-brandBurgundy hover:opacity-90 transition-all shadow-lg">Get Free Quote</a>
                    <a href="#explore" class="inline-flex items-center justify-center px-8 py-4 border border-brandWhite text-[10px] font-bold uppercase tracking-widest rounded-sm text-brandWhite hover:bg-brandWhite hover:text-brandCharcoal transition-all">Explore Food Packaging</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Intro Section -->
    <section class="py-24 bg-brandWhite border-b border-brandBeige/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="space-y-8">
                    <h2 class="font-serif text-3xl sm:text-4xl font-bold text-brandCharcoal leading-tight">Food-Safe Custom Packaging for Premium Food Brands</h2>
                    <div class="w-20 h-1 bg-brandGold"></div>
                    <div class="space-y-6 text-brandCharcoal/80 text-lg font-light leading-relaxed">
                        <p>From bakery chains to chocolate brands and Ramadan gift suppliers, food packaging must do more than hold the product. It needs to protect delicate items, improve shelf presentation, support gifting value, and reflect your brand quality.</p>
                        <p>${cat.intro}</p>
                    </div>
                </div>
                <div class="bg-brandIvory p-12 rounded-sm border border-brandBeige relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-brandGold/5 rounded-full -mr-16 -mt-16"></div>
                    <h3 class="font-serif text-2xl font-bold text-brandCharcoal mb-8">What We Offer</h3>
                    <ul class="space-y-4">
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-brandGold mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            <span class="text-sm font-medium">Food-safe materials & industrial certification support</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-brandGold mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            <span class="text-sm font-medium">Bespoke structural design for fragile desserts</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-brandGold mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            <span class="text-sm font-medium">Luxury finishing (foil, embossing) for high-end gifting</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-brandGold mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            <span class="text-sm font-medium">Small batch support starting from 50 pieces</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <div id="explore"></div>
    `;

    // Product Sections
    sections.forEach((section, idx) => {
        html += `
    <section class="py-24 ${idx % 2 === 0 ? 'bg-brandIvory' : 'bg-brandWhite'}">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-20 space-y-4">
                <h2 class="font-serif text-3xl sm:text-4xl font-bold text-brandCharcoal">${section.title}</h2>
                <p class="text-brandCharcoal/60 text-sm font-medium uppercase tracking-[0.2em]">${section.subtitle}</p>
                <div class="w-16 h-0.5 bg-brandGold mx-auto mt-6"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                ${section.products.map(p => {
                    const idLower = p.id.toLowerCase()
                        .replace('cfp-', '')
                        .replace('ip-', '')
                        .replace('cfp-ai-', '')
                        .replace('cs-', '')
                        .replace('sc-', '')
                        .replace('rg-', '')
                        .replace('choc-col-', '');
                    let prefix = 'cfp';
                    if (p.id.toLowerCase().startsWith('ip')) prefix = 'ip';
                    else if (p.id.toLowerCase().startsWith('choc')) prefix = 'choc';
                    else if (p.id.toLowerCase().startsWith('rg')) prefix = 'rg';
                    else if (p.id.toLowerCase().startsWith('cs')) prefix = 'cs';
                    else if (p.id.toLowerCase().startsWith('sc')) prefix = 'sc';
                    
                    const link = `../products/${prefix}-${idLower}.html`;
                    const displayImg = p.img.startsWith('../') ? p.img : '../' + p.img;
                    
                    return `
                <div class="bg-brandWhite rounded-sm overflow-hidden border border-brandBeige hover:border-brandGold transition-all flex flex-col group h-full luxury-shadow">
                    <div class="h-64 overflow-hidden bg-brandWhite relative p-8 flex items-center justify-center cursor-pointer" onclick="window.location.href='${link}'">
                        <img src="${displayImg}" alt="${p.name}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700">
                    </div>
                    <div class="p-6 flex-grow flex flex-col justify-between border-t border-brandBeige/40">
                        <div>
                            <div class="text-[9px] font-bold text-brandGold uppercase tracking-[0.2em] mb-2">${section.title.split(' & ')[0]}</div>
                            <h3 class="font-serif text-lg font-bold text-brandCharcoal mb-4 group-hover:text-brandGold transition-colors leading-tight">
                                <a href="${link}">${p.name}</a>
                            </h3>
                        </div>
                        <div class="flex items-center justify-between mt-4 pt-4 border-t border-brandBeige/20">
                            <span class="text-[9px] font-bold text-brandCharcoal/30 uppercase tracking-widest">MOQ 50 PCS</span>
                            <a href="${link}" class="text-[9px] font-bold text-brandBurgundy uppercase border-b border-brandBurgundy hover:text-brandGold hover:border-brandGold transition-all tracking-widest">Details</a>
                        </div>
                    </div>
                </div>`;
                }).join('')}
            </div>
        </div>
    </section>
        `;
    });

    // Custom Options Section
    html += `
    <section class="py-24 bg-brandCharcoal text-brandIvory">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-20 space-y-4">
                <h2 class="font-serif text-3xl sm:text-4xl font-bold">Custom Options for Food Packaging</h2>
                <p class="text-brandGold text-sm font-bold uppercase tracking-[0.2em]">Crafted to Perfection</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${customOptions.map((opt, i) => `
                <div class="p-10 border border-brandIvory/10 hover:border-brandGold/40 transition-all bg-brandIvory/5">
                    <span class="text-brandGold font-serif text-3xl opacity-30">0${i+1}</span>
                    <h4 class="text-sm font-bold uppercase tracking-widest mb-4 mt-2">${opt.title}</h4>
                    <p class="text-xs text-brandIvory/60 leading-relaxed">${opt.desc}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Why Choose Section -->
    <section class="py-24 bg-brandWhite">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div class="relative">
                    <img src="../images/products/food/custom-rigid-chocolate-box.png" alt="Why Food Brands Choose ShineleeBox" class="w-full h-auto luxury-shadow">
                    <div class="absolute -bottom-8 -right-8 bg-brandGold p-10 hidden sm:block">
                        <p class="text-brandWhite font-serif text-4xl font-bold">18+</p>
                        <p class="text-brandWhite text-[10px] font-bold uppercase tracking-widest">Years of Excellence</p>
                    </div>
                </div>
                <div class="space-y-10">
                    <h2 class="font-serif text-4xl font-bold text-brandCharcoal">Why Food Brands Choose ShineleeBox</h2>
                    <ul class="space-y-6">
                        <li class="flex items-start gap-5">
                            <span class="w-8 h-8 rounded-full bg-brandIvory flex items-center justify-center text-brandGold font-bold text-sm flex-shrink-0">1</span>
                            <div>
                                <h4 class="text-sm font-bold uppercase tracking-widest text-brandCharcoal mb-2">Low MOQ Customization</h4>
                                <p class="text-sm text-brandCharcoal/60 leading-relaxed">Starting from 50 pieces for selected custom food gift packaging projects, supporting growing brands.</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-5">
                            <span class="w-8 h-8 rounded-full bg-brandIvory flex items-center justify-center text-brandGold font-bold text-sm flex-shrink-0">2</span>
                            <div>
                                <h4 class="text-sm font-bold uppercase tracking-widest text-brandCharcoal mb-2">Fast Prototyping</h4>
                                <p class="text-sm text-brandCharcoal/60 leading-relaxed">Quick sampling turnaround to support your seasonal product launches and marketing campaigns.</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-5">
                            <span class="w-8 h-8 rounded-full bg-brandIvory flex items-center justify-center text-brandGold font-bold text-sm flex-shrink-0">3</span>
                            <div>
                                <h4 class="text-sm font-bold uppercase tracking-widest text-brandCharcoal mb-2">Food-Safe Assurance</h4>
                                <p class="text-sm text-brandCharcoal/60 leading-relaxed">Access to food-safe paperboard, FSC certified materials, and premium insert options.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 bg-brandIvory border-y border-brandBeige/50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-brandCharcoal text-center mb-16">Frequently Asked Questions</h2>
            <div class="space-y-6">
                ${faq.map((item, i) => `
                <div class="bg-brandWhite p-8 border border-brandBeige rounded-sm luxury-shadow">
                    <h4 class="text-sm font-bold text-brandCharcoal mb-4 flex items-center gap-3">
                        <span class="text-brandGold">Q${i+1}:</span> ${item.q}
                    </h4>
                    <p class="text-xs text-brandCharcoal/70 leading-relaxed pl-8 border-l border-brandGold/20">${item.a}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="py-24 bg-brandWhite text-center">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <h2 class="font-serif text-4xl sm:text-6xl font-bold text-brandCharcoal leading-tight">Create Packaging That Makes Your Food Gift Worth More</h2>
            <p class="text-lg text-brandCharcoal/70 font-light max-w-2xl mx-auto leading-relaxed">Whether you need a bakery box, chocolate gift box, dates packaging, Ramadan food box, or premium dessert gift set, ShineleeBox can help you turn your product into a high-value gifting experience.</p>
            <div class="flex flex-wrap justify-center gap-6 pt-6">
                <a href="../contact.html" class="inline-flex items-center justify-center px-10 py-5 border border-transparent text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm text-brandWhite bg-brandBurgundy hover:opacity-90 transition-all shadow-xl">Request Custom Quote</a>
                <a href="mailto:info@slpack.net" class="inline-flex items-center justify-center px-10 py-5 border border-brandCharcoal text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm text-brandCharcoal hover:bg-brandCharcoal hover:text-brandWhite transition-all">Send Your Product Size</a>
            </div>
        </div>
    </section>
    `;

    html += footerTemplate('../');
    fs.writeFileSync(path.join(__dirname, 'applications', 'chocolate-and-food-packaging.html'), html, 'utf8');
}

generatePage();
console.log("Custom Food Packaging Landing Page successfully updated!");
