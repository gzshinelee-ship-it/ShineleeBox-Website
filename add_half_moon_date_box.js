const fs = require('fs');

const id = 'CS-007';
const slug = 'custom-half-moon-round-date-gift-box';
const name = 'Custom Half-Moon Round Date Gift Box with Radial Compartments';
const shortName = 'Half-Moon Round Date Gift Box';
const description = 'Custom half-moon round date gift box with a sliding reveal lid, radial paperboard compartments, rigid greyboard construction and premium branded finishes for Ramadan and Eid gifting.';
const productUrl = `https://slpack.net/products/${slug}.html`;
const imagePath = '../images/products/CS-007_half-moon-date-gift-box/main.jpg';
const imageUrl = 'https://slpack.net/images/products/CS-007_half-moon-date-gift-box/main.jpg';
const template = fs.readFileSync('products/rb-004.html', 'utf8');

const faqs = [
  ['Can the half-moon date box size and compartment count be customized?', 'Yes. The diameter, height, lid reveal, compartment count and divider layout can be engineered around the actual date assortment and target piece count.'],
  ['What information is needed for a quotation?', 'Provide date dimensions, piece count, total filled weight, preferred diameter, quantity, artwork direction, destination and required delivery date.'],
  ['Does the rigid box touch the dates directly?', 'The greyboard and decorative wrap form the presentation box. Dates should use a separately specified food-grade primary tray, cup, liner or sealed wrap suitable for the destination market.'],
  ['Can the radial insert hold different date varieties?', 'Yes. Sections can organize different varieties or flavors when their size range, quantity and packing order are confirmed before structural sampling.'],
  ['What finishes are available?', 'Options can include custom printed or specialty paper, foil stamping, embossing, debossing, matte or gloss lamination and approved decorative details.'],
  ['Is a physical sample recommended?', 'Yes. A packed-product sample should verify lid movement, divider strength, date fit, removal, total weight, presentation and transport protection before production.']
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${productUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://slpack.net/' },
        { '@type': 'ListItem', position: 2, name: 'Chocolate & Food Packaging', item: 'https://slpack.net/applications/chocolate-and-food-packaging.html' },
        { '@type': 'ListItem', position: 3, name: 'Custom Shape Boxes', item: 'https://slpack.net/products/rigid-boxes/custom-shape-boxes.html' },
        { '@type': 'ListItem', position: 4, name, item: productUrl }
      ]
    },
    {
      '@type': 'Product',
      '@id': `${productUrl}#product`,
      name,
      sku: id,
      url: productUrl,
      image: [imageUrl],
      description,
      category: 'Custom Shape Boxes > Chocolate & Food Packaging > Date Gift Boxes',
      material: 'High-density greyboard wrapped with custom paper; food-contact primary tray or liner specified separately',
      brand: { '@type': 'Brand', name: 'ShineleeBox' },
      manufacturer: { '@id': 'https://slpack.net/#organization' }
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } }))
    }
  ]
};

const faqHtml = faqs.map(([q, a]) => `<details class="border border-brandBeige bg-white p-5"><summary class="font-semibold cursor-pointer flex items-center justify-between gap-4">${q}<span class="text-brandGold text-xl" aria-hidden="true">+</span></summary><p class="mt-3 text-sm text-slate-600 leading-relaxed">${a}</p></details>`).join('');

