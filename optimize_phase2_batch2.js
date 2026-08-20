const fs = require('fs');

const categoryPages = {
  'applications/perfume-fragrance.html': {
    title: 'Custom Perfume & Fragrance Packaging Manufacturer | ShineleeBox',
    description: 'Custom perfume gift boxes, discovery set packaging and fragrance presentation boxes made with grayboard structures, tailored inserts and branded paper finishes.',
    replaceText: ['Luxury perfume gift boxes, discovery sets, sample packaging, and custom-shaped cologne book boxes. High density boards with velvet touch sheets.', 'Custom perfume gift boxes, discovery sets, sample packaging and shaped fragrance presentation boxes using grayboard structures, tailored inserts and branded paper finishes.'],
    heading: 'Develop Fragrance Packaging Around the Bottle Set',
    summary: 'Perfume packaging should begin with every bottle, vial and accessory in the set. The structure, insert and opening sequence can then be developed around product protection, presentation and packing requirements.',
    cards: [
      ['Map every bottle', 'Provide bottle and cap dimensions, filled weight, orientation and quantity. Identify glass edges or components that need extra clearance.'],
      ['Choose the presentation', 'Discovery sets, travel sets, retail gift sets and launch kits require different access, display and replenishment decisions.'],
      ['Engineer the insert', 'The insert should retain each item without obscuring the label or making removal difficult. Finger notches and accessory spaces should be planned early.'],
      ['Approve color and finish', 'Confirm print color, specialty paper, foil and embossing on the approved dieline and suitable physical sample before production.']
    ],
    links: [['View a perfume bottle shaped box', '../products/pp-002.html'], ['Explore fragrance discovery packaging', '../products/ac-095.html'], ['Read beauty packaging guidance', '../applications/beauty-perfume-personal-care-packaging.html']],
    faqs: [
      ['What details are needed to quote a custom perfume box?', 'Provide bottle and cap dimensions, filled weight, number of items, preferred presentation, order quantity, destination, artwork status and target delivery window. Product samples or accurate mockups help define the insert.'],
      ['What is the main structure of a rigid perfume box?', 'A rigid perfume box typically uses grayboard wrapped with printed or specialty paper. Board thickness, insert and finish are selected for the bottle set and required presentation.'],
      ['Can one box hold bottles of different sizes?', 'Yes. A custom insert can organize different bottle and vial sizes when the complete set, orientations and removal method are defined before structural design.'],
      ['When should artwork be finalized?', 'Finalize production artwork after the structure and dieline are approved so graphics align with panels, openings, insert positions and finishing areas.']
    ]
  },
  'applications/jewelry-and-accessories-packaging.html': {
    heading: 'Specify Jewelry and Accessory Packaging Clearly',
    summary: 'Jewelry, watches and accessories need different retention points and presentation angles. Start with the exact item, display position and packing method before selecting the outer structure.',
    cards: [
      ['Define the item', 'Share dimensions, weight, chain length, clasp or watch cushion requirements and the intended display orientation.'],
      ['Plan customer removal', 'Finger access, ribbon pulls and retention points should protect the item while allowing a clean, intuitive reveal.'],
      ['Match the structure', 'Drawer, lid-and-base, suitcase and other grayboard box formats create different footprints and opening sequences.'],
      ['Confirm surface details', 'Approve wrap paper, print, foil and texture alongside the insert color so the complete presentation works as one system.']
    ],
    links: [['View a drawer jewelry box', '../products/dr-001.html'], ['Compare drawer gift boxes', '../products/rigid-boxes/drawer-gift-boxes.html'], ['Explore video and interactive packaging', '../products/interactive-packaging.html']],
    faqs: [
      ['What information is needed for a custom jewelry box insert?', 'Provide the product dimensions, weight, display orientation, retention points and preferred removal method. Photos or samples help define slots, cushions, tabs or other supports.'],
      ['Does jewelry packaging require a magnetic closure?', 'No. Magnetic closure is optional. Drawer, lid-and-base, suitcase and other structures may be better suited to the product, opening experience and shipping profile.'],
      ['Can the insert color and outer wrap be coordinated?', 'Yes. Insert surface, wrap paper, print and decorative finishes can be coordinated during sampling, subject to the selected materials and color approval method.'],
      ['Should shipping protection be tested separately?', 'Yes. The presentation box and its product retention should be reviewed together with the intended outer-carton and transport conditions.']
    ]
  },
  'applications/wine-liquor-packaging.html': {
    heading: 'Engineer Beverage Gift Packaging for Weight and Handling',
    summary: 'Bottle packaging must manage concentrated weight, glass protection and a controlled reveal. Accurate filled-bottle data is essential before the grayboard structure, insert and carrying details are finalized.',
    cards: [
      ['Provide filled-bottle data', 'Share bottle dimensions, filled weight, base and shoulder profile, cap height and the number of bottles or accessories.'],
      ['Plan load distribution', 'The base, neck area, dividers and any handle should be designed around the actual load and intended carrying orientation.'],
      ['Choose the opening', 'Lid-and-base, double-door, drawer and presentation formats affect packing, display and shipping volume differently.'],
      ['Test the packed set', 'Sample review should include bottle fit, movement, removal, closure behavior and the proposed transport pack.']
    ],
    links: [['Explore rigid gift box structures', '../products/rigid-boxes.html'], ['View suitcase gift boxes', '../products/rigid-boxes/suitcase-gift-boxes.html'], ['Discuss a bottle packaging brief', '../contact.html']],
    faqs: [
      ['What measurements are needed for a wine or spirits gift box?', 'Provide the maximum bottle diameter or profile, total height including closure, filled weight, quantity per box and dimensions of any glassware or accessories.'],
      ['Why is filled-bottle weight important?', 'Filled weight influences the base, insert, dividers, carrying details and outer-carton plan. Designing from an empty bottle can understate the real load.'],
      ['Can one gift box hold a bottle and accessories?', 'Yes. The layout can include glassware, tools or other accessories when every item and its packing orientation are defined before structural development.'],
      ['Is a presentation box the same as a shipping box?', 'No. A presentation box usually needs a separate transport pack. The outer-carton configuration should be evaluated for the destination and distribution method.']
    ]
  },
  'holiday-occasions/christmas-packaging.html': {
    title: 'Custom Christmas Gift Boxes & Advent Packaging | ShineleeBox',
    description: 'Custom Christmas gift boxes, advent calendar packaging and seasonal presentation boxes with tailored compartments, printed paper wraps and optional interactive features.',
    heading: 'Plan Seasonal Packaging Backward from the Launch Date',
    summary: 'Christmas and advent programs combine product assortment, artwork, sampling, production and fulfillment. Define the packed set and approval sequence early so structural and graphic decisions stay aligned.',
    cards: [
      ['Confirm the assortment', 'List every product, quantity, dimension and weight, including any different compartment sizes or accessories.'],
      ['Select the format', 'Advent drawers, numbered doors, rigid gift sets and shaped boxes create different assembly, packing and shipping requirements.'],
      ['Build an approval plan', 'Allow for structure approval, artwork placement, color and finish review, packed-product checks and final production confirmation.'],
      ['Prepare fulfillment details', 'Clarify where products are loaded, how sets are labeled and the outer-carton configuration for the intended destination.']
    ],
    links: [['View custom advent calendar boxes', '../products/advent-calendar-boxes.html'], ['Read the advent calendar buyer guide', '../custom-advent-calendar-packaging.html'], ['View a 24-day drawer calendar', '../products/ac-019.html']],
    faqs: [
      ['What should a Christmas packaging brief include?', 'Include the complete product assortment, dimensions, weights, quantity, destination, target launch or delivery date, preferred format and artwork status.'],
      ['Can a seasonal box use compartments of different sizes?', 'Yes. Compartments can be engineered for different items when every product and its opening sequence are defined before the layout is finalized.'],
      ['Can an existing structure be refreshed for a new campaign?', 'Often yes. Artwork, sleeves or selected decorative details may be updated on a proven structure, subject to product fit, material availability and production review.'],
      ['When should fulfillment be discussed?', 'Discuss fulfillment during structural development because packing location, loading sequence, labels and outer-carton requirements can affect the box and insert.']
    ]
  }
};

