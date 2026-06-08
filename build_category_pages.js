const fs = require('fs');
const path = require('path');
const { headTemplate, headerTemplate, footerTemplate } = require('./templates');

const categories = [
    {
        slug: 'advent-calendars',
        name: 'Custom Advent Calendar Boxes',
        title: 'Custom Advent Calendar Boxes | Beauty, Perfume, Christmas & Ramadan Packaging',
        desc: 'ShineleeBox manufactures custom advent calendar boxes for beauty, perfume, skincare, chocolate, jewelry, Christmas, Ramadan and luxury gift campaigns.',
        h1: 'Custom Advent Calendar Boxes',
        intro: 'An advent calendar is more than holiday packaging. It is a daily unboxing experience, a product discovery journey and a powerful seasonal campaign tool.',
        heroSub: 'Advent calendar packaging for beauty, perfume, chocolate, candles, jewelry, Christmas, Ramadan and luxury brand campaigns.',
        industries: [
            { name: 'Beauty', desc: 'Custom drawer calendars for skincare, makeup, and influencer gifts.' },
            { name: 'Perfume', desc: 'Luxury calendar boxes for fragrance samples and discovery sets.' },
            { name: 'Ramadan', desc: '30-day calendar boxes for Ramadan, Eid, and Islamic gifts.' },
            { name: 'Christmas', desc: 'Classic holiday calendars for seasonal retail launches.' }
        ],
        structures: [
            { name: 'Book-Style', desc: 'Classic opening structure with left and right doors.' },
            { name: 'Drawer Style', desc: 'Individual drawers create a strong daily surprise.' },
            { name: 'Perfume Bottle Shape', desc: 'Unique custom-shaped structure for fragrance brands.' },
            { name: 'Round / Tree Shape', desc: 'Creative structures with high festive display value.' }
        ],
        filter: 'Advent'
    },
    {
        slug: 'magnetic-boxes',
        name: 'Magnetic Gift Boxes',
        title: 'Custom Magnetic Gift Boxes | Luxury Rigid Box Manufacturer',
        desc: 'Custom magnetic gift boxes for beauty, jewelry, perfume, chocolate and premium gifts. Rigid structure, magnetic closure, custom printing.',
        h1: 'Custom Magnetic Gift Boxes',
        intro: 'Magnetic gift boxes offer a premium opening experience and strong product protection. They are widely used for luxury retail packaging.',
        heroSub: 'Rigid board structure with magnetic closure for a high-end unboxing experience.',
        industries: [],
        structures: [],
        filter: 'Magnetic'
    },
    {
        slug: 'drawer-boxes',
        name: 'Drawer Boxes',
        title: 'Custom Drawer Boxes | Sliding Gift Box Packaging Manufacturer',
        desc: 'Custom drawer boxes for cosmetics, jewelry, candles, chocolate, gift sets and retail packaging. Sliding structure, custom size.',
        h1: 'Custom Drawer Boxes',
        intro: 'Drawer boxes create a smooth sliding unboxing experience and are suitable for premium gift sets and products.',
        heroSub: 'Sliding drawer structure with optional ribbon pull for an elegant reveal.',
        industries: [],
        structures: [],
        filter: 'Drawer'
    }
];

function buildCategoryPages() {
    categories.forEach(cat => {
        let html = headTemplate(cat.title, cat.desc, '../') + headerTemplate('../');
        
        html += `
        <section class="bg-brandGreen text-white py-16 border-b border-brandGold-dark">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span class="text-xs font-semibold text-brandGold uppercase tracking-widest">Premium Collection</span>
                <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-1">${cat.h1}</h1>
                <p class="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl font-light">
                    ${cat.heroSub}
                </p>
            </div>
        </section>

        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                <div class="lg:col-span-7">
                    <h2 class="font-serif text-2xl sm:text-3xl font-bold text-brandGreen mb-4">Manufacturer Of ${cat.name}</h2>
                    <p class="text-slate-600 leading-relaxed mb-6">${cat.intro}</p>
                    <div class="flex space-x-4">
                        <a href="../contact.html?category=${cat.slug}" class="inline-flex items-center px-6 py-3 bg-brandGold text-brandGreen-dark font-bold rounded-md hover:bg-brandGold-light transition-all shadow">
                            Get Factory Quote
                        </a>
                    </div>
                </div>
                <div class="lg:col-span-5 bg-brandIvory-dark p-8 rounded-lg border border-slate-200">
                    <h3 class="font-serif text-lg font-bold text-brandGreen mb-4">Core Custom Options</h3>
                    <ul class="space-y-3 text-sm text-slate-700">
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Custom Sizes & Dimensions</li>
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Premium Paper Stocks (FSC Available)</li>
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Luxury Finishings (Foil, UV, Debossing)</li>
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Custom Trays (EVA, PET, Velvet)</li>
                        <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-brandGold mr-2"></span>Low MOQ from 50 PCS</li>
                    </ul>
                </div>
            </div>

            ${cat.industries.length > 0 ? `
            <div class="mb-16">
                <h3 class="font-serif text-2xl font-bold text-brandGreen text-center mb-8">Solutions By Industry</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${cat.industries.map(ind => `
                        <div class="bg-white p-6 rounded border border-slate-100 shadow-sm text-center">
                            <h4 class="font-bold text-brandGreen font-serif mb-2">${ind.name}</h4>
                            <p class="text-xs text-slate-500">${ind.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            ${cat.structures.length > 0 ? `
            <div class="mb-16">
                <h3 class="font-serif text-2xl font-bold text-brandGreen text-center mb-8">Popular Packaging Structures</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${cat.structures.map(str => `
                        <div class="bg-brandGreen text-white p-6 rounded border border-brandGold-dark shadow-md">
                            <h4 class="font-bold text-brandGold font-serif mb-2">${str.name}</h4>
                            <p class="text-xs text-slate-300">${str.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- CTA to full catalog -->
            <div class="text-center bg-brandIvory p-12 rounded-lg border border-slate-200">
                <h3 class="font-serif text-2xl font-bold text-brandGreen mb-4">Explore Our ${cat.name} Portfolio</h3>
                <p class="text-slate-600 mb-8 max-w-2xl mx-auto">Browse our ready-to-order structures or discuss a completely bespoke dieline with our structural engineers.</p>
                <a href="index.html?filter=${cat.filter}" class="inline-flex items-center px-8 py-4 bg-brandGreen text-white font-bold rounded-md hover:bg-brandGreen-light transition-all shadow-lg">
                    View ${cat.name} Catalog
                </a>
            </div>
        </section>
        `;
        
        html += footerTemplate('../');
        fs.writeFileSync(path.join(__dirname, 'products', `${cat.slug}.html`), html, 'utf8');
    });
    console.log("Category landing pages generated successfully!");
}

buildCategoryPages();