const main = `<main class="flex-grow">
    <nav class="bg-white border-b border-brandBeige py-4 px-4"><div class="max-w-7xl mx-auto text-xs text-slate-500 flex flex-wrap items-center gap-2"><a href="../index.html">Home</a><span>/</span><a href="../applications/chocolate-and-food-packaging.html">Chocolate &amp; Food Packaging</a><span>/</span><a href="rigid-boxes/custom-shape-boxes.html">Custom Shape Boxes</a><span>/</span><span>${id}</span></div></nav>
    <section class="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-start">
            <div class="bg-white border border-brandBeige aspect-square luxury-shadow"><img src="${imagePath}" alt="${name} by ShineleeBox" width="1200" height="1200" fetchpriority="high" class="w-full h-full object-contain"></div>
            <div class="space-y-7">
                <p class="text-[10px] text-brandGold font-bold uppercase tracking-[0.2em]">${id} · Custom OEM Date Packaging</p>
                <h1 class="font-serif text-4xl sm:text-5xl font-bold leading-tight">${name}</h1>
                <p class="text-lg text-slate-600 leading-relaxed">${description}</p>
                <div class="grid sm:grid-cols-2 gap-4 text-sm">
                    <div class="bg-brandIvory border border-brandBeige p-5"><strong>Structure</strong><p class="mt-2 text-slate-600">Round rigid box with a half-moon sliding reveal lid and concentric radial divider layout.</p></div>
                    <div class="bg-brandIvory border border-brandBeige p-5"><strong>Material</strong><p class="mt-2 text-slate-600">High-density greyboard wrapped with printed or specialty paper; not MDF or wood.</p></div>
                    <div class="bg-brandIvory border border-brandBeige p-5"><strong>Best for</strong><p class="mt-2 text-slate-600">Premium dates, chocolates, dried fruit, nuts and Ramadan or Eid gift assortments.</p></div>
                    <div class="bg-brandIvory border border-brandBeige p-5"><strong>Reference MOQ</strong><p class="mt-2 text-slate-600">500 pieces for the referenced configuration, subject to final size, materials, finishing and quotation.</p></div>
                </div>
                <div class="border border-brandGold/40 bg-white p-6"><h2 class="font-serif text-2xl font-bold">Food-contact and insert note</h2><p class="mt-3 text-sm text-slate-600 leading-relaxed">The rigid presentation box should be separated from the dates by a food-grade primary tray, cup, liner or sealed wrap confirmed for the destination market. Final radial compartments are engineered from the actual product size and packed weight.</p></div>
                <a href="../contact.html?product=CS-007" class="inline-flex bg-brandBurgundy text-white px-8 py-4 text-xs font-bold uppercase tracking-widest">Request Custom Quote</a>
            </div>
        </div>
    </section>
    <section class="bg-brandCharcoal text-brandIvory py-16"><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><h2 class="font-serif text-3xl font-bold">Buyer Specification Checklist</h2><div class="mt-8 grid md:grid-cols-2 gap-5 text-sm text-brandIvory/80"><div class="border border-brandGold/30 p-5"><strong class="text-brandGold">1. Product data</strong><p class="mt-2">Date variety, maximum dimensions, piece count, total filled weight and packing orientation.</p></div><div class="border border-brandGold/30 p-5"><strong class="text-brandGold">2. Layout</strong><p class="mt-2">Box diameter, number of rings, divider count, lid opening direction and desired reveal.</p></div><div class="border border-brandGold/30 p-5"><strong class="text-brandGold">3. Branding</strong><p class="mt-2">Artwork, paper, Pantone colors, foil, embossing, lamination and approved cultural details.</p></div><div class="border border-brandGold/30 p-5"><strong class="text-brandGold">4. Delivery</strong><p class="mt-2">Quantity, destination, target arrival date, product packing location and outer-carton needs.</p></div></div></div></section>
    <section class="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 class="font-serif text-3xl font-bold text-center">Half-Moon Date Box FAQ</h2><div class="mt-8 space-y-4">${faqHtml}</div><div class="mt-10 text-center"><a href="../blog/custom-date-gift-box-packaging-ramadan-eid-guide.html" class="text-brandBurgundy font-bold border-b border-brandBurgundy">Read the custom date packaging buyer guide →</a></div></section>
</main>`;

let page = template
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Half-Moon Date Gift Box Manufacturer | ShineleeBox</title>')
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
  .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${productUrl}">`)
  .replace(/<script type="application\/ld\+json" data-phase2-schema="true">[\s\S]*?<\/script>/, `<script type="application/ld+json" data-half-moon-date-schema="true">${JSON.stringify(schema)}</script>`)
  .replace(/<main class="flex-grow">[\s\S]*?<\/main>/, main);
