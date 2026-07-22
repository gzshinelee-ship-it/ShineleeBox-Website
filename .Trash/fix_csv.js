const fs = require('fs');
const path = require('path');

const file = 'Accio_Chocolate_Food_Upload.csv';
if (!fs.existsSync(file)) {
    console.error('File not found');
    process.exit(1);
}

const content = fs.readFileSync(file, 'utf8');
const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

const fixedLines = lines.map((line, idx) => {
    if (idx === 0) return line; // Header
    if (!line.trim()) return line;
    
    // This is a specialized fixer for this specific CSV structure
    // We know the columns: Product ID, Product Code, Product Name, URL Slug, Products Directory, Applications Directory, Holiday & Occasions Directory, Application Tags, Holiday Tags, SEO Title, Meta Description, H1, Short Description, Description, Key Features, Best For, Custom Options, Manufacturing Support, CTA, Image Folder, Main Image, Video
    
    // We'll use a regex to identify the first few columns which are standard
    // and then wrap the text-heavy columns in quotes.
    
    const parts = [];
    let currentPart = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') inQuotes = !inQuotes;
        if (char === ',' && !inQuotes) {
            parts.push(currentPart);
            currentPart = '';
        } else {
            currentPart += char;
        }
    }
    parts.push(currentPart);
    
    // If the number of parts is wrong, it means there were unquoted commas
    // The expected number of columns is 21 (0 to 20)
    // Wait, let's count headers:
    // 1:Product ID, 2:Product Code, 3:Product Name, 4:URL Slug, 5:Products Directory, 6:Applications Directory, 7:Holiday & Occasions Directory, 8:Application Tags, 9:Holiday Tags, 10:SEO Title, 11:Meta Description, 12:H1, 13:Short Description, 14:Description, 15:Key Features, 16:Best For, 17:Custom Options, 18:Manufacturing Support, 19:CTA, 20:Image Folder, 21:Main Image, 22:Video
    // Total 22 columns.
    
    // For this specific CSV, we know the problematic columns are 11 (Meta Description) onwards.
    // However, it's easier to just reconstruct the line if we can identify the fixed parts at the beginning and end.
    
    // Product ID (0) is always there.
    // Image Folder (19), Main Image (20), Video (21) are at the end.
    
    const id = parts[0];
    const imageFolder = parts[parts.length - 3];
    const mainImage = parts[parts.length - 2];
    const video = parts[parts.length - 1];
    
    // If it's already mostly correct or we can identify the folder name at the end
    if (imageFolder.startsWith('CFP-') || imageFolder.includes('_')) {
        // Line might be okay, but let's re-quote anyway
        return parts.map(p => {
            if (p.includes(',') && !p.startsWith('"')) return `"${p.replace(/"/g, '""')}"`;
            return p;
        }).join(',');
    }
    
    return line; // Fallback
});

fs.writeFileSync(file, fixedLines.join('\n'), 'utf8');
console.log('Fixed CSV formatting for ' + file);
