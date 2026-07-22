const fs = require('fs');
const path = require('path');

const ids = ['CFP-014', 'CFP-015', 'CFP-022'];

ids.forEach(id => {
    const productsImagesDir = path.join(__dirname, 'images', 'products');
    const dirs = fs.readdirSync(productsImagesDir);
    const folderName = dirs.find(d => d.startsWith(id + '_') || d === id);
    console.log(`ID: ${id}, Folder: ${folderName}`);
    if (folderName) {
        const imageFolderPath = path.join(productsImagesDir, folderName);
        console.log(`Path: ${imageFolderPath}`);
        console.log(`Exists: ${fs.existsSync(imageFolderPath)}`);
        const dirFiles = fs.readdirSync(imageFolderPath);
        const imgFiles = dirFiles.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f)).sort();
        console.log(`Image files found: ${imgFiles.length}`);
        console.log(`First image: ${imgFiles[0]}`);
    }
});
