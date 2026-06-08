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

const csvPath = path.join(__dirname, 'Accio_Product_Upload_First20.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');
const products = parseCSV(csvContent);

const categories = [
    {
        slug: 'advent-calendars',
        name: 'Custom Advent Calendar Boxes',
        title: 'Custom Advent Calendar Boxes | Beauty, Perfume, Christmas & Ramadan Packaging',
        desc: 'ShineleeBox manufactures custom advent calendar boxes for beauty, perfume, skincare, chocolate, jewelry, Christmas, Ramadan and luxury gift campaigns.',
        h1: 'Custom Advent Calendar Boxes',
        intro: 'An advent calendar is more than holiday packaging. It is a daily unboxing experience, a product discovery journey and a powerful seasonal campaign tool.',
        heroSub: 'Premium bespoke advent calendar packaging for beauty, perfume, chocolate, candles, jewelry, Christmas, Ramadan and luxury brand campaigns.',
        industries: [
            { name: 'Beauty & Skincare', desc: 'Custom drawer calendars for skincare, makeup, and influencer gifts.' },
            { name: 'Perfume & Fragrance', desc: 'Luxury calendar boxes for fragrance samples and discovery sets.' },
            { name: 'Ramadan & Eid', desc: '30-day calendar boxes for Ramadan, Eid, and Islamic gifts.' },
            { name: 'Christmas & Holiday', desc: 'Classic holiday calendars for seasonal retail launches.' }
        ],
        structures: [
            { name: 'Sliding Drawers', desc: 'Individual pull-out drawers that create a satisfying daily unboxing reveal.' },
            { name: 'Book-Style Gatefold', desc: 'Classic structural opening with left and right doors secured by magnetic snaps.' },
            { name: 'Shaped Silhouette', desc: 'Uniquely crafted house, tree, perfume bottle, or carousel shapes.' },
            { name: 'Rotating Round Tower', desc: 'Innovative multi-layer carousel display structures with mechanical motion.' }
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

            <!-- Solutions & Structures for Advent Calendars -->
            ${cat.slug === 'advent-calendars' ? `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <!-- Industry Solutions -->
                <div class="bg-white p-8 rounded-lg border border-slate-100 shadow-xs">
                    <h3 class="font-serif text-lg font-bold text-brandGreen mb-4">Industry-Specific Applications</h3>
                    <div class="space-y-4">
                        ${cat.industries.map(ind => `
                            <div>
                                <h4 class="font-bold text-brandGreen-light text-sm mb-1">${escapeHtml(ind.name)}</h4>
                                <p class="text-slate-500 text-xs">${escapeHtml(ind.desc)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <!-- Popular Structures -->
                <div class="bg-white p-8 rounded-lg border border-slate-100 shadow-xs">
                    <h3 class="font-serif text-lg font-bold text-brandGreen mb-4">Innovative Structures We Build</h3>
                    <div class="space-y-4">
                        ${cat.structures.map(str => `
                            <div>
                                <h4 class="font-bold text-brandGreen-light text-sm mb-1">${escapeHtml(str.name)}</h4>
                                <p class="text-slate-500 text-xs">${escapeHtml(str.desc)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            ` : ''}

            <!-- Dynamically Render Category Products Grid -->
            <div class="mb-16">
                <h3 class="font-serif text-2xl font-bold text-brandGreen text-center mb-8">Premium ${cat.name} Showcase</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${products
                        .filter(p => {
                            if (cat.slug === 'advent-calendars') {
                                return p['Main Category'] === 'Advent Calendar Boxes';
                            } else if (cat.slug === 'magnetic-boxes') {
                                return p['Subcategory'].toLowerCase().includes('magnetic') || p['Custom Options'].toLowerCase().includes('magnetic');
                            } else if (cat.slug === 'drawer-boxes') {
                                return p['Subcategory'].toLowerCase().includes('drawer') || p['Custom Options'].toLowerCase().includes('drawer');
                            }
                            return false;
                        })
                        .map(p => {
                            const id = p['Product ID'];
                            const name = p['Product Name'];
                            const folderName = p['Image Folder'];
                            const idLower = id.toLowerCase().replace('ac-', '');
                            
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
                                     onclick="window.location.href='ac-${idLower}.html'">
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
        fs.writeFileSync(path.join(__dirname, 'products', `${cat.slug}.html`), html, 'utf8');
    });
    console.log("Category landing pages generated successfully!");
}

buildCategoryPages();
