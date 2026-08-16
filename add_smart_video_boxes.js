const fs = require('fs');

const products = [
  {
    id: 'LM-001', file: 'lm-001.html', folder: 'LM-001_baby-milestone-video-keepsake-box',
    oldName: 'Shinelee Baby Milestone Video Keepsake Box with 7 inch Screen',
    name: 'Custom Baby Milestone Video Keepsake Box with 7-Inch LCD',
    title: 'Custom Baby Video Keepsake Box Manufacturer | ShineleeBox',
    description: 'Custom baby milestone video keepsake box with a 7-inch LCD screen, branded rigid structure and fitted storage. OEM packaging development for baby gift brands.',
    card: 'A branded baby keepsake presentation box combining video playback with fitted storage for milestone gifts and memory collections.'
  },
  {
    id: 'LM-002', file: 'lm-002.html', folder: 'LM-002_wedding-anniversary-video-box',
    oldName: 'Deluxe Wedding Video Box A4 Keepsake Album Box Pearl White',
    name: 'Custom Wedding Video Keepsake Box with 7-Inch LCD',
    title: 'Custom Wedding Video Keepsake Box Manufacturer | ShineleeBox',
    description: 'Custom wedding video keepsake box with a 7-inch LCD screen and fitted album storage. OEM rigid video packaging for wedding studios, venues and gift brands.',
    card: 'An LCD video presentation box for wedding films, albums and bridal keepsakes, customizable for studios, venues and premium gift programs.'
  },
  {
    id: 'LM-003', file: 'lm-003.html', folder: 'LM-003_eternal-memorial-video-tribute-box',
    oldName: 'In Loving Memory Video Tribute Box with 7 Inch Display',
    name: 'Custom Memorial Video Tribute Box with 7-Inch Display',
    title: 'Custom Memorial Video Tribute Box Manufacturer | ShineleeBox',
    description: 'Custom memorial video tribute box with a 7-inch display, printed rigid structure and keepsake compartment. OEM packaging for remembrance and tribute programs.',
    card: 'A dignified video tribute box designed to present remembrance films together with photographs, letters and meaningful keepsakes.'
  },
  {
    id: 'LM-004', file: 'lm-004.html', folder: 'LM-004_hajj-umrah-heritage-video-gift-box',
    oldName: 'Emerald Green Islamic Hajj Gift Box with 7 inch Screen',
    name: 'Custom Hajj &amp; Umrah Video Gift Box with 7-Inch Screen',
    schemaName: 'Custom Hajj & Umrah Video Gift Box with 7-Inch Screen',
    title: 'Custom Hajj Video Gift Box Manufacturer | ShineleeBox',
    description: 'Custom Hajj and Umrah video gift box with a 7-inch LCD screen, gold-foil branding and fitted compartments. OEM Islamic gift packaging.',
    card: 'A custom Islamic gift box that combines pilgrimage video content with compartments for Hajj, Umrah and heritage keepsakes.'
  },
  {
    id: 'LM-005', file: 'lm-005.html', folder: 'LM-005_baptism-holy-communion-keepsake-box',
    oldName: 'Luxury White Baptism Keepsake Box with 7 Inch Screen',
    name: 'Custom Baptism Video Keepsake Box with 7-Inch Screen',
    title: 'Custom Baptism Video Keepsake Box Manufacturer | ShineleeBox',
    description: 'Custom baptism video keepsake box with a 7-inch LCD screen, branded rigid construction and fitted storage. OEM packaging for churches and religious gift brands.',
    card: 'A personalized video keepsake box for baptism and First Communion memories, with space for photographs, certificates and ceremonial gifts.'
  },
  {
    id: 'LM-006', file: 'lm-006.html', folder: 'LM-006_bar-bat-mitzvah-keepsake-video-box',
    oldName: 'Navy Blue Jewish Bar Mitzvah Keepsake Box with 7 Inch LCD',
    name: 'Custom Bar Mitzvah Video Keepsake Box with 7-Inch LCD',
    title: 'Custom Bar Mitzvah Video Box Manufacturer | ShineleeBox',
    description: 'Custom Bar Mitzvah video keepsake box with a 7-inch LCD screen, foil branding and fitted storage. OEM rigid packaging for milestone events and gift programs.',
    card: 'A premium video presentation box for Bar and Bat Mitzvah films, photographs, invitations and milestone keepsakes.'
  },
  {
    id: 'LM-007', file: 'lm-007.html', folder: 'LM-007_rainbow-bridge-pet-memorial-video-box',
    oldName: 'Cute Pet Memorial Box with 7 Inch Screen for Dog Cat',
    name: 'Custom Pet Memorial Video Box with 7-Inch Screen',
    title: 'Custom Pet Memorial Video Box Manufacturer | ShineleeBox',
    description: 'Custom pet memorial video box with a 7-inch screen and keepsake storage for photographs, collars and tribute items. OEM packaging for pet remembrance brands.',
    card: 'A warm pet remembrance box that plays tribute videos and stores photographs, collars, tags and other meaningful mementos.'
  },
  {
    id: 'LM-008', file: 'lm-008.html', folder: 'LM-008_graduation-excellence-video-box',
    oldName: 'Class of 2026 Graduation Video Box A4 Certificate Case',
    name: 'Custom Graduation Video Certificate Box with 7-Inch LCD',
    title: 'Graduation Video Certificate Box Manufacturer | ShineleeBox',
    description: 'Custom graduation video certificate box with a 7-inch LCD and A4 diploma storage. OEM packaging for schools, universities and alumni programs.',
    card: 'An A4 certificate and diploma presentation box with integrated video playback for schools, universities and alumni gift programs.'
  },
  {
    id: 'LM-009', file: 'lm-009.html', folder: 'LM-009_premium-corporate-vip-video-gift-box',
    oldName: 'Premium Corporate VIP Video Gift Box A4 Size with LCD',
    name: 'Custom Corporate Video Gift Box with 7-Inch LCD',
    title: 'Custom Corporate Video Gift Box Manufacturer | ShineleeBox',
    description: 'Custom corporate video gift box with a 7-inch LCD screen, branded rigid structure and fitted insert. OEM video packaging for PR kits, launches and VIP gifting.',
    card: 'A branded LCD video box for product launches, media kits, executive gifting and high-value customer presentations.'
  }
];