const productPages = {
  'products/ac-025.html': {
    heading: 'Information to Prepare for a Custom Quote',
    intro: 'This perfume-bottle-shaped advent calendar concept should be adapted around the real fragrance or gift assortment. The final silhouette, compartments and inserts depend on the packed products and opening sequence.',
    checklist: ['Dimensions and filled weight of every bottle, vial or gift item', 'Required compartment count and preferred opening sequence', 'Order quantity, destination and target delivery window', 'Artwork status, finish references and any display requirements'],
    links: [['Perfume packaging solutions', '../applications/perfume-fragrance.html'], ['Advent calendar collection', 'advent-calendar-boxes.html']],
    faqs: [
      ['Can the perfume-bottle silhouette be customized?', 'The silhouette and proportions can be evaluated around the product set, required compartments, stability and shipping considerations.'],
      ['Can the compartments hold different bottle sizes?', 'Yes. Provide every item dimension, weight and orientation so the compartment and insert layout can be developed around the complete assortment.'],
      ['What should be approved before production?', 'Approve the structure, dieline, product fit, opening sequence, artwork, color expectations, finishes and packing method before production confirmation.']
    ]
  },
  'products/dr-001.html': {
    heading: 'Information to Prepare for a Custom Quote',
    intro: 'Use this drawer jewelry box as a structural reference. Final dimensions, insert, pull detail and surface finish should be developed for the exact jewelry or accessory and its intended display position.',
    checklist: ['Jewelry or accessory dimensions, weight and display orientation', 'Preferred retention method and customer removal points', 'Order quantity, destination and target delivery window', 'Logo artwork, color references and finish preferences'],
    links: [['Jewelry packaging solutions', '../applications/jewelry-and-accessories-packaging.html'], ['Drawer gift box structures', 'rigid-boxes/drawer-gift-boxes.html']],
    faqs: [
      ['Can the drawer box be sized for a watch or jewelry set?', 'Yes. The box and insert can be evaluated around the exact item dimensions, display angle, retention points and removal method.'],
      ['Is a magnetic closure required?', 'No. A drawer structure can use its own sleeve-and-tray fit and pull detail. Any additional closure should be selected only when the project requires it.'],
      ['Which insert information is needed?', 'Provide product dimensions, weight, orientation, fragile areas and preferred removal method, ideally with a physical sample or accurate mockup.']
    ]
  },
  'products/ip-001.html': {
    heading: 'Information to Prepare for a Functional Quote',
    intro: 'This light-up gift box combines a paperboard presentation structure with an optional lighting concept. The module, switch, power placement and insert must be planned together for the intended opening action.',
    checklist: ['Product dimensions, weight and intended placement', 'Desired activation action, light position and viewing direction', 'Order quantity, destination and target delivery window', 'Artwork, reference video and any functional expectations'],
    faqs: [
      ['What activates the light-up feature?', 'The activation method is project-specific and should be defined during development according to the opening action, module placement and desired experience.'],
      ['Is the magnetic closure essential to the lighting?', 'No. The closure and lighting are separate design decisions. The suitable structure is selected around the product and intended interaction.'],
      ['When is a functional prototype recommended?', 'A functional prototype is recommended when activation reliability, light direction, module placement or the opening sequence must be verified.']
    ]
  },
  'products/ac-019.html': {
    heading: 'Information to Prepare for a Custom Quote',
    intro: 'This 24-day drawer calendar is a reference for multi-product seasonal programs. Drawer dimensions, overall footprint and insert details should be calculated from the real assortment and the order in which products are revealed.',
    checklist: ['Dimensions, weight and orientation for all 24 items', 'Preferred drawer arrangement, numbering and opening sequence', 'Order quantity, destination and target delivery window', 'Artwork status, finish references and fulfillment plan'],
    links: [['Christmas packaging solutions', '../holiday-occasions/christmas-packaging.html'], ['Advent calendar buyer guide', '../custom-advent-calendar-packaging.html']],
    faqs: [
      ['Do all 24 drawers need to be the same size?', 'No. Drawer sizes can vary when the complete product assortment and layout are defined before structural development.'],
      ['What material is used for a rigid drawer calendar?', 'Rigid calendar structures typically use grayboard wrapped with printed or specialty paper. Drawer and insert materials are selected for product fit and the intended presentation.'],
      ['What fulfillment details should be provided?', 'Clarify where products will be loaded, the packing sequence, labeling needs, destination and proposed outer-carton configuration.']
    ]
  },
  'products/lm-009.html': {
    heading: 'Information to Prepare for a Functional Quote',
    intro: 'This video presentation box is a reference for corporate gifting and launch kits. Screen placement, media behavior, charging access, product insert and opening sequence should be confirmed as one functional system.',
    checklist: ['Product and accessory dimensions, weights and packing orientation', 'Required media behavior, screen viewing direction and controls', 'Order quantity, destination and target delivery window', 'Video assets, artwork status and functional reference materials'],
    faqs: [
      ['What media details are needed for a video box project?', 'Describe the required playback behavior, controls, screen viewing direction, media files and any charging or access expectations.'],
      ['Can the product insert be customized with the screen layout?', 'Yes. The screen, module space, product and accessories should be planned together so the insert and opening sequence work around the complete kit.'],
      ['Why is a functional prototype important?', 'A functional prototype helps verify playback behavior, viewing angle, controls, component placement, product fit and the intended unboxing sequence.']
    ]
  }
};

