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

const missingImages = [];

walkDir(__dirname, (filePath) => {
    if (filePath.endsWith('.html')) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(placeholder)) {
            // Find the product name or ID near the placeholder
            // This is just a simple regex to get context
            const regex = new RegExp('<div class="h-64[^>]*>[\\s\\S]*?<img src="' + placeholder.replace(/\//g, '\\/').replace(/\?/g, '\\?') + '[^>]*alt="([^"]*)"', 'g');
            let match;
            while ((match = regex.exec(content)) !== null) {
                missingImages.push({
                    file: path.relative(__dirname, filePath),
                    product: match[1]
                });
            }
        }
    }
});

if (missingImages.length > 0) {
    console.log('Found ' + missingImages.length + ' instances of missing images:');
    console.log(JSON.stringify(missingImages, null, 2));
} else {
    console.log('No missing images found using the placeholder URL.');
}
