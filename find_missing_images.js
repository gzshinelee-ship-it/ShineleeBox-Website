const fs = require('fs');
const path = require('path');

const csvFiles = [
    'Accio_Product_Upload_First20.csv',
    'Accio_Interactive_Product_Upload.csv',
    'Accio_Life_Memory_Upload.csv',
    'Accio_Religious_Product_Upload.csv',
    'Accio_Greeting_Cards_Upload.csv',
    'Accio_Cosmetic_Perfume_Final.csv',
    'Accio_Chocolate_Food_Upload.csv',
    'Accio_Product_Upload_Box_Collections_FULL_IMAGES.csv'
];

const productsDir = path.join(__dirname, 'images', 'products');
const missing = [];

csvFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.slice(1).forEach(line => {
        const cols = line.split(',');
        if (cols.length < 2) return;
        const id = cols[0].replace(/"/g, '').trim();
        const name = cols[1].replace(/"/g, '').trim();
        
        if (!/^[A-Z]{2,3}-\d+$/.test(id)) return;
        
        const folders = fs.readdirSync(productsDir);
        const folder = folders.find(f => f.startsWith(id + '_') || f === id);
        
        let hasImage = false;
        if (folder) {
            const files = fs.readdirSync(path.join(productsDir, folder)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
            if (files.length > 0) hasImage = true;
        }
        
        if (!hasImage) {
            missing.push({ id, name });
        }
    });
});

console.log(JSON.stringify(missing, null, 2));