const jsonLd = (faqs) => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } }))
}).replace(/</g, '\\u003c');

function faqMarkup(faqs) {
  return faqs.map(([q, a]) => `
          <details class="bg-brandWhite border border-brandBeige p-5">
            <summary class="font-semibold cursor-pointer list-none flex items-center justify-between gap-4">${q}<span class="text-brandGold text-xl" aria-hidden="true">+</span></summary>
            <p class="mt-4 text-sm leading-relaxed text-slate-600">${a}</p>
          </details>`).join('');
}

function linkMarkup(links) {
  return links.map(([label, href]) => `<a href="${href}" class="text-sm font-semibold text-brandBurgundy border-b border-brandBurgundy/40 hover:text-brandGold hover:border-brandGold transition-colors">${label}</a>`).join('\n          ');
}

function categorySection(c) {
  return `
  <!-- Phase 2 batch 2 buyer guidance -->
  <section class="bg-brandIvory border-t border-brandBeige py-16 sm:py-20" data-phase2-batch2="category">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-10">
        <p class="text-[10px] font-bold uppercase tracking-[0.24em] text-brandGold mb-4">Buyer Planning Guide</p>
        <h2 class="font-serif text-3xl sm:text-4xl font-bold">${c.heading}</h2>
        <p class="mt-5 text-base leading-relaxed text-slate-600">${c.summary}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">${c.cards.map(([h, p]) => `
        <article class="bg-brandWhite border border-brandBeige p-6 luxury-shadow">
          <h3 class="font-serif text-xl font-bold mb-3">${h}</h3>
          <p class="text-sm leading-relaxed text-slate-600">${p}</p>
        </article>`).join('')}
      </div>
      <div class="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-7">${linkMarkup(c.links)}</div>
    </div>
  </section>
  <section class="bg-brandWhite py-16 sm:py-20" data-phase2-batch2-faq="true">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10"><p class="text-[10px] font-bold uppercase tracking-[0.24em] text-brandGold mb-4">Buyer Questions</p><h2 class="font-serif text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2></div>
      <div class="space-y-4">${faqMarkup(c.faqs)}</div>
      <div class="mt-10 text-center"><a href="../contact.html" class="inline-flex px-7 py-3 bg-brandBurgundy text-brandWhite text-[10px] font-bold uppercase tracking-widest hover:opacity-90">Send Your Packaging Brief</a></div>
    </div>
  </section>`;
}

