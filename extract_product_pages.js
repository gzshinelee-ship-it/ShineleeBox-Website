const fs = require('fs');
const path = require('path');

const gcFiles = ['gc-001.html', 'gc-002.html', 'gc-003.html', 'gc-004.html', 'gc-005.html', 'gc-006.html'];

gcFiles.forEach(file => {
    const filePath = path.join('products', file);
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract Title
    const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/) || content.match(/<title[^>]*>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].trim() : 'N/A';
    
    // Extract Images
    const imgRegex = /src="([^"]+)"/g;
    let match;
    let images = [];
    while ((match = imgRegex.exec(content)) !== null) {
        if (match[1].startsWith('http') || match[1].includes('sc04.alicdn.com') || match[1].includes('cbu01.alicdn.com')) {
            images.push(match[1]);
        }
    }
    
    // Extract Price and MOQ
    const priceMatch = content.match(/Price Range:<\/strong> ([^<]+)/) || content.match(/Price: ([^<]+)/);
    const moqMatch = content.match(/MOQ:<\/strong> ([^<]+)/) || content.match(/Min\. Order: ([^<]+)/);
    
    console.log(`\n================= ${file} =================`);
    console.log(`Title: ${title}`);
    console.log(`Price: ${priceMatch ? priceMatch[1] : 'N/A'}`);
    console.log(`MOQ: ${moqMatch ? moqMatch[1] : 'N/A'}`);
    console.log(`Images (${images.length}):`, images.slice(0, 5));
});
