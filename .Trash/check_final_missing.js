const fs = require('fs');
const path = require('path');

const placeholder = 'https://sc04.alicdn.com/kf/Ab4e81abe62284910abf050838dc1bd50N.jpg';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory && !f.startsWith('.') && f !== 'node_modules') {
            walkDir(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

const missingProducts = new Set();

walkDir(__dirname, (filePath) => {
    if (filePath.endsWith('.html')) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(placeholder)) {
            const cardRegex = /data-id="([^"]*)"[^>]*>[\s\S]*?<img src="https:\/\/sc04\.alicdn\.com\/kf\/Ab4e81abe62284910abf050838dc1bd50N\.jpg/g;
            let match;
            while ((match = cardRegex.exec(content)) !== null) {
                missingProducts.add(match[1]);
            }
        }
    }
});

console.log('Unique products TRULY missing images (using high-quality placeholder):');
console.log(Array.from(missingProducts));
