const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const productAssignments = {
  'rb-001': ['products/rigid-boxes/round-gift-boxes.html', 'applications/chocolate-and-food-packaging.html', 'applications/religious-and-cultural-gift-packaging.html'],
  'rb-002': ['products/rigid-boxes/lid-and-base-boxes.html', 'applications/chocolate-and-food-packaging.html', 'holiday-occasions/christmas-packaging.html'],
  // The user's second RB-002 entry is RB-003: this product is the perfume drawer box.
  'rb-003': ['products/rigid-boxes/drawer-gift-boxes.html', 'applications/beauty-perfume-personal-care-packaging.html'],
  'rb-004': ['products/rigid-boxes/magnetic-gift-boxes.html', 'applications/chocolate-and-food-packaging.html', 'holiday-occasions/ramadan-and-eid-packaging.html'],
  'rb-005': ['products/rigid-boxes/drawer-gift-boxes.html', 'applications/jewelry-and-accessories-packaging.html'],
  'rb-006': ['products/rigid-boxes/foldable-rigid-boxes.html', 'applications/corporate-and-retail-packaging.html', 'holiday-occasions/valentines-day-packaging.html'],
  'rb-007': ['products/rigid-boxes/custom-shape-boxes.html', 'applications/beauty-perfume-personal-care-packaging.html', 'holiday-occasions/christmas-packaging.html'],
  'rb-008': ['products/rigid-boxes/custom-shape-boxes.html', 'applications/chocolate-and-food-packaging.html'],
  'rb-009': ['products/rigid-boxes/lid-and-base-boxes.html'],
  'rb-010': ['products/rigid-boxes/custom-shape-boxes.html', 'applications/beauty-perfume-personal-care-packaging.html'],
  'sc-001': ['products/rigid-boxes/suitcase-gift-boxes.html', 'applications/wine-liquor-packaging.html'],
  'sc-002': ['products/rigid-boxes/suitcase-gift-boxes.html', 'applications/wine-liquor-packaging.html'],
  'dr-003': ['products/rigid-boxes/drawer-gift-boxes.html', 'applications/beauty-perfume-personal-care-packaging.html'],
  'dr-004': ['products/rigid-boxes/drawer-gift-boxes.html', 'applications/beauty-perfume-personal-care-packaging.html'],
  'lm-002': ['products/interactive-packaging.html', 'holiday-occasions/wedding-and-anniversary-packaging.html'],
  'mg-004': ['products/rigid-boxes/magnetic-gift-boxes.html', 'applications/beauty-perfume-personal-care-packaging.html'],
  'ip-007': ['products/advent-calendar-boxes.html', 'applications/beauty-perfume-personal-care-packaging.html', 'products/interactive-packaging.html']
};

const categoryFiles = [
  ...fs.readdirSync(path.join(ROOT, 'applications')).filter(f => f.endsWith('.html')).map(f => `applications/${f}`),
  ...fs.readdirSync(path.join(ROOT, 'holiday-occasions')).filter(f => f.endsWith('.html')).map(f => `holiday-occasions/${f}`),
  ...fs.readdirSync(path.join(ROOT, 'products/rigid-boxes')).filter(f => f.endsWith('.html')).map(f => `products/rigid-boxes/${f}`),
  'products/advent-calendar-boxes.html',
  'products/interactive-packaging.html'
].filter(f => fs.existsSync(path.join(ROOT, f)));

function matchingClose(html, start, tag) {
  const token = new RegExp(`<${tag}\\b|<\\/${tag}>`, 'gi');
  token.lastIndex = start;
  let depth = 0;
  for (let m; (m = token.exec(html));) {
    if (m[0][1] === '/') depth--;
    else depth++;
    if (depth === 0) return token.lastIndex;
  }
  throw new Error(`Unclosed <${tag}> at ${start}`);
}

function removeProductCards(html, id) {
  const needle = `products/${id}.html`;
  let cursor = 0;
  while (true) {
    const hit = html.indexOf(needle, cursor);
    if (hit < 0) break;
    const candidates = [];
    const articleStart = html.lastIndexOf('<article', hit);
    if (articleStart >= 0) {
      const articleEnd = matchingClose(html, articleStart, 'article');
      const articleOpen = html.slice(articleStart, html.indexOf('>', articleStart) + 1);
      if (articleEnd > hit && /luxury-shadow\s+group/.test(articleOpen)) candidates.push({ start: articleStart, end: articleEnd });
    }
    for (const span of divSpans(html)) {
      if (span.start < hit && span.end > hit && /bg-brandWhite[^>]*luxury-shadow\s+group/.test(span.open)) candidates.push(span);
    }
    if (!candidates.length) { cursor = hit + needle.length; continue; }
    candidates.sort((a, b) => (a.end - a.start) - (b.end - b.start));
    const block = candidates[0];
    html = html.slice(0, block.start) + html.slice(block.end).replace(/^\s*\n?/, '\n');
    cursor = Math.max(0, block.start - 1);
  }
  return html;
}

