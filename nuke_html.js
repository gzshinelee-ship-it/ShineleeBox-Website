const fs = require('fs');
const path = require('path');

function cleanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            // Skip index.html in subdirectories if needed, but here we want a clean slate
            fs.unlinkSync(filePath);
            console.log(`Deleted: ${filePath}`);
        }
    });
}

const baseDir = '/Users/shengli/.accio/accounts/1734048962/agents/DID-F456DA-08F456DAU1776909-4180-84FD15/project';
const dirsToClean = [
    path.join(baseDir, 'products'),
    path.join(baseDir, 'products', 'rigid-boxes'),
    path.join(baseDir, 'applications'),
    path.join(baseDir, 'holiday-occasions'),
    path.join(baseDir, 'blog')
];

dirsToClean.forEach(cleanDir);

// Root files
['index.html', 'about.html', 'contact.html', 'sitemap.xml'].forEach(file => {
    const filePath = path.join(baseDir, file);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${filePath}`);
    }
});
