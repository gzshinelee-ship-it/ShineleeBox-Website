const fs = require('fs');

const products = [
  {
    id: 'RG-001', file: 'rg-001.html', folder: 'RG-001_premium-rigid-miswak-gift-box', image: '00_main.jpg',
    oldName: 'Round Jewelry Gift Box', name: 'Premium Rigid Miswak Gift Box with Breathable Window',
    title: 'Custom Miswak Gift Box Manufacturer | ShineleeBox',
    description: 'Custom rigid Miswak gift box with a breathable window and branded paper finish. OEM religious retail packaging for Islamic gift brands, shops and distributors.',
    intro: 'A purpose-built rigid paper box for presenting and protecting Miswak while allowing airflow through a breathable display window.'
  },
  {
    id: 'RG-002', file: 'rg-002.html', folder: 'RG-002_hajj-umrah-tracking-cards', image: 'image_01.png',
    oldName: 'Round Watch Gift Box', name: 'Waterproof Hajj &amp; Umrah Tracking Cards with Lanyard', schemaName: 'Waterproof Hajj & Umrah Tracking Cards with Lanyard',
    title: 'Hajj &amp; Umrah Tracking Cards Supplier | ShineleeBox',
    description: 'Custom waterproof Hajj and Umrah tracking cards with lanyards for pilgrims, tour groups and organizers. OEM printing, multilingual artwork and bulk supply.',
    intro: 'Durable pilgrim identification and tracking cards with custom printing and lanyards for Hajj and Umrah travel groups.'
  },
  {
    id: 'RG-003', file: 'rg-003.html', folder: 'RG-003_diy-cardboard-zakat-box', image: 'image_01.png',
    oldName: 'Round Cosmetic Gift Box', name: 'DIY Cardboard Zakat Box for Kids',
    title: 'Custom Zakat Charity Box Manufacturer | ShineleeBox',
    description: 'Custom DIY cardboard Zakat box for children, Islamic schools and Ramadan programs. OEM printed Sadaqah banks with educational artwork and flat-pack options.',
    intro: 'An educational cardboard charity bank that helps children learn about Zakat and Sadaqah through a practical family or classroom activity.'
  },
  {
    id: 'RG-004', file: 'rg-004.html', folder: 'RG-004_professional-hospital-wudu-kit', image: 'image_01.png',
    oldName: 'Round Perfume Gift Box', name: 'Hospital Wudu Kit with Disposable Tayammum Pad',
    title: 'Hospital Wudu &amp; Tayammum Kit Supplier | ShineleeBox',
    description: 'Custom hospital Wudu and Tayammum kit for Muslim patient spiritual care. OEM disposable dry-ablution pads, printed instructions and standardized kit packaging.',
    intro: 'A standardized spiritual-care kit for hospitals and care facilities, combining clear instructions with a portable disposable Tayammum solution.'
  },
  {
    id: 'RG-005', file: 'rg-005.html', folder: 'RG-005_led-holy-water-gift-box', image: 'image_01.png',
    oldName: 'Round Chocolate Gift Box', name: 'Custom LED Holy Water Gift Box',
    title: 'Custom LED Holy Water Gift Box Manufacturer | ShineleeBox',
    description: 'Custom LED holy water gift box with a fitted bottle insert, printed rigid structure and light-up presentation. OEM religious keepsake packaging for churches and gifts.',
    intro: 'An illuminated presentation box designed to display a holy water bottle as a ceremonial gift or religious keepsake.'
  },
  {
    id: 'RG-006', file: 'rg-006.html', folder: 'RG-006_ritual-stone-box-set', image: 'image_01.png',
    oldName: 'Round Date Gift Box', name: '49-Piece Hajj &amp; Umrah Ritual Stone Box Set', schemaName: '49-Piece Hajj & Umrah Ritual Stone Box Set',
    title: 'Hajj Ritual Stone Box Set Supplier | ShineleeBox',
    description: 'Custom 49-piece Hajj and Umrah ritual stone box set for Jamarat preparation, pilgrimage education and gifts. OEM inserts, printing and bulk packaging supply.',
    intro: 'A fitted 49-piece ritual stone set for Jamarat preparation, pilgrimage education and organized Hajj or Umrah gift programs.'
  },
  {
    id: 'RG-007', file: 'rg-007.html', folder: 'RG-007_janazah-emergency-kit', image: 'image_01.png',
    name: 'Hospital Janazah Emergency Kit',
    description: 'A standardized Muslim funeral preparation kit for hospitals, care facilities and community organizations.',
    intro: 'Organized Janazah supplies in a clearly identified box for hospitals, care facilities and Muslim community organizations.'
  },
  {
    id: 'RG-008', file: 'rg-008.html', folder: 'RG-008_sadaqah-milestone-box', image: 'image_01.png',
    name: 'Sadaqah Milestone Charity Box',
    description: 'A rigid Sadaqah saving box with a progress window and daily log for family, school and Ramadan charity programs.',
    intro: 'A reusable charity box that makes Sadaqah progress visible for families, classrooms and community campaigns.'
  },
  {
    id: 'RG-009', file: 'rg-009.html', folder: 'RG-009_qibla-direction-stickers', image: 'image_01.png',
    name: 'Removable Qibla Direction Stickers',
    description: 'Bulk removable Qibla direction stickers for hotels, serviced apartments, hospitals and prayer facilities.',
    intro: 'Residue-conscious Qibla markers supplied in bulk rolls for hospitality and institutional prayer guidance.'
  },
  {
    id: 'RG-010', file: 'rg-010.html', folder: 'RG-010_premium-tayammum-pad-dry-ablution', image: 'image_01.png',
    name: 'Premium Tayammum Pad for Dry Ablution',
    description: 'A portable Tayammum pad with clean earth for Islamic dry ablution in hospitals, travel and spiritual-care settings.',
    intro: 'A compact dry-ablution pad designed for situations where water is unavailable or cannot be used.'
  }
];

