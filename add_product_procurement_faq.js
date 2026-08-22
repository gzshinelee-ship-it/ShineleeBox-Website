const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'products');

const faq = [
  ['What is the minimum order quantity for custom packaging?', 'ShineleeBox accepts custom packaging orders from 50 pieces. The final MOQ can vary by box structure, size, materials, printing and finishing.'],
  ['Can I get a sample before mass production?', 'Yes. A free sample is available, and the usual sampling time is 5–7 days after the structure and artwork requirements are confirmed.'],
  ['How long does custom packaging production take?', 'Standard production normally takes 20–25 days after the sample, artwork and order details are approved.'],
  ['Can you design the box around my product dimensions?', 'Yes. The box structure and insert can be engineered around your product dimensions, packed weight and presentation requirements.'],
  ['Which box inserts are available?', 'Available insert options include paper, PET blister, EPE foam and EVA foam. Food-grade paper can be specified for suitable food-packaging applications.'],
  ['How long does sea shipping usually take?', 'Estimated sea transit is 25–30 days to the United States and about 50 days to Europe or the Middle East. Final timing depends on the destination, route and customs clearance.'],
  ['How quickly will ShineleeBox reply to an inquiry?', 'A packaging specialist will reply within 2 hours during normal business coverage.']
];

const schema = `\n    <script type="application/ld+json" data-procurement-faq-schema="true">\n${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(([name, text]) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: { '@type': 'Answer', text }
  }))
}, null, 2).split('\n').map(line => `    ${line}`).join('\n')}\n    </script>\n`;

const section = `
    <section class="bg-brandIvory border-y border-brandBeige py-14" data-procurement-faq="true">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto">
                <p class="text-[10px] font-bold uppercase tracking-[0.22em] text-brandGold">Factory-direct custom packaging</p>
                <h2 class="font-serif text-3xl font-bold text-brandCharcoal mt-3">Plan Your Custom Box Order</h2>
                <p class="text-sm text-slate-600 mt-4 leading-relaxed">Clear sourcing terms for faster quotation, sampling and delivery planning.</p>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-8">
                <div class="bg-white border border-brandBeige p-4 sm:p-5"><strong class="block text-brandBurgundy text-lg">From 50 pcs</strong><span class="text-xs text-slate-600">Custom-order MOQ; complex structures may require more.</span></div>
                <div class="bg-white border border-brandBeige p-4 sm:p-5"><strong class="block text-brandBurgundy text-lg">Free sample</strong><span class="text-xs text-slate-600">Normally prepared in 5–7 days after confirmation.</span></div>
                <div class="bg-white border border-brandBeige p-4 sm:p-5"><strong class="block text-brandBurgundy text-lg">20–25 days</strong><span class="text-xs text-slate-600">Standard production after final approval.</span></div>
                <div class="bg-white border border-brandBeige p-4 sm:p-5"><strong class="block text-brandBurgundy text-lg">Reply in 2 hours</strong><span class="text-xs text-slate-600">Send size, quantity, artwork and destination.</span></div>
            </div>
            <div class="mt-8 grid md:grid-cols-2 gap-x-8 gap-y-3">
                ${faq.slice(2, 7).map(([question, answer]) => `<details class="bg-white border border-brandBeige p-4"><summary class="font-semibold text-sm cursor-pointer">${question}</summary><p class="mt-3 text-sm text-slate-600 leading-relaxed">${answer}</p></details>`).join('\n                ')}
            </div>
            <div class="text-center mt-8"><a href="../contact.html?subject=Custom%20packaging%20quote" class="inline-flex bg-brandBurgundy text-brandWhite px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90">Get a Custom Quote</a></div>
        </div>
    </section>
`;

let updated = 0;
for (const name of fs.readdirSync(productsDir).filter(name => name.endsWith('.html'))) {
  const file = path.join(productsDir, name);
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('contact.html?product=')) continue;
  html = html.replace(/\n    <script type="application\/ld\+json" data-procurement-faq-schema="true">[\s\S]*?<\/script>\n(?=<\/head>)/, '');
  if (html.includes('data-procurement-faq="true"')) {
    if (!html.includes('"@type": "FAQPage"') && !html.includes('"@type":"FAQPage"')) {
      html = html.replace('</head>', `${schema}</head>`);
      fs.writeFileSync(file, html);
    }
    continue;
  }
  if (!html.includes('</head>') || !html.includes('</main>')) throw new Error(`Missing insertion marker: ${name}`);
  if (!html.includes('"@type": "FAQPage"') && !html.includes('"@type":"FAQPage"')) {
    html = html.replace('</head>', `${schema}</head>`);
  }
  html = html.replace('</main>', `${section}</main>`);
  fs.writeFileSync(file, html);
  updated += 1;
}

console.log(`Updated ${updated} product detail pages.`);
