const fs = require('fs');
const path = require('path');

const root = __dirname;
const ignored = new Set(['.git', '.Trash', 'structure_update', 'temp_blog_upload', 'temp_blog_upload_new', 'temp_seo_rebuild']);
const productPattern = /^(ac(?:-mb|-slf)?|cfp(?:-ai)?|choc(?:-col)?|cp|cs|dr|gc|ip|lm|mb|mg|pp|rb|rg|sc)-[a-z0-9-]+\.html$/i;
const productCategories = {
  ac: 'Advent Calendar Boxes',
  'ac-mb': 'Music Advent Calendar Boxes',
  'ac-slf': 'Special-Shaped Advent Calendar Boxes',
  cfp: 'Custom Food Packaging',
  'cfp-ai': 'Custom Food Packaging',
  choc: 'Chocolate Packaging',
  'choc-col': 'Chocolate Packaging',
  cp: 'Custom Packaging',
  cs: 'Custom-Shaped Boxes',
  dr: 'Drawer Gift Boxes',
  gc: 'Greeting Cards',
  ip: 'Interactive Packaging',
  lm: 'Luxury Mailing Boxes',
  mb: 'Magnetic Gift Boxes',
  mg: 'Magnetic Gift Boxes',
  pp: 'Premium Paper Packaging',
  rb: 'Rigid Gift Boxes',
  rg: 'Rigid Gift Boxes',
  sc: 'Suitcase Gift Boxes',
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function cleanText(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function titleCaseSlug(value) {
  return value.replace(/\.html$/, '').replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function pageName(html, relativePath) {
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  if (h1) return cleanText(h1);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  if (title) return cleanText(title).replace(/^\[Wholesale\]\s*/i, '').split('|')[0].trim();
  return titleCaseSlug(path.basename(relativePath));
}

function canonicalFromHtml(html) {
  return html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
}

function breadcrumbItems(relativePath, name, canonical) {
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://slpack.net/' }];
  const segments = relativePath.split('/');

  if (segments[0] === 'products') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Products', item: 'https://slpack.net/products/' });
    if (segments[1] === 'rigid-boxes' && segments.length > 2) {
      items.push({ '@type': 'ListItem', position: 3, name: 'Rigid Gift Boxes', item: 'https://slpack.net/products/rigid-boxes.html' });
    }
  } else if (segments[0] === 'applications') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Applications', item: 'https://slpack.net/applications/' });
  } else if (segments[0] === 'holiday-occasions') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Holiday & Occasions', item: 'https://slpack.net/holiday-occasions/' });
  } else if (segments[0] === 'blog') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Packaging Insights', item: 'https://slpack.net/blog/' });
  }

  const alreadyCurrent = items.some((item) => item.item === canonical);
  if (!alreadyCurrent) items.push({ '@type': 'ListItem', position: items.length + 1, name, item: canonical });
  return items;
}

let productCount = 0;
let breadcrumbCount = 0;

for (const file of walk(root).filter((item) => item.endsWith('.html'))) {
  const relativePath = path.relative(root, file).split(path.sep).join('/');
  if (relativePath === 'index.html' || relativePath.startsWith('google')) continue;

  let html = fs.readFileSync(file, 'utf8');
  if (/data-phase2-schema=["']true["']/i.test(html)) continue;

  const canonical = canonicalFromHtml(html);
  if (!canonical) continue;
  const name = pageName(html, relativePath);
  const graph = [{
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: breadcrumbItems(relativePath, name, canonical),
  }];
  breadcrumbCount += 1;

  const basename = path.basename(relativePath);
  if (relativePath.startsWith('products/') && productPattern.test(basename)) {
    const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] || '';
    const mainHtml = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || html;
    const imageSrc = mainHtml.match(/<img\b[^>]*\ssrc=["']([^"']+)["']/i)?.[1];
    const sku = basename.replace(/\.html$/, '').toUpperCase();
    const prefix = sku.toLowerCase().replace(/-\d.*$/, '');
    const product = {
      '@type': 'Product',
      '@id': `${canonical}#product`,
      name,
      description: cleanText(description),
      sku,
      url: canonical,
      category: productCategories[prefix] || 'Custom Paper Packaging',
      brand: { '@type': 'Brand', name: 'ShineleeBox' },
      manufacturer: { '@id': 'https://slpack.net/#organization' },
    };
    if (imageSrc) product.image = [new URL(imageSrc, canonical).href];
    graph.push(product);
    productCount += 1;
  }

  const jsonLd = `    <script type="application/ld+json" data-phase2-schema="true">\n${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).split('\n').map((line) => `    ${line}`).join('\n')}\n    </script>\n`;
  html = html.replace('</head>', `${jsonLd}</head>`);
  fs.writeFileSync(file, html);
}

console.log(`Added BreadcrumbList data to ${breadcrumbCount} pages.`);
console.log(`Added Product data to ${productCount} product pages.`);