for (const product of products) {
  const path = `products/${product.file}`;
  let html = fs.readFileSync(path, 'utf8');
  html = html.replace('"category": "Rigid Gift Boxes"', '"category": "Religious & Cultural Gift Packaging"');

  if (product.oldName) {
    const schemaName = product.schemaName || product.name.replaceAll('&amp;', '&');
    html = html.split(product.oldName).join(product.name);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${product.title}</title>`);
    html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${product.description}">`);
    html = html.replace(/"description": "[^"]*",\n\s+"sku":/, `"description": ${JSON.stringify(product.description)},\n          "sku":`);
    html = html.replace(
      /(<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>)/g,
      block => block.replaceAll(product.name, schemaName)
    );
    html = html.replace(
      /<p class="text-lg text-slate-600 font-light leading-relaxed">[\s\S]*?<\/p>/,
      `<p class="text-lg text-slate-600 font-light leading-relaxed">${product.intro}</p>`
    );
    html = html.replace(
      /<p class="text-sm text-slate-600 leading-relaxed"><\/p>/,
      `<p class="text-sm text-slate-600 leading-relaxed">${product.description}</p>`
    );
  }
  fs.writeFileSync(path, html);
}

const applicationPath = 'applications/religious-and-cultural-gift-packaging.html';
let application = fs.readFileSync(applicationPath, 'utf8');
application = application.replace(/\s*<article class="bg-brandWhite border border-brandBeige p-5 flex flex-col luxury-shadow group">[\s\S]*?<a href="\.\.\/products\/rg-\d{3}\.html"[\s\S]*?<\/article>/g, '');

const cards = products.map(product => `
        <article class="bg-brandWhite border border-brandBeige p-5 flex flex-col luxury-shadow group" data-product-id="${product.id}">
            <a href="../products/${product.file}" class="block h-56 bg-white overflow-hidden mb-5" aria-label="View ${product.name}">
                <img src="../images/products/${product.folder}/${product.image}" alt="${product.name}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500">
            </a>
            <p class="text-[10px] text-brandGold font-bold uppercase tracking-[0.18em] mb-2">${product.id}</p>
            <h2 class="font-serif text-xl font-bold leading-snug mb-3">${product.name}</h2>
            <p class="text-sm text-brandCharcoal/65 leading-relaxed mb-5 line-clamp-3">${product.intro}</p>
            <a href="../products/${product.file}" class="mt-auto text-[10px] font-bold uppercase tracking-widest text-brandBurgundy">View product →</a>
        </article>`).join('');

const gridEnd = '</div>\n        </section>\n        <section class="bg-brandWhite border-y border-brandBeige py-16">';
if (!application.includes(gridEnd)) throw new Error('Could not locate religious product grid end.');
application = application.replace(gridEnd, `${cards}</div>\n        </section>\n        <section class="bg-brandWhite border-y border-brandBeige py-16">`);
fs.writeFileSync(applicationPath, application);

const roundPath = 'products/rigid-boxes/round-gift-boxes.html';
let round = fs.readFileSync(roundPath, 'utf8');
round = round.replace(
  /<main class="flex-grow">[\s\S]*?<\/main>/,
  `<main class="flex-grow">
    <section class="bg-brandCharcoal text-brandIvory py-20 border-b border-brandGold/30 text-center">
      <h1 class="font-serif text-4xl sm:text-5xl font-bold">Round Gift Box Collection Updated</h1>
      <p class="mt-5 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-brandIvory/75">Products previously shown here were religious and cultural products rather than round gift boxes. They have been reclassified so buyers can find accurate product information without duplicate or misleading listings.</p>
    </section>
    <section class="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="font-serif text-3xl sm:text-4xl font-bold">View the Correct Product Collection</h2>
      <p class="mt-5 text-base leading-relaxed text-slate-600">Explore Miswak packaging, Hajj and Umrah products, Zakat boxes, Wudu and Tayammum kits, Janazah kits, Qibla stickers and other purpose-built religious packaging in the Religious &amp; Cultural Gift Packaging directory.</p>
      <div class="mt-9 flex flex-col sm:flex-row justify-center gap-4">
        <a href="../../applications/religious-and-cultural-gift-packaging.html" class="inline-flex justify-center bg-brandBurgundy text-white px-7 py-4 text-[10px] font-bold uppercase tracking-widest">Religious &amp; Cultural Products</a>
        <a href="../../contact.html" class="inline-flex justify-center border border-brandCharcoal px-7 py-4 text-[10px] font-bold uppercase tracking-widest">Ask About a Round Box</a>
      </div>
    </section>
  </main>`
);
fs.writeFileSync(roundPath, round);

console.log('Reclassified 10 religious products and removed duplicate/misleading round-box listings.');
