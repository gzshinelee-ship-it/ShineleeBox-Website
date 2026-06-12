const fs = require('fs');
const path = require('path');

const gcFiles = ['gc-001.html', 'gc-002.html', 'gc-003.html', 'gc-004.html', 'gc-005.html', 'gc-006.html'];
let results = [];

gcFiles.forEach(file => {
    const filePath = path.join('products', file);
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract Title
    const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/);
    let title = titleMatch ? titleMatch[1].trim() : 'N/A';
    title = title.split(' | ')[0]; // remove branding
    
    // Extract Images
    const imgRegex = /src="(\.\.\/images\/products\/[^"]+)"/g;
    let match;
    let images = [];
    while ((match = imgRegex.exec(content)) !== null) {
        const fullUrl = 'https://www.slpack.net/' + match[1].replace('../', '');
        if (!images.includes(fullUrl)) {
            images.push(fullUrl);
        }
    }
    
    // Extract Key Features / Selling Points
    // Often inside: <h4 class="font-bold text-brandGreen font-serif mb-2 text-base">...</h4>
    // followed by <p class="text-slate-600 text-xs leading-relaxed">...</p>
    const featureRegex = /<h4 class="font-bold text-brandGreen font-serif mb-2 text-base">([^<]+)<\/h4>\s*<p class="text-slate-600 text-xs leading-relaxed">([^<]+)<\/p>/g;
    let features = [];
    while ((match = featureRegex.exec(content)) !== null) {
        features.push(`${match[1].trim()}: ${match[2].trim()}`);
    }
    
    const sellPoint = features.join('; ') || 'Premium 3D pop-up structural visual effect; Handmade premium craft paper; Precision laser-cut detailing; Comes with envelope';

    // Pricing and MOQ
    let price = "$1.68 - $3.80";
    let moq = "50 pieces";
    if (file === 'gc-001.html') { price = "$2.35 - $2.42"; moq = "300 pieces"; }
    else if (file === 'gc-002.html') { price = "$1.29"; moq = "50 pieces"; }
    else if (file === 'gc-003.html') { price = "$1.66 - $1.70"; moq = "500 pieces"; }
    else if (file === 'gc-004.html') { price = "$3.69"; moq = "2 pieces"; }
    else if (file === 'gc-005.html') { price = "$3.69"; moq = "2 pieces"; }
    else if (file === 'gc-006.html') { price = "$1.14"; moq = "200 pieces"; }

    results.push({
        id: file.replace('.html', '').toUpperCase(),
        title,
        images: images.slice(0, 5).join('; '),
        selling_points: sellPoint,
        price,
        moq
    });
});

console.log(JSON.stringify(results, null, 2));
