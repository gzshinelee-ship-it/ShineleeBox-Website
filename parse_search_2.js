const fs = require('fs');
const content = fs.readFileSync('/Users/shengli/.accio/accounts/1734048962/agents/MID-72048962U1778208-42DE2D-2406-451DC5/agent-core/tool-results/CID-72048962U1780823-42DE2D-0628-CBB488_sub_browser_d05f3524/web_fetch_8410ad17-34cd-4d81-a8a1-8adec31d69a7.txt', 'utf8');

const pages = content.split('Page\nURL: ');
console.log(`Found ${pages.length - 1} pages`);

for (let i = 1; i < pages.length; i++) {
    const lines = pages[i].split('\n');
    const url = lines[0];
    console.log(`\n==========================================\nURL: ${url}`);
    
    const regex = /\[([^\]]+)\]\((https:\/\/www\.alibaba\.com\/product-detail\/[^\)]+)\)/g;
    let match;
    let products = [];
    while ((match = regex.exec(pages[i])) !== null) {
        products.push({
            title: match[1],
            link: match[2],
            index: match.index
        });
    }
    
    console.log(`Found ${products.length} products`);
    products.forEach((p, idx) => {
        const contextStart = Math.max(0, p.index - 200);
        const contextEnd = Math.min(pages[i].length, p.index + 500);
        const context = pages[i].substring(contextStart, contextEnd);
        console.log(`${idx + 1}. Title: ${p.title}`);
        console.log(`   Link: ${p.link}`);
        
        const priceMatch = context.match(/(\$[\d\.\-]+|US\$\s*[\d\.\-]+)/i);
        const moqMatch = context.match(/(Min\.\s*Order|Min\.\s*order):\s*([\d\+\s]+(pieces|sets|piece|set|box|boxes))/i);
        
        console.log(`   Price: ${priceMatch ? priceMatch[0] : 'N/A'}`);
        console.log(`   MOQ: ${moqMatch ? moqMatch[2] : 'N/A'}`);
    });
}