function productSection(c) {
  return `
  <!-- Phase 2 batch 2 product buyer guidance -->
  <section class="bg-brandIvory border-t border-brandBeige py-16 sm:py-20" data-phase2-batch2="product">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div><p class="text-[10px] font-bold uppercase tracking-[0.24em] text-brandGold mb-4">Buyer Checklist</p><h2 class="font-serif text-3xl sm:text-4xl font-bold">${c.heading}</h2><p class="mt-5 text-base leading-relaxed text-slate-600">${c.intro}</p><div class="mt-7 flex flex-col gap-3">${linkMarkup(c.links)}</div></div>
        <div class="bg-brandWhite border border-brandBeige p-6 sm:p-8 luxury-shadow"><h3 class="font-serif text-xl font-bold mb-5">Include these details</h3><ul class="space-y-4 text-sm text-slate-600">${c.checklist.map(x => `<li class="flex gap-3"><span class="text-brandGold font-bold">✓</span><span>${x}</span></li>`).join('')}</ul></div>
      </div>
      <div class="mt-14"><h2 class="font-serif text-2xl sm:text-3xl font-bold mb-7">Product Sourcing Questions</h2><div class="space-y-4">${faqMarkup(c.faqs)}</div></div>
      <div class="mt-10"><a href="../contact.html" class="inline-flex px-7 py-3 bg-brandBurgundy text-brandWhite text-[10px] font-bold uppercase tracking-widest hover:opacity-90">Request a Project-Specific Quote</a></div>
    </div>
  </section>`;
}

function applyPage(file, config, kind) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('data-phase2-batch2=')) throw new Error(`${file} already optimized`);
  if (config.title) html = html.replace(/<title>[^<]*<\/title>/, `<title>${config.title}</title>`);
  if (config.description) html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${config.description}">`);
  if (config.replaceText) html = html.replace(config.replaceText[0], config.replaceText[1]);
  html = html.replace('</head>', `\n    <script type="application/ld+json" data-phase2-batch2-schema="true">\n    ${jsonLd(config.faqs)}\n    </script>\n</head>`);
  html = html.replace('</main>', `${kind === 'category' ? categorySection(config) : productSection(config)}\n</main>`);
  fs.writeFileSync(file, html);
  console.log(`Optimized ${file}`);
}

for (const [file, config] of Object.entries(categoryPages)) applyPage(file, config, 'category');
for (const [file, config] of Object.entries(productPages)) applyPage(file, config, 'product');
