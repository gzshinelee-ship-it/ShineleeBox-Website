const fs = require('fs');

const pages = {
  'products/advent-calendar-boxes.html': {
    title: 'Custom Advent Calendar Boxes Manufacturer | ShineleeBox',
    description: 'Custom advent calendar boxes with drawers, doors and shaped paperboard structures for beauty, fragrance, food and holiday gift programs. Request a tailored packaging quote.',
    eyebrow: 'Seasonal Packaging Programs',
    intro: 'Develop custom advent calendar packaging around your product count, compartment sizes, launch theme and fulfillment method. Choose drawer, door, book-style or shaped grayboard structures with printed paper wraps and made-to-fit inserts.',
    heading: 'Plan a Custom Advent Calendar for Production',
    summary: 'A successful calendar starts with the products, not a preset box. Share the item dimensions, weight, quantity and launch date so the structure, insert and opening sequence can be engineered together.',
    cards: [
      ['Choose the format', 'Compare drawer, perforated-door, double-door, book-style and custom-shape formats according to the unboxing sequence and product weight.'],
      ['Engineer the compartments', 'Provide every product size and orientation. Compartment dimensions and insert tolerances should be confirmed before artwork is finalized.'],
      ['Prepare the artwork', 'Apply graphics to the approved dieline and identify numbering, foil, embossing, windows and any special opening details.'],
      ['Approve before production', 'Use a structural or printed sample to verify fit, opening order, color expectations and packing method before mass production.']
    ],
    related: [
      ['Read the custom advent calendar buyer guide', '../custom-advent-calendar-packaging.html'],
      ['Explore Christmas packaging solutions', '../holiday-occasions/christmas-packaging.html'],
      ['Compare interactive packaging concepts', '../products/interactive-packaging.html']
    ],
    faqs: [
      ['What information is needed to quote a custom advent calendar box?', 'Send the product dimensions and weight, number of compartments, preferred box format, order quantity, destination, target launch date and artwork status. Photos or samples of the products also help define the insert.'],
      ['Can each compartment be a different size?', 'Yes. Compartments can be engineered around different products. The final layout depends on product dimensions, weight distribution, opening sequence and the available box footprint.'],
      ['Which materials are used for rigid advent calendar boxes?', 'Rigid calendar structures typically use grayboard wrapped with printed or specialty paper. Inserts may use paperboard, molded pulp, foam or other materials selected for product protection and brand requirements.'],
      ['Can lighting or sound be added?', 'Lighting, sound and other interactive modules can be evaluated when the campaign concept requires them. Module space, activation method, transport and compliance requirements should be reviewed during structural development.']
    ]
  },
  'products/rigid-boxes.html': {
    heading: 'How to Specify a Custom Rigid Gift Box',
    summary: 'Rigid packaging is developed around the product, presentation goal and packing process. ShineleeBox uses grayboard-based structures with paper wraps; closure and insert choices are selected for each project.',
    cards: [
      ['Select a structure', 'Magnetic closure, drawer, lid-and-base, foldable, round and custom-shape formats create different opening experiences and shipping profiles.'],
      ['Define protection', 'Product dimensions, weight and fragility determine the insert layout, board thickness and areas that may require reinforcement.'],
      ['Choose the finish', 'Printed paper, specialty paper, foil, embossing, debossing and spot effects can be combined after the structure is approved.'],
      ['Validate the sample', 'Confirm fit, opening resistance, color, finish placement and packing sequence with the appropriate sample before production.']
    ],
    related: [
      ['View magnetic gift box options', '../products/rigid-boxes/magnetic-gift-boxes.html'],
      ['Compare drawer gift boxes', '../products/rigid-boxes/drawer-gift-boxes.html'],
      ['Explore foldable rigid boxes', '../products/rigid-boxes/foldable-rigid-boxes.html']
    ],
    faqs: [
      ['What is a rigid gift box made from?', 'The main structural material is grayboard wrapped with printed paper or specialty paper. Board thickness and wrap material are selected according to box size, product weight and finish requirements.'],
      ['Does every rigid box need a magnetic closure?', 'No. Magnetic closure is one optional structure. Drawer, lid-and-base, foldable, book-style and other constructions may be more suitable depending on the product and desired opening experience.'],
      ['What should a buyer provide before structural design starts?', 'Provide product dimensions and weight, photos or samples, preferred box style, insert needs, quantity, destination, artwork status and the required delivery window.'],
      ['How are inserts selected?', 'Insert selection depends on protection, presentation, sustainability goals and packing method. Paperboard, molded pulp, foam and other insert systems can be evaluated for the specific product.']
    ]
  },
  'products/interactive-packaging.html': {
    title: 'Custom Interactive Packaging with Light & Sound | ShineleeBox',
    description: 'Custom interactive paper packaging with optional light, sound, sensor and motion concepts for gift boxes, launch kits and advent calendars. Develop structure and modules together.',
    eyebrow: 'Light, Sound & Sensor Concepts',
    intro: 'Create an unboxing sequence that connects the paper structure with an optional light, sound, sensor or motion module. Each concept is evaluated around product fit, activation method, power placement, transport and packing requirements.',
    heading: 'Develop Interactive Packaging as One System',
    summary: 'Interactive features work best when the electronics, grayboard structure, insert and artwork are planned together. Begin with the desired customer action and the response the packaging should create.',
    cards: [
      ['Define the interaction', 'Specify what the customer opens, lifts, touches or removes and whether the response should be light, sound, motion or a combination.'],
      ['Plan module placement', 'Reserve space for the module, wiring, power source, switch or sensor without interfering with the product or the opening sequence.'],
      ['Prototype the experience', 'Test activation reliability, viewing angle, sound level, product fit and packing method with a functional prototype when required.'],
      ['Confirm production details', 'Approve the structure, artwork, module behavior and assembly instructions before mass production planning.']
    ],
    related: [
      ['View custom advent calendar boxes', '../products/advent-calendar-boxes.html'],
      ['Discuss a custom concept', '../contact.html']
    ],
    faqs: [
      ['What types of interactive features can be evaluated?', 'Projects may evaluate light, sound, sensor or motion concepts. The suitable option depends on the intended action, available space, product type, transport conditions and project requirements.'],
      ['Is interactive packaging always magnetic?', 'No. Magnetic closures are optional and are not required for interactive packaging. The paperboard structure and opening mechanism are selected around the desired experience and product.'],
      ['What is needed to develop a functional prototype?', 'Provide product dimensions, the desired interaction sequence, reference media, artwork status, quantity and destination. Functional requirements should be agreed before prototype construction.'],
      ['Can an interactive module be added to an advent calendar?', 'Yes, an interactive module can be considered for an advent calendar when sufficient space is reserved and the activation method works with the door, drawer or opening sequence.']
    ]
  },
  'applications/beauty-perfume-personal-care-packaging.html': {
    heading: 'Build a Packaging Brief for Beauty and Fragrance Sets',
    summary: 'Beauty packaging must organize products with different heights, diameters and fragility while keeping the opening experience clear. Begin with the complete product set and channel requirements.',
    cards: [
      ['Map every product', 'List bottle, jar, tube, tool and sample dimensions, weights and orientations before the insert and outer box are developed.'],
      ['Choose the presentation', 'Discovery sets, PR kits, launch boxes and retail gift sets require different access, display and replenishment considerations.'],
      ['Coordinate finishes', 'Confirm paper, print color, foil, embossing and other finishes against the approved dieline and physical samples.'],
      ['Plan packing and transit', 'Review how each item is loaded, retained and removed, then consider outer-carton protection for the intended shipping route.']
    ],
    related: [
      ['Explore perfume and fragrance packaging', '../applications/perfume-fragrance.html'],
      ['View beauty and skincare packaging', '../applications/beauty-skincare.html'],
      ['Read the cosmetic gift box design guide', '../blog/how-to-design-custom-cosmetic-gift-boxes-for-beauty-brands.html']
    ],
    faqs: [
      ['What product details are needed for a beauty gift box insert?', 'Provide the dimensions, weight and orientation of every bottle, jar, tube or accessory. Indicate fragile components, preferred removal points and whether the products will be packed manually or on a line.'],
      ['Can one box hold products of different sizes?', 'Yes. A custom insert can organize products of different sizes when the complete set is defined before structural design and sampling.'],
      ['Which box styles suit perfume discovery sets?', 'Drawer, book-style, lid-and-base and other rigid formats can work for discovery sets. The best structure depends on vial count, presentation sequence, shipping profile and brand direction.'],
      ['When should artwork be finalized?', 'Finalize production artwork after the structure and dieline are approved. This reduces the risk of repositioning graphics when compartment sizes or opening details change.']
    ]
  },
  'applications/chocolate-and-food-packaging.html': {
    heading: 'Prepare a Clear Brief for Premium Food Gift Packaging',
    summary: 'Food gift packaging should be specified around the wrapped product, tray or primary container. Confirm direct-contact requirements separately; the decorative gift box must be developed for the actual packing system.',
    cards: [
      ['Identify the primary pack', 'Clarify whether chocolate, dates, bakery items or other foods are individually wrapped, placed in cups or held in a separate food-contact tray.'],
      ['Define the assortment', 'Provide piece count, product dimensions, weight and arrangement so dividers or inserts can be engineered around the real set.'],
      ['Plan the occasion', 'Retail gifts, Ramadan and Eid sets, Christmas programs and corporate gifts may require different sleeves, messages and presentation sequences.'],
      ['Confirm logistics', 'Review packing location, destination, storage expectations and outer-carton protection before approving the final structure.']
    ],
    related: [
      ['View a chocolate gift box example', '../products/choc-col-01.html'],
      ['Explore Ramadan and Eid packaging', '../holiday-occasions/ramadan-and-eid-packaging.html'],
      ['Explore Christmas packaging', '../holiday-occasions/christmas-packaging.html']
    ],
    faqs: [
      ['Is the decorative gift box intended for direct food contact?', 'That depends on the complete material and packing specification. Buyers should identify whether food is individually wrapped or held in a separate certified primary tray, and confirm applicable food-contact requirements for the destination market.'],
      ['What information is needed to design a chocolate box insert?', 'Provide piece dimensions, count, weight, arrangement, wrapping method and any cups or primary tray. The insert is then developed around the complete packed product.'],
      ['Can the same structure be adapted for seasonal campaigns?', 'Often yes. A proven structure may be adapted with artwork, sleeves or selected decorative details, subject to fit, material and production review.'],
      ['When should shipping protection be evaluated?', 'Evaluate shipping protection during structural development, before final approval. Product fragility, box weight, destination and outer-carton configuration all influence the result.']
    ]
  }
};

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function section(config) {
  const eyebrow = config.eyebrow ? `<p class="text-[10px] font-bold uppercase tracking-[0.24em] text-brandGold mb-4">${config.eyebrow}</p>` : '';
  const cards = config.cards.map(([title, body]) => `
            <article class="bg-brandWhite border border-brandBeige p-6 luxury-shadow">
              <h3 class="font-serif text-xl font-bold mb-3">${title}</h3>
              <p class="text-sm leading-relaxed text-slate-600">${body}</p>
            </article>`).join('');
  const links = config.related.map(([label, href]) => `<a href="${href}" class="text-sm font-semibold text-brandBurgundy border-b border-brandBurgundy/40 hover:text-brandGold hover:border-brandGold transition-colors">${label}</a>`).join('\n              ');
  const faqs = config.faqs.map(([q, a]) => `
            <details class="group bg-brandWhite border border-brandBeige p-5">
              <summary class="font-semibold cursor-pointer list-none flex items-center justify-between gap-4">${q}<span class="text-brandGold text-xl" aria-hidden="true">+</span></summary>
              <p class="mt-4 text-sm leading-relaxed text-slate-600">${a}</p>
            </details>`).join('');
  return `
    <!-- Phase 2 buyer guidance and GEO answers -->
    <section class="bg-brandIvory border-t border-brandBeige py-16 sm:py-20" data-phase2-content="true">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-10">
          ${eyebrow}
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-brandCharcoal">${config.heading}</h2>
          <p class="mt-5 text-base leading-relaxed text-slate-600">${config.summary}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">${cards}
        </div>
        <div class="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-7" aria-label="Related packaging resources">
              ${links}
        </div>
      </div>
    </section>
    <section class="bg-brandWhite py-16 sm:py-20" data-phase2-faq="true">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <p class="text-[10px] font-bold uppercase tracking-[0.24em] text-brandGold mb-4">Buyer Questions</p>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div class="space-y-4">${faqs}
        </div>
        <div class="mt-10 text-center">
          <a href="../contact.html" class="inline-flex items-center justify-center px-7 py-3 bg-brandBurgundy text-brandWhite text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">Send Your Packaging Brief</a>
        </div>
      </div>
    </section>`;
}

function schema(config) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer }
    }))
  };
  return `\n    <script type="application/ld+json" data-phase2-content-schema="true">\n    ${escapeJson(json)}\n    </script>`;
}

for (const [file, config] of Object.entries(pages)) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('data-phase2-content="true"')) {
    throw new Error(`${file} already contains phase 2 content`);
  }
  if (config.title) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${config.title}</title>`);
  }
  if (config.description) {
    html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${config.description}">`);
  }
  if (config.intro) {
    const h1Pattern = /(<h1[^>]*>[^<]*<\/h1>)/;
    html = html.replace(h1Pattern, `$1\n            <p class="mt-5 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-brandIvory\/75">${config.intro}</p>`);
  }
  html = html.replace('</head>', `${schema(config)}\n</head>`);
  html = html.replace('</main>', `${section(config)}\n</main>`);
  fs.writeFileSync(file, html);
  console.log(`Optimized ${file}`);
}
