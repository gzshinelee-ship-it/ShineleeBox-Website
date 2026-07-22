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
    const headers = headerRow.split(',').map(h => h.replace(/^"|"$/g, '').trim());

    const records = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        const record = {};
        let cellContent = '';
        inQuotes = false;
        let headerIndex = 0;
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) {
                record[headers[headerIndex]] = cellContent.replace(/^"|"$/g, '').trim();
                cellContent = '';
                headerIndex++;
            } else cellContent += char;
        }
        record[headers[headerIndex]] = cellContent.replace(/^"|"$/g, '').trim();
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

const productsImagesDir = path.join(__dirname, 'images', 'products');
const imageFolders = fs.existsSync(productsImagesDir) ? fs.readdirSync(productsImagesDir) : [];

const missingFolder = [];

csvFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');
    const products = parseCSV(content);

    products.forEach(p => {
        let id = (p['Product ID'] || p['Product ID '] || p['Product ID EN'] || '').trim();
        if (!id) return;
        
        const realIdPattern = /^[A-Z]{2,3}-\d+$/;
        if (!realIdPattern.test(id)) return;

        const matched = imageFolders.find(d => d.startsWith(id + '_') || d === id);
        if (!matched) {
            missingFolder.push({ id, name: p['Product Name'] || p['Product Name EN'] || '', file });
        }
    });
});

console.log(JSON.stringify(missingFolder, null, 2));