fs.writeFileSync(`products/${slug}.html`, page);

function divSpans(html) {
  const token = /<div\b[^>]*>|<\/div>/gi;
  const stack = [], spans = [];
  for (let match; (match = token.exec(html));) {
    if (match[0][1] !== '/') stack.push({ start: match.index, openEnd: token.lastIndex, open: match[0] });
    else { const item = stack.pop(); if (item) spans.push({ ...item, closeStart: match.index, end: token.lastIndex }); }
  }
  return spans;
}

function insertIntoFirstProductGrid(html, card) {
  const mainStart = html.indexOf('<main');
  const grids = divSpans(html).filter(span => span.start > mainStart && /class="[^"]*grid grid-cols-1/.test(span.open) && /(?:\.\.\/)+products\/[a-z0-9-]+\.html/i.test(html.slice(span.openEnd, span.closeStart))).sort((a, b) => a.start - b.start);
  if (!grids.length) throw new Error('Product grid not found');
  const grid = grids[0];
  return html.slice(0, grid.closeStart) + card + '\n            ' + html.slice(grid.closeStart);
}

const rigidCard = `
            <div class="bg-brandWhite border border-brandBeige p-6 flex flex-col luxury-shadow group">
                <div class="h-64 mb-4 flex items-center justify-center bg-white cursor-pointer overflow-hidden" onclick="location.href='../../products/${slug}.html'">
                    <img src="../../images/products/CS-007_half-moon-date-gift-box/main.jpg" alt="${name}" loading="lazy" decoding="async" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700">
                </div>
                <h3 class="font-serif font-bold text-lg mb-1">${shortName}</h3>
                <p class="text-[10px] text-brandGold font-bold uppercase tracking-widest mb-4">${id}</p>
                <a href="../../products/${slug}.html" class="text-[9px] font-bold text-brandBurgundy uppercase border-b border-brandBurgundy self-start">Details</a>
            </div>`;

const applicationCard = `
        <article class="bg-brandWhite border border-brandBeige p-5 flex flex-col luxury-shadow group">
            <a href="../products/${slug}.html" class="block h-56 bg-white overflow-hidden mb-5" aria-label="View ${name}"><img src="../images/products/CS-007_half-moon-date-gift-box/main.jpg" alt="${name}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"></a>
            <p class="text-[10px] text-brandGold font-bold uppercase tracking-[0.18em] mb-2">${id}</p>
            <h2 class="font-serif text-xl font-bold leading-snug mb-3">${shortName}</h2>
            <p class="text-sm text-brandCharcoal/65 leading-relaxed mb-5 line-clamp-3">${description}</p>
            <a href="../products/${slug}.html" class="mt-auto text-[10px] font-bold uppercase tracking-widest text-brandBurgundy">View product →</a>
        </article>`;

for (const [file, card] of [['products/rigid-boxes/custom-shape-boxes.html', rigidCard], ['applications/chocolate-and-food-packaging.html', applicationCard]]) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes(`products/${slug}.html`)) html = insertIntoFirstProductGrid(html, card);
  fs.writeFileSync(file, html);
}

const blogFile = 'blog/custom-date-gift-box-packaging-ramadan-eid-guide.html';
let blog = fs.readFileSync(blogFile, 'utf8');
if (!blog.includes(`../products/${slug}.html`)) blog = blog.replace('<ul class="mt-4 space-y-3 text-brandBurgundy font-semibold">', `<ul class="mt-4 space-y-3 text-brandBurgundy font-semibold">\n                    <li><a href="../products/${slug}.html" class="hover:text-brandGold">Half-Moon Round Date Gift Box — ${id} →</a></li>`);
fs.writeFileSync(blogFile, blog);

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
if (!sitemap.includes(`/products/${slug}.html`)) sitemap = sitemap.replace('</urlset>', `  <url>\n    <loc>${productUrl}</loc>\n    <lastmod>2026-08-21</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>`);
fs.writeFileSync('sitemap.xml', sitemap);

console.log(`Added ${id} to Custom Shape Boxes and Chocolate & Food Packaging.`);