function productMeta(id) {
  const file = path.join(ROOT, 'products', `${id}.html`);
  const html = fs.readFileSync(file, 'utf8');
  const code = id.toUpperCase();
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
    ?.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]
    ?.replace(/^\[Wholesale\]\s*/i, '').replace(/\s*\|\s*ShineleeBox.*$/i, '').trim();
  const name = h1 || title || code;
  const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] || `Custom ${name} manufactured by ShineleeBox.`;
  const image = html.match(/<img[^>]+src="\.\.\/images\/products\/([^"]+)"/i)?.[1];
  if (!image) throw new Error(`No product image found for ${id}`);
  return { id, code, name, description, image };
}

function escapeHtml(value) {
  return value.replace(/&(?!(?:amp|lt|gt|quot|#39);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function baseFor(file) {
  return file.startsWith('products/rigid-boxes/') ? '../../' : '../';
}

function cardFor(file, p) {
  const base = baseFor(file);
  const link = `${base}products/${p.id}.html`;
  const img = `${base}images/products/${p.image}`;
  if (file.startsWith('products/rigid-boxes/') || file === 'products/advent-calendar-boxes.html' || file === 'products/interactive-packaging.html') {
    return `\n            <div class="bg-brandWhite border border-brandBeige p-6 flex flex-col luxury-shadow group">\n                <div class="h-64 mb-4 flex items-center justify-center bg-white cursor-pointer overflow-hidden" onclick="location.href='${link}'">\n                    <img src="${img}" alt="${escapeHtml(p.name)}" loading="lazy" decoding="async" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700">\n                </div>\n                <h3 class="font-serif font-bold text-lg mb-1">${escapeHtml(p.name)}</h3>\n                <p class="text-[10px] text-brandGold font-bold uppercase tracking-widest mb-4">${p.code}</p>\n                <a href="${link}" class="text-[9px] font-bold text-brandBurgundy uppercase border-b border-brandBurgundy self-start">Details</a>\n            </div>`;
  }
  return `\n        <article class="bg-brandWhite border border-brandBeige p-5 flex flex-col luxury-shadow group">\n            <a href="${link}" class="block h-56 bg-white overflow-hidden mb-5" aria-label="View ${escapeHtml(p.name)}">\n                <img src="${img}" alt="${escapeHtml(p.name)}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500">\n            </a>\n            <p class="text-[10px] text-brandGold font-bold uppercase tracking-[0.18em] mb-2">${p.code}</p>\n            <h2 class="font-serif text-xl font-bold leading-snug mb-3">${escapeHtml(p.name)}</h2>\n            <p class="text-sm text-brandCharcoal/65 leading-relaxed mb-5 line-clamp-3">${escapeHtml(p.description)}</p>\n            <a href="${link}" class="mt-auto text-[10px] font-bold uppercase tracking-widest text-brandBurgundy">View product →</a>\n        </article>`;
}

function divSpans(html) {
  const token = /<div\b[^>]*>|<\/div>/gi;
  const stack = [], spans = [];
  for (let m; (m = token.exec(html));) {
    if (m[0][1] !== '/') stack.push({ start: m.index, openEnd: token.lastIndex, open: m[0] });
    else {
      const item = stack.pop();
      if (item) spans.push({ ...item, closeStart: m.index, end: token.lastIndex });
    }
  }
  return spans;
}

function insertCard(html, file, card) {
  const mainStart = html.indexOf('<main');
  const spans = divSpans(html).filter(s => s.start > mainStart && /class="[^"]*grid grid-cols-1/.test(s.open));
  const productGrids = spans.filter(s => /(?:\.\.\/)+products\/[a-z0-9-]+\.html/i.test(html.slice(s.openEnd, s.closeStart)));
  if (!productGrids.length) throw new Error(`No product grid found in ${file}`);
  productGrids.sort((a, b) => a.start - b.start);
  const grid = productGrids[0];
  return html.slice(0, grid.closeStart) + card + '\n            ' + html.slice(grid.closeStart);
}

// Remove each explicitly reassigned product from every catalog page, then add it only to the requested pages.
for (const file of categoryFiles) {
  const full = path.join(ROOT, file);
  let html = fs.readFileSync(full, 'utf8');
  for (const id of Object.keys(productAssignments)) html = removeProductCards(html, id);
  fs.writeFileSync(full, html);
}

// Explicit wedding cleanup requested independently of the new assignments.
const weddingPath = path.join(ROOT, 'holiday-occasions/wedding-and-anniversary-packaging.html');
let weddingHtml = fs.readFileSync(weddingPath, 'utf8');
for (const id of ['dr-004', 'dr-005', 'dr-006']) weddingHtml = removeProductCards(weddingHtml, id);
fs.writeFileSync(weddingPath, weddingHtml);

for (const [id, targets] of Object.entries(productAssignments)) {
  const p = productMeta(id);
  for (const file of targets) {
    const full = path.join(ROOT, file);
    let html = fs.readFileSync(full, 'utf8');
    if (!html.includes(`products/${id}.html`)) html = insertCard(html, file, cardFor(file, p));
    fs.writeFileSync(full, html);
  }
}

// Move chocolate products and handled/suitcase products out of Jewelry without duplicating them.
const jewelryFile = 'applications/jewelry-and-accessories-packaging.html';
let jewelry = fs.readFileSync(path.join(ROOT, jewelryFile), 'utf8');
const jewelryArticleRe = /<article\b[^>]*luxury-shadow group[^>]*>[\s\S]*?<\/article>/gi;
const jewelryCards = jewelry.match(jewelryArticleRe) || [];
for (const block of jewelryCards) {
  const id = block.match(/products\/([a-z0-9-]+)\.html/i)?.[1]?.toLowerCase();
  if (!id) continue;
  const text = block.replace(/<[^>]+>/g, ' ').toLowerCase();
  let target = null;
  if (/chocolate|food|date gift|candy|confection/.test(text)) target = 'applications/chocolate-and-food-packaging.html';
  else if (/suitcase|handle|handled|carry case/.test(text) || id.startsWith('sc-')) target = 'products/rigid-boxes/suitcase-gift-boxes.html';
  if (!target) continue;
  jewelry = removeProductCards(jewelry, id);
  const targetPath = path.join(ROOT, target);
  let targetHtml = fs.readFileSync(targetPath, 'utf8');
  if (!targetHtml.includes(`products/${id}.html`)) targetHtml = insertCard(targetHtml, target, cardFor(target, productMeta(id)));
  fs.writeFileSync(targetPath, targetHtml);
}
fs.writeFileSync(path.join(ROOT, jewelryFile), jewelry);

// Retire the electronics category everywhere: page, menus, hub card, sitemap, and generator references.
const retired = ['electronics', 'and', 'premium', 'gift', 'packaging.html'].join('-');
for (const file of fs.readdirSync(ROOT, { recursive: true })) {
  if (typeof file !== 'string' || !/\.(?:html|js|xml)$/.test(file)) continue;
  const full = path.join(ROOT, file);
  if (!fs.statSync(full).isFile() || file === `applications/${retired}` || file === 'reclassify_product_categories.js') continue;
  let html = fs.readFileSync(full, 'utf8');
  if (!html.includes(retired)) continue;
  html = html
    .replace(/\s*<a\b[^>]*href="[^"]*electronics-and-premium-gift-packaging\.html"[^>]*>[\s\S]*?<\/a>\s*/gi, '\n')
    .replace(/\s*<li>\s*<a\b[^>]*electronics-and-premium-gift-packaging\.html[^>]*>[\s\S]*?<\/a>\s*<\/li>\s*/gi, '\n')
    .replace(/\s*<url>\s*<loc>https:\/\/slpack\.net\/applications\/electronics-and-premium-gift-packaging\.html<\/loc>[\s\S]*?<\/url>\s*/gi, '\n')
    .replace(/^.*electronics-and-premium-gift-packaging.*\n?/gmi, '');
  fs.writeFileSync(full, html);
}
const retiredPage = path.join(ROOT, 'applications', retired);
if (fs.existsSync(retiredPage)) fs.rmSync(retiredPage);

console.log(`Reclassified ${Object.keys(productAssignments).length} products and retired the electronics category.`);
