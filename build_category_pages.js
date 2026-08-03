const fs = require('fs');
const path = require('path');
const { headTemplate, headerTemplate, footerTemplate } = require('./templates');

function ensureDir(dirPath) { if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true }); }
function escapeHtml(unsafe) { if (!unsafe) return ''; return unsafe.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); }

function parseCSV(content) {
    const records = [];
    let field = '', row = [], inQuotes = false;
    content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    for (let i = 0; i < content.length; i++) {
        const char = content[i], nextChar = content[i + 1];
        if (char === '"') { if (inQuotes && nextChar === '"') { field += '"'; i++; } else { inQuotes = !inQuotes; } }
        else if (char === ',' && !inQuotes) { row.push(field.trim()); field = ''; }
        else if (char === '\n' && !inQuotes) { row.push(field.trim()); if (row.length > 0) records.push(row); row = []; field = ''; }
        else { field += char; }
    }
    if (field || row.length > 0) { row.push(field.trim()); records.push(row); }
    if (records.length === 0) return [];
    const headers = records[0].map(h => h.replace(/^\uFEFF/, '').trim());
    return records.slice(1).map(r => { const obj = {}; headers.forEach((h, idx) => { obj[h] = r[idx] || ''; }); return obj; });
}

function resolveImageFolder(id) {
    if (!id) return '';
    const idUpper = id.toUpperCase().trim();
    const productsImagesDir = path.join(__dirname, 'images', 'products');
    if (!fs.existsSync(productsImagesDir)) return '';
    const dirs = fs.readdirSync(productsImagesDir);
    const matched = dirs.find(d => { const dUpper = d.toUpperCase(); return dUpper === idUpper || dUpper.startsWith(idUpper + '_'); });
    return matched || '';
}

const DEFAULT_IMG = 'https://sc04.alicdn.com/kf/Ab4e81abe62284910abf050838dc1bd50N.jpg';

function getProductImagePath(folder, basePath) {
    if (!folder) return DEFAULT_IMG;
    const folderPath = path.join(__dirname, 'images', 'products', folder);
    if (!fs.existsSync(folderPath)) return DEFAULT_IMG;
    const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort();
    if (files.length === 0) return DEFAULT_IMG;
    const mainFile = files.find(f => f.startsWith('00_main'));
    return `${basePath}images/products/${folder}/${mainFile || files[0]}`;
}

const csvFiles = [
    'Accio_Product_Upload_First20.csv', 'Accio_Interactive_Product_Upload.csv', 'Accio_Life_Memory_Upload.csv',
    'Accio_Religious_Product_Upload.csv', 'Accio_Greeting_Cards_Upload.csv', 'Accio_Cosmetic_Perfume_Final.csv',
    'Accio_Chocolate_Food_Upload.csv', 'Accio_Product_Upload_Box_Collections_FULL_IMAGES.csv'
];

function buildCategoryPages() {
    const allProducts = [];
    csvFiles.forEach(file => {
        if (!fs.existsSync(file)) return;
        const rows = parseCSV(fs.readFileSync(file, 'utf8'));
        rows.forEach(r => {
            const id = (r['Product ID'] || r['Product Code'] || '').trim();
            if (!id || id.length > 25 || id.includes(' ')) return;
            allProducts.push({
                id: id,
                name: r['Product Name'] || r['Product Name EN'] || r['Product Title'] || 'Custom Packaging',
                category: r['Main Category'] || r['Category'] || '',
                subcategory: r['Subcategory'] || r['Products Subcategory'] || r['Box Type'] || '',
                folder: resolveImageFolder(id),
                shortDesc: r['Short Description'] || r['Main Selling Point'] || ''
            });
        });
    });

    const categories = [
        { dir: 'products', slug: 'advent-calendar-boxes', name: 'Advent Calendar Boxes', h1: 'Custom Advent Calendar Boxes', filter: p => p.id.startsWith('AC-') || p.category.includes('Advent') },
        { dir: 'products/rigid-boxes', slug: 'drawer-gift-boxes', name: 'Drawer Gift Boxes', h1: 'Custom Drawer Gift Boxes', filter: p => p.id.startsWith('DR-') || p.subcategory.includes('Drawer') },
        { dir: 'products/rigid-boxes', slug: 'magnetic-gift-boxes', name: 'Magnetic Gift Boxes', h1: 'Custom Magnetic Gift Boxes', filter: p => p.id.startsWith('MG-') || p.subcategory.includes('Magnetic') }
        // Add more categories as needed or load from a config
    ];

    categories.forEach(cat => {
        const categoryDir = path.join(__dirname, cat.dir);
        ensureDir(categoryDir);
        const basePath = cat.dir.includes('/') ? '../../' : '../';
        const matched = allProducts.filter(cat.filter);

        let productsHtml = matched.map(p => {
            let prefix = 'ac';
            const idUpper = p.id.toUpperCase();
            if (idUpper.startsWith('IP-')) prefix = 'ip';
            else if (idUpper.startsWith('LM-')) prefix = 'lm';
            else if (idUpper.startsWith('RG-')) prefix = 'rg';
            else if (idUpper.startsWith('CFP-')) prefix = 'cfp';
            else if (idUpper.startsWith('MG-')) prefix = 'mg';
            else if (idUpper.startsWith('DR-')) prefix = 'dr';
            else if (idUpper.startsWith('RB-')) prefix = 'rb';

            const idLower = p.id.toLowerCase().replace(`${prefix}-`, '');
            const link = `${basePath}products/${prefix}-${idLower}.html`;
            const img = getProductImagePath(p.folder, basePath);

            return `
            <div class="bg-brandWhite border border-brandBeige p-6 flex flex-col luxury-shadow group">
                <div class="h-64 mb-4 flex items-center justify-center bg-white cursor-pointer overflow-hidden" onclick="location.href='${link}'">
                    <img src="${img}" alt="${escapeHtml(p.name)}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700">
                </div>
                <h3 class="font-serif font-bold text-lg mb-1">${escapeHtml(p.name)}</h3>
                <p class="text-[10px] text-brandGold font-bold uppercase tracking-widest mb-4">${idUpper}</p>
                <a href="${link}" class="text-[9px] font-bold text-brandBurgundy uppercase border-b border-brandBurgundy self-start">Details</a>
            </div>`;
        }).join('');

        let html = headTemplate(cat.name + " | ShineleeBox", cat.name, basePath) + headerTemplate(basePath);
        html += `
        <section class="bg-brandCharcoal text-brandIvory py-20 border-b border-brandGold/30 text-center">
            <h1 class="font-serif text-4xl sm:text-5xl font-bold">${cat.h1}</h1>
        </section>
        <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">${productsHtml}</div>
        </section>`;
        html += footerTemplate(basePath);
        fs.writeFileSync(path.join(categoryDir, `${cat.slug}.html`), html, 'utf8');
    });
}
buildCategoryPages();
console.log("Fixed category pages with robust CSV parsing.");
