const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'images', 'products');
const folders = fs.readdirSync(productsDir);
const emptyFolders = [];

folders.forEach(folder => {
    const folderPath = path.join(productsDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) return;
    
    const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    if (files.length === 0) {
        emptyFolders.push(folder);
    }
});

console.log(JSON.stringify(emptyFolders, null, 2));
