const fs = require('fs');
const content = fs.readFileSync('products/gc-001.html', 'utf8');
const imgMatches = content.match(/<img[^>]+src="([^"]+)"/g) || [];
console.log('Image tags:', imgMatches);
