const fs = require('fs');
const path = require('path');

const replacements = [
    [/products\/slf-(\d+)\.html/g, 'products/ac-slf-$1.html'],
    [/products\/ac-sc-(\d+)\.html/g, 'products/sc-$1.html'],
    [/products\/ac-choc-col-(\d+)\.html/g, 'products/choc-col-$1.html'],
    [/products\/ac-cp-(\d+)\.html/g, 'products/cp-$1.html']
];

const targets = [
    'products/rigid-boxes.html',
    'products/rigid-boxes/suitcase-gift-boxes.html',
    'holiday-occasions/christmas-packaging.html',
    'holiday-occasions/ramadan-and-eid-packaging.html'
];

let updated = 0;
for (const relativeFile of targets) {
    const file = path.join(__dirname, relativeFile);
    let html = fs.readFileSync(file, 'utf8');
    const original = html;
    replacements.forEach(([pattern, replacement]) => { html = html.replace(pattern, replacement); });
    if (html !== original) {
        fs.writeFileSync(file, html);
        updated += 1;
    }
}

console.log(`Corrected product links in ${updated} category pages.`);
