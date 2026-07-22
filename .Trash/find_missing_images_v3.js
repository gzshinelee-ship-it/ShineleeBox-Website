const fs = require('fs');
const path = require('path');

const placeholder = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48';

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
            // Find data-id for cards that have the placeholder
            // Regex to find product cards with placeholder images
            const cardRegex = /<div[^>]*class="[^"]*product-card[^"]*"[^>]*data-id="([^"]*)"[^>]*>[\s\S]*?<img src="https:\/\/images\.unsplash\.com\/photo-1549465220-1a8b9238cd48/g;
            let match;
            while ((match = cardRegex.exec(content)) !== null) {
                missingProducts.add(match[1]);
            }
            
            // Also check for category pages that might have hardcoded placeholders
            const hardcodedRegex = /<img src="https:\/\/images\.unsplash\.com\/photo-1549465220-1a8b9238cd48[^>]*alt="([^"]*)"/g;
            while ((match = hardcodedRegex.exec(content)) !== null) {
                missingProducts.add(match[1]);
            }
        }
    }
});

console.log('Unique products with missing images:');
console.log(Array.from(missingProducts));
