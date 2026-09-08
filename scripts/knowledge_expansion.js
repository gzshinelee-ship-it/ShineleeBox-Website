const standardBrief = [
  'Product dimensions, filled weight and presentation orientation',
  'Order quantity, destination country and required delivery date',
  'Preferred structure, material, insert and decorative finish',
  'Logo artwork, dieline, sketch or AI-generated concept',
  'Packing method, shipping route and compliance requirements'
];

const definitions = [
  ['What Is Luxury Rigid Packaging?','what-is-luxury-rigid-packaging','Packaging Basics','Luxury rigid packaging uses a stiff paperboard structure wrapped with printed or specialty paper to create a durable presentation box. Unlike a folding carton, it normally arrives assembled and holds its shape. Luxury depends on fit, finish, opening experience and product protection—not board thickness alone.',['Lid-and-base rigid box','Magnetic book-style box','Drawer rigid box']],
  ['How to Choose a Packaging Insert','how-to-choose-a-packaging-insert','Packaging Engineering','Choose a packaging insert from the product’s geometry, filled weight, fragile surfaces, presentation position, removal method and shipping risk. Paperboard, molded pulp, PET, EPE and EVA provide different appearance, retention and end-of-life characteristics. Final selection requires a physical fit sample using the real product.',['Paper or paperboard insert','PET or molded tray','EPE or EVA foam']],
  ['24-Day vs 12-Day Advent Calendar','24-day-vs-12-day-advent-calendar','Advent Calendar','A 24-day Advent calendar provides a longer daily countdown and needs more products, cavities, artwork and packing operations. A 12-day calendar is usually more compact and can support larger products or a lower total project cost. The right format depends on campaign timing, assortment and target retail price.',['24-day calendar','12-day calendar','Mixed-size countdown']],
  ['How Much Does a Custom Advent Calendar Cost?','how-much-does-a-custom-advent-calendar-cost','Advent Calendar','A custom Advent calendar has no reliable fixed price before the assortment and specification are defined. Cost depends on box dimensions, number and size of cavities, structure, materials, printing, finishes, insert type, assembly, packing quantity and delivery terms. A filled product map is required for an accurate quotation.',['Drawer calendar','Perforated-door calendar','Rigid book or chest calendar']],
  ['Reusable Beauty Packaging Ideas','reusable-beauty-packaging-ideas','Beauty Packaging','Reusable beauty packaging gives the box a credible function after the cosmetics are removed, such as organizing skincare, brushes, samples or jewelry. Useful reuse normally requires durable surfaces, accessible compartments and removable or adaptable inserts. Reuse should be designed and tested rather than assumed from a premium appearance.',['Removable-insert rigid box','Drawer beauty organizer','Refill or discovery-set case']],
  ['Chocolate Box Size Guide','chocolate-box-size-guide','Gourmet Packaging','Chocolate box size must be calculated from the actual chocolate dimensions, piece count, arrangement, wrappers or cups, removal clearance and lid clearance. Net weight alone is not enough because shapes and decorations change the occupied volume. Confirm the final size with real chocolates in a physical sample.',['Single-layer grid','Multi-layer assortment','Radial or custom layout']],
  ['Best Inserts for Chocolate Packaging','best-inserts-for-chocolate-packaging','Gourmet Packaging','The best chocolate insert safely separates the pieces, supports presentation and uses an appropriate food-contact layer for the intended market. Food-grade paper cups, paperboard grids and formed trays suit different shapes and packing processes. Greyboard is structural and normally should not directly contact unwrapped chocolate.',['Food-grade paper cups and grid','Food-contact PET tray','Individually wrapped pieces with divider']],
  ['How to Package Medjool Dates','how-to-package-medjool-dates','Gourmet Packaging','Package Medjool dates from their actual size range, piece count, filled weight and moisture or oil-control needs. Large dates require more cavity volume than smaller varieties at the same net weight. Use a suitable food-contact cup, tray, liner or individual wrap and confirm capacity with a filled sample.',['Individual cups','Grid compartments','Radial premium assortment']],
  ['Custom Packaging Sampling Explained','custom-packaging-sampling-explained','Buyer Guide','A custom packaging sample verifies structure, product fit, opening, insert retention, dimensions and visual direction before mass production. A structural white sample may come before a printed sample. ShineleeBox generally offers free sampling for eligible projects, with typical sample development taking 5–7 days after requirements are confirmed.',['White structural sample','Digitally printed sample','Production-standard sample']],
  ['What Does FSC Mean for Custom Packaging?','what-does-fsc-mean-for-custom-packaging','Buyer Guide','FSC certification relates to responsible forest-based material sourcing and chain-of-custody controls; it does not automatically make every package FSC-certified. Buyers should confirm the supplier’s current certificate scope, eligible materials, labeling approval and transaction documentation for the specific order before making an FSC claim.',['FSC-certified material without label','On-product FSC label','Non-certified material']],
  ['What Does BSCI Mean When Choosing a Packaging Factory?','what-does-bsci-mean-for-packaging-factory','Buyer Guide','amfori BSCI is a social-performance monitoring framework used in global supply chains; it is not a product-quality certificate. Buyers should review the factory’s current audit information, scope and corrective-action status alongside product specifications, quality controls, capacity and other project-specific compliance requirements.',['Current audit review','Corrective-action review','Broader supplier qualification']],
  ['How Long Does Custom Packaging Shipping Take?','how-long-does-custom-packaging-shipping-take','Buyer Guide','Custom packaging shipping time depends on destination, mode, route, customs, season and final delivery terms. ShineleeBox’s current planning estimates are about 25–30 days to the United States and about 50 days to Europe or the Middle East, but each quotation should confirm the actual route and schedule.',['Air or express','Sea freight','Rail or combined transport']]
];

module.exports = definitions.map(([title,slug,cluster,answer,options]) => ({
  title,
  seoTitle: `${title.replace(/\?$/,'')} | ShineleeBox Buyer Guide`,
  slug,
  cluster,
  keywords: [title.replace(/\?/g,'').toLowerCase(),'custom packaging buyer guide',cluster.toLowerCase()],
  standfirst: `${title.replace(/\?$/,'')} explained for brand owners, packaging buyers and product-development teams.`,
  answer,
  points: [
    'Start with the actual product, quantity and distribution requirements.',
    'Separate structural performance from decorative appearance.',
    'Confirm assumptions with a physical sample and written specification.',
    'Review compliance and supplier documents for the specific project.'
  ],
  sections: options.map((option,index) => [
    option,
    `${option} can be considered when it matches the product, presentation goal, packing workflow and project budget.`,
    `Verify dimensions, material behavior, product contact, assembly, transport and the buyer’s destination requirements before approving option ${index+1}.`
  ]),
  brief: standardBrief,
  faq: [
    [`Can ${title.replace(/^(What Is|How to|How Much Does|What Does) /,'').replace(/\?$/,'').toLowerCase()} be confirmed without a sample?`,'A preliminary recommendation is possible, but the final structure, fit and relevant performance claims should be confirmed with a physical sample.'],
    ['What information should a buyer send first?','Send product dimensions and weight, quantity, destination, required date, artwork or concept, and the intended packing method.'],
    ['Does every project start at 50 pieces?','No. From 50 pieces applies only to eligible premium custom projects; structure, materials, processes and specification can require a higher MOQ.']
  ]
}));
