const fs = require('fs');
const path = require('path');

function parseCSV(content) {
    content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = [];
    let currentLine = '';
    let inQuotes = false;
    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        if (char === '"') inQuotes = !inQuotes;
        if (char === '\n' && !inQuotes) {
            lines.push(currentLine);
            currentLine = '';
        } else {
            currentLine += char;
        }
    }
    if (currentLine) lines.push(currentLine);
    if (lines.length === 0) return [];
    const headerRow = lines[0].replace(/^\uFEFF/, '').trim();
    const headers = headerRow.split(',').map(h => h.replace(/"/g, '').trim());
    const records = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        const record = {};
        let cell = '';
        inQuotes = false;
        let hIdx = 0;
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) {
                record[headers[hIdx]] = cell.trim().replace(/^"|"$/g, '');
                cell = '';
                hIdx++;
            } else cell += char;
        }
        record[headers[hIdx]] = cell.trim().replace(/^"|"$/g, '');
        records.push(record);
    }
    return records;
}

const csvFiles = [
    'Accio_Product_Upload_First20.csv',
    'Accio_Interactive_Product_Upload.csv',
    'Accio_Life_Memory_Upload.csv',
    'Accio_Religious_Product_Upload.csv',
    'Accio_Greeting_Cards_Upload.csv',
    'Accio_Cosmetic_Perfume_Final.csv',
    'Accio_Chocolate_Food_Upload.csv',
    'Accio_Product_Upload_Box_Collections_FULL_IMAGES.csv'
];

const missing = [];

csvFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    const rows = parseCSV(fs.readFileSync(file, 'utf8'));
    rows.forEach(r => {
        const id = r['Product ID'] || r['Product ID '];
        if (!id) return;
        const folderName = r['Image Folder'];
        let hasImage = false;
        if (folderName) {
            const folderPath = path.join(__dirname, 'images', 'products', folderName);
            if (fs.existsSync(folderPath)) {
                const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
                if (files.length > 0) hasImage = true;
            }
        }
        
        // If no explicit folder or folder empty, try to resolve by ID
        if (!hasImage) {
            const dirs = fs.readdirSync(path.join(__dirname, 'images', 'products'));
            const matched = dirs.find(d => d.startsWith(id + '_') || d === id);
            if (matched) {
                const folderPath = path.join(__dirname, 'images', 'products', matched);
                const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
                if (files.length > 0) hasImage = true;
            }
        }

        if (!hasImage) {
            missing.push({ id, file });
        }
    });
});

console.log(JSON.stringify(missing, null, 2));