for (const product of products) {
  const path = `products/${product.file}`;
  let html = fs.readFileSync(path, 'utf8');
  const schemaName = product.schemaName || product.name;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${product.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${product.description}">`);
  html = html.split(product.oldName).join(product.name);
  html = html.replace(/"description": "[^"]*",\n\s+"sku":/, `"description": ${JSON.stringify(product.description)},\n          "sku":`);
  html = html.replace(/"category": "Luxury Mailing Boxes"/, '"category": "Interactive Packaging > Custom Video Boxes"');
  html = html.replace(
    /(<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>)/g,
    block => block.replaceAll(product.name, schemaName)
  );
  fs.writeFileSync(path, html);
}

const categoryPath = 'products/interactive-packaging.html';
let category = fs.readFileSync(categoryPath, 'utf8');
category = category.replace(
  '<title>Custom Interactive Packaging with Light & Sound | ShineleeBox</title>',
  '<title>Custom Interactive Packaging &amp; Video Boxes | ShineleeBox</title>'
);
category = category.replace(
  /<meta name="description" content="[^"]*">/,
  '<meta name="description" content="Custom interactive packaging manufacturer for LCD video boxes, music boxes and LED gift boxes. OEM structure, module integration, sampling and production.">'
);

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Custom Video Boxes',
  numberOfItems: products.length,
  itemListElement: products.map((p, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `https://slpack.net/products/${p.file}`,
    name: (p.schemaName || p.name)
  }))
};
const schema = `\n    <script type="application/ld+json" data-smart-video-box-list="true">\n    ${JSON.stringify(itemList)}\n    </script>\n`;
category = category.replace('</head>', `${schema}</head>`);

const cards = products.map(p => `
            <article class="bg-brandWhite border border-brandBeige p-6 flex flex-col luxury-shadow group">
                <a href="../products/${p.file}" class="h-64 mb-4 flex items-center justify-center bg-white overflow-hidden" aria-label="View ${p.name}">
                    <img src="../images/products/${p.folder}/image_01.webp" alt="${p.name} by custom video box manufacturer ShineleeBox" loading="lazy" decoding="async" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700">
                </a>
                <h3 class="font-serif font-bold text-lg mb-2">${p.name}</h3>
                <p class="text-sm text-brandCharcoal/65 leading-relaxed mb-4 flex-grow">${p.card}</p>
                <p class="text-[10px] text-brandGold font-bold uppercase tracking-widest mb-4">${p.id} · Custom OEM</p>
                <a href="../products/${p.file}" class="text-[9px] font-bold text-brandBurgundy uppercase border-b border-brandBurgundy self-start">View Product</a>
            </article>`).join('');

const videoSection = `
        <section class="bg-brandIvory border-t border-brandBeige py-20" aria-labelledby="custom-video-boxes-heading" data-smart-video-boxes="true">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-4xl mb-12">
                    <p class="text-[10px] font-bold uppercase tracking-[0.24em] text-brandGold mb-4">Smart Video Box Collection</p>
                    <h2 id="custom-video-boxes-heading" class="font-serif text-3xl sm:text-4xl font-bold">Custom LCD Video Boxes for Brands, Events &amp; Keepsakes</h2>
                    <p class="mt-5 text-base leading-relaxed text-slate-600">ShineleeBox manufactures custom video boxes that combine a printed grayboard presentation box, fitted product or keepsake storage and an integrated LCD screen. Buyers can customize the box size, screen layout, artwork, surface paper, insert and opening experience for corporate PR kits, weddings, milestone events and remembrance programs.</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">${cards}
                </div>
                <div class="mt-12 bg-brandWhite border border-brandBeige p-7 sm:p-9">
                    <h3 class="font-serif text-2xl font-bold mb-4">What should buyers provide for a custom video box quote?</h3>
                    <p class="text-sm leading-relaxed text-slate-600">Share the box size or packed product dimensions, target quantity, screen size preference, video playback behavior, insert requirements, artwork status and delivery country. A functional sample is recommended to confirm viewing angle, controls, charging access, product fit and the complete unboxing sequence before production.</p>
                </div>
            </div>
        </section>
`;

const marker = '    <!-- Phase 2 buyer guidance and GEO answers -->';
if (!category.includes('data-smart-video-boxes="true"')) {
  category = category.replace(marker, `${videoSection}\n${marker}`);
}
fs.writeFileSync(categoryPath, category);

console.log(`Updated ${products.length} video product pages and the interactive packaging category.`);
