const fs = require('fs');

const file1 = '/Users/shengli/.accio/accounts/1734048962/agents/MID-72048962U1778208-42DE2D-2406-451DC5/agent-core/tool-results/CID-72048962U1780823-42DE2D-0628-CBB488_sub_browser_d05f3524/web_fetch_fcc1034a-b4e5-4470-98b7-1993db539838.txt';
const file2 = '/Users/shengli/.accio/accounts/1734048962/agents/MID-72048962U1778208-42DE2D-2406-451DC5/agent-core/tool-results/CID-72048962U1780823-42DE2D-0628-CBB488_sub_browser_d05f3524/web_fetch_8410ad17-34cd-4d81-a8a1-8adec31d69a7.txt';

[file1, file2].forEach(file => {
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');
    const imagesSection = content.split('Images:\n')[1] || '';
    const images = imagesSection.split('\n- ').map(img => img.trim()).filter(Boolean);
    console.log(`\nImages in ${file.split('/').pop()}:`);
    console.log(images.slice(0, 15));
});
