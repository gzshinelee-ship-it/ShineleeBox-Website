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
    const headers = [];
    let cell = '';
    inQuotes = false;
    for (let j = 0; j < headerRow.length; j++) {
        const char = headerRow[j];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
            headers.push(cell.trim());
            cell = '';
        } else cell += char;
    }
    headers.push(cell.trim());
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
                const colName = headers[headerIndex];
                if (colName) record[colName] = cellContent.trim();
                cellContent = '';
                headerIndex++;
            } else cellContent += char;
        }
        const lastColName = headers[headerIndex];
        if (lastColName) record[lastColName] = cellContent.trim();
        records.push(record);
    }
    return records;
}

function resolveImageFolder(id) {
    const productsImagesDir = path.join(__dirname, 'images', 'products');
    if (!fs.existsSync(productsImagesDir)) return 'DIR_NOT_FOUND';
    const dirs = fs.readdirSync(productsImagesDir);
    const matched = dirs.find(d => d.startsWith(id + '_') || d === id);
    return matched || 'NOT_MATCHED';
}

const file = 'Accio_Chocolate_Food_Upload.csv';
const content = fs.readFileSync(file, 'utf8');
const rows = parseCSV(content);

const targets = ['CFP-014', 'CFP-015', 'CFP-022'];

rows.forEach(r => {
    const id = r['Product ID'] || r['Product ID '];
    if (targets.includes(id)) {
        console.log(`Checking target: ${id}`);
        console.log(`CSV Folder Value: [${r['Image Folder']}]`);
        const resolved = resolveImageFolder(id);
        console.log(`Resolved Folder: [${resolved}]`);
        
        const folderName = r['Image Folder'] || resolved;
        if (folderName && folderName !== 'NOT_MATCHED') {
            const imageFolderPath = path.join(__dirname, 'images', 'products', folderName);
            console.log(`Full Path: ${imageFolderPath}`);
            console.log(`Exists: ${fs.existsSync(imageFolderPath)}`);
            if (fs.existsSync(imageFolderPath)) {
                const imgFiles = fs.readdirSync(imageFolderPath).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f)).sort();
                console.log(`Files found: ${imgFiles.length}`);
                console.log(`Img path: ../images/products/${folderName}/${imgFiles[0]}`);
            }
        }
    }
});
