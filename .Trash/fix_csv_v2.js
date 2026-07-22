const fs = require('fs');
const path = require('path');

const file = 'Accio_Chocolate_Food_Upload.csv';
const content = fs.readFileSync(file, 'utf8');
const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

const headers = [
    'Product ID', 'Product Code', 'Product Name', 'URL Slug', 
    'Products Directory', 'Applications Directory', 'Holiday & Occasions Directory', 
    'Application Tags', 'Holiday Tags', 'SEO Title', 'Meta Description', 
    'H1', 'Short Description', 'Description', 'Key Features', 
    'Best For', 'Custom Options', 'Manufacturing Support', 'CTA', 
    'Image Folder', 'Main Image', 'Video'
];

const fixedLines = [headers.join(',')];

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // We'll split by comma but since some are unquoted, we need to be smart.
    // The last 3 columns are Image Folder, Main Image, Video.
    // The first 4 are ID, Code, Name, Slug.
    const rawParts = line.split(',');
    
    const id = rawParts[0];
    const code = rawParts[1];
    // Product Name and Slug might contain commas if not careful, but usually don't.
    // Let's assume first 4 are safe for now.
    
    // Last 3 are definitely at the end.
    const video = rawParts[rawParts.length - 1];
    const mainImg = rawParts[rawParts.length - 2];
    const folder = rawParts[rawParts.length - 3];
    
    // Now we have a huge middle section from index 1 to rawParts.length - 4
    // Wait, let's look at the structure again.
    // 0:ID, 1:Code, 2:Name, 3:Slug ... 19:Folder, 20:Img, 21:Video
    
    // If folder is NOT starting with CFP- or CHOC-, it means the split was wrong.
    // In our case, the folder was "compartment layout".
    
    // Let's use a more reliable way: find the folder name in the string!
    const folderMatch = line.match(/CFP-[A-Z0-9-]{1,10}(?:_[a-z0-9-]+)?/i) || line.match(/CHOC-COL-\d+/);
    if (folderMatch) {
        const folderName = folderMatch[0];
        const folderIdx = line.lastIndexOf(folderName);
        
        // Parts before folder
        const beforeFolder = line.substring(0, folderIdx).trim();
        // Remove trailing comma
        const contentBefore = beforeFolder.endsWith(',') ? beforeFolder.slice(0, -1) : beforeFolder;
        
        // Parts after folder
        const afterFolder = line.substring(folderIdx + folderName.length).trim();
        // Split afterFolder (should be ,MainImage,Video)
        const afterParts = afterFolder.split(',').filter(p => p !== '');
        const mainImage = afterParts[0] || 'main.png';
        const videoFile = afterParts[1] || '';
        
        // Now split contentBefore by first few fixed columns
        // 0:ID, 1:Code, 2:Name, 3:Slug, 4:PDir, 5:AppDir, 6:HDir, 7:AppTags, 8:HTags, 9:STitle, 10:Meta, 11:H1, 12:Short, 13:Desc, 14:Features...
        
        const firstParts = contentBefore.split(',');
        // This is still risky.
        
        // Let's just wrap the whole middle section in one big quoted field or something?
        // No, we need specific columns.
        
        // BETTER: Re-save with proper quoting of everything.
        // I will just use the parts I found.
    }
    
    // Let's try another approach. We know the IDs.
    // I'll just manually fix the CFP-014, 015, 022 lines which I know are broken.
}

// Actually, I'll just update the build scripts to be tolerant.
// If Image Folder doesn't exist, call resolveImageFolder(id).
// This is much safer than trying to fix a broken CSV with code.

console.log('Skipping CSV fix, will fix via build script logic.');
