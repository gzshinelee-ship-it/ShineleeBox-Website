const fs = require('fs');
const path = require('path');

const root = __dirname;
const ignored = new Set(['.git', '.Trash', 'structure_update', 'temp_blog_upload', 'temp_blog_upload_new', 'temp_seo_rebuild']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function canonicalFor(relativePath) {
  if (relativePath === 'index.html') return 'https://slpack.net/';
  if (relativePath.endsWith('/index.html')) {
    return `https://slpack.net/${relativePath.slice(0, -'index.html'.length)}`;
  }
  return `https://slpack.net/${relativePath}`;
}

let canonicalCount = 0;
let descriptionCount = 0;
let h1Count = 0;

for (const file of walk(root).filter((item) => item.endsWith('.html'))) {
  const relativePath = path.relative(root, file).split(path.sep).join('/');
  if (relativePath.startsWith('google') && relativePath.endsWith('.html')) continue;

  let html = fs.readFileSync(file, 'utf8');

  if (!/rel=["']canonical["']/i.test(html)) {
    const canonical = `    <link rel="canonical" href="${canonicalFor(relativePath)}">`;
    if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
      html = html.replace(/(<meta\s+name=["']description["'][^>]*>)/i, `$1\n${canonical}`);
      canonicalCount += 1;
    }
  }

  if (/<meta\s+name=["']description["']\s+content=["']Ltd\.["']\s*\/?>/i.test(html)) {
    const rawTitle = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || 'Custom Packaging';
    const productName = rawTitle
      .replace(/^\[Wholesale\]\s*/i, '')
      .replace(/\s*\|\s*ShineleeBox\s*$/i, '')
      .replace(/\s*\|\s*Custom Food Packaging Manufacturer\s*$/i, '')
      .trim();
    const description = `${productName}. Custom size, structure, printing and finishing with factory-direct project support and MOQ from 50 pieces.`;
    html = html.replace(/<meta\s+name=["']description["']\s+content=["']Ltd\.["']\s*\/?>/i, `<meta name="description" content="${description}">`);
    descriptionCount += 1;
  }

  const proseStart = html.indexOf('<div class="prose');
  if (proseStart >= 0) {
    const before = html.slice(0, proseStart);
    let prose = html.slice(proseStart);
    if (/<h1\b/i.test(prose)) {
      prose = prose.replace(/<h1\b/i, '<h2').replace(/<\/h1>/i, '</h2>');
      html = before + prose;
      h1Count += 1;
    }
  }

  fs.writeFileSync(file, html);
}

console.log(`Added ${canonicalCount} canonical URLs.`);
console.log(`Repaired ${descriptionCount} truncated descriptions.`);
console.log(`Corrected ${h1Count} duplicate article H1 headings.`);
