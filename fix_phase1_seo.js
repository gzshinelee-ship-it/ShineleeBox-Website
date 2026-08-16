const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'products');
let updated = 0;

for (const file of fs.readdirSync(productsDir).filter(name => name.endsWith('.html'))) {
    const filePath = path.join(productsDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const original = html;

    html = html.replace(/\s*\|\s*ShineleeBox\s*\|\s*ShineleeBox(?=<\/title>)/gi, ' | ShineleeBox');

    if (/^cfp-0(?:0[1-9]|1[0-2])\.html$/.test(file) && /printing and finishing by Guangzhou Shinelee Paper Product Co\./i.test(html)) {
        const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        if (h1Match) {
            const productName = h1Match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>[Wholesale] ${productName} | Custom Food Packaging Manufacturer | ShineleeBox</title>`);
        }
    }

    if (html !== original) {
        fs.writeFileSync(filePath, html);
        updated += 1;
    }
}

console.log(`Updated SEO titles in ${updated} product pages.`);
