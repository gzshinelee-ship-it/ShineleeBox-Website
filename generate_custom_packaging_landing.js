const { headTemplate, headerTemplate, footerTemplate } = require('./templates');

function generateLandingPage() {
    const title = "Custom Advent Calendar Packaging Manufacturer | Wholesale for Brands | ShineleeBox";
    const desc = "Expert manufacturer for custom advent calendar packaging. Supporting luxury beauty, perfume, and chocolate brands with low MOQ 50 pcs, FSC certified materials, and integrated electronics.";
    
    let html = headTemplate(title, desc) + headerTemplate();

    html += `
    <article class="bg-white">
        <!-- B2B Hero Section -->
        <header class="bg-brandGreen text-white py-24 border-b border-brandGold-dark relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1920&q=80" class="w-full h-full object-cover">
            </div>
            <div class="max-w-7xl mx-auto px-4 relative z-10 text-center">
                <span class="inline-block bg-brandGold text-brandGreen-dark px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Factory-Direct B2B Solutions</span>
                <h1 class="font-serif text-4xl sm:text-6xl font-bold mb-6 leading-tight">Custom Advent Calendar Packaging for Brands</h1>
                <p class="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto font-light">Your manufacturing partner for high-engagement, retail-ready countdown packaging. From luxury rigid structures to interactive electronics.</p>
                <div class="mt-10 flex flex-wrap justify-center gap-4">
                    <a href="contact.html?subject=Wholesale%20Custom%20Packaging%20Inquiry" class="bg-brandGold text-brandGreen-dark px-10 py-4 rounded-lg font-bold hover:bg-white transition-all shadow-xl">Start Your Project</a>
                    <a href="products/advent-calendar-boxes.html" class="border border-white/30 text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-all">View All Structures</a>
                </div>
            </div>
        </header>

        <!-- B2B Technical Content -->
        <section class="py-20 max-w-5xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                <div>
                    <h2 class="font-serif text-3xl font-bold text-brandGreen mb-6">Designed for Industry Success</h2>
                    <p class="text-slate-600 mb-6 leading-relaxed">As a leading <strong>advent calendar packaging manufacturer</strong>, ShineleeBox understands the unique requirements of different luxury sectors. We provide structural alignment for:</p>
                    <ul class="space-y-4">
                        <li class="flex items-start"><span class="text-brandGold font-bold mr-3">✓</span> <strong>Beauty & Skincare:</strong> Multi-sized drawers for serums, creams, and samples.</li>
                        <li class="flex items-start"><span class="text-brandGold font-bold mr-3">✓</span> <strong>Perfume & Fragrance:</strong> High-density EVA inserts to secure heavy glass bottles.</li>
                        <li class="flex items-start"><span class="text-brandGold font-bold mr-3">✓</span> <strong>Chocolate & Gourmet Food:</strong> FDA-compliant inserts and grease-proof papers.</li>
                        <li class="flex items-start"><span class="text-brandGold font-bold mr-3">✓</span> <strong>Jewelry & High-Value Gifts:</strong> Velvet-lined drawers with magnetic snap closures.</li>
                    </ul>
                </div>
                <div class="bg-brandIvory p-8 rounded-2xl border border-slate-200">
                    <h3 class="font-serif text-2xl font-bold text-brandGreen mb-6">Manufacturing Specifications</h3>
                    <div class="space-y-4 text-sm">
                        <div class="flex justify-between border-b border-slate-200 pb-2"><span class="font-bold">MOQ:</span><span class="text-slate-500">From 50 PCS</span></div>
                        <div class="flex justify-between border-b border-slate-200 pb-2"><span class="font-bold">Sampling:</span><span class="text-slate-500">5-7 Working Days</span></div>
                        <div class="flex justify-between border-b border-slate-200 pb-2"><span class="font-bold">Days Support:</span><span class="text-slate-500">12 / 24 / 25 / 30 Days</span></div>
                        <div class="flex justify-between border-b border-slate-200 pb-2"><span class="font-bold">Certifications:</span><span class="text-slate-500">Disney FAMA, BSCI, FSC</span></div>
                        <div class="flex justify-between border-b border-slate-200 pb-2"><span class="font-bold">Tech Options:</span><span class="text-slate-500">LED, Music, HD Video Screens</span></div>
                        <div class="flex justify-between pb-2"><span class="font-bold">Shipping:</span><span class="text-slate-500">Global DDP (Delivered Duty Paid)</span></div>
                    </div>
                </div>
            </div>

            <!-- Customization Flow -->
            <div class="bg-brandGreen text-white p-12 rounded-3xl mb-20 text-center relative overflow-hidden">
                <h2 class="font-serif text-3xl font-bold mb-10">Bespoke Manufacturing Process</h2>
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-8">
                    <div class="space-y-4">
                        <div class="text-brandGold text-4xl font-serif italic">01</div>
                        <h4 class="font-bold">Structural Brief</h4>
                        <p class="text-xs text-slate-400">Share your product dimensions and day count.</p>
                    </div>
                    <div class="space-y-4">
                        <div class="text-brandGold text-4xl font-serif italic">02</div>
                        <h4 class="font-bold">Free Dieline</h4>
                        <p class="text-xs text-slate-400">We provide production-ready vector dielines.</p>
                    </div>
                    <div class="space-y-4">
                        <div class="text-brandGold text-4xl font-serif italic">03</div>
                        <h4 class="font-bold">Rapid Sample</h4>
                        <p class="text-xs text-slate-400">Physical prototype with full finishing in 7 days.</p>
                    </div>
                    <div class="space-y-4">
                        <div class="text-brandGold text-4xl font-serif italic">04</div>
                        <h4 class="font-bold">Bulk Delivery</h4>
                        <p class="text-xs text-slate-400">USA DDP shipping directly to your warehouse.</p>
                    </div>
                </div>
            </div>

            <!-- FAQ for B2B -->
            <div class="max-w-3xl mx-auto">
                <h2 class="font-serif text-3xl font-bold text-brandGreen mb-10 text-center">B2B Sourcing FAQ</h2>
                <div class="space-y-8 text-sm">
                    <div class="border-b border-slate-100 pb-6">
                        <h4 class="font-bold text-brandGreen mb-2">Can you handle large-scale holiday campaigns?</h4>
                        <p class="text-slate-500">Yes. We recently fulfilled 300,000 sets in 60 days for Douglas. Our 10,000 SQM facility is built for scale.</p>
                    </div>
                    <div class="border-b border-slate-100 pb-6">
                        <h4 class="font-bold text-brandGreen mb-2">Do you provide custom inserts for fragile items?</h4>
                        <p class="text-slate-500">Absolutely. We offer paper, EVA, and PET custom-fit inserts designed for perfume bottles, glassware, and jewelry.</p>
                    </div>
                    <div class="border-b border-slate-100 pb-6">
                        <h4 class="font-bold text-brandGreen mb-2">Are your materials eco-friendly?</h4>
                        <p class="text-slate-500">ShineleeBox is FSC certified. We offer 100% recyclable rigid boards and sustainable specialty papers.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Final B2B CTA -->
        <section class="bg-brandIvory py-20 text-center border-t border-slate-200">
            <h3 class="font-serif text-3xl font-bold text-brandGreen mb-6">Request Wholesale Pricing & Technical Catalog</h3>
            <p class="text-slate-500 mb-10">Eliminate sourcing risk with an 18-year industry leader.</p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a href="contact.html?subject=B2B%20Advent%20Calendar%20Catalog%20Request" class="bg-brandGreen text-white px-10 py-4 rounded font-bold hover:bg-brandGreen-dark transition-all shadow-lg">Download 2026 Catalog</a>
                <a href="https://wa.me/8618818840878" class="text-brandGreen font-bold flex items-center gap-2 hover:text-brandGold transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.412c-1.935 0-3.83-.502-5.485-1.45L3 21.033l.664-4.818a8.947 8.947 0 01-1.592-5.088c0-4.947 4.032-8.98 8.98-8.98 2.398 0 4.653.935 6.348 2.632a8.916 8.947 0 012.632 6.348c0 4.95-4.031 8.982-8.98 8.982m8.98-17.96A10.74 10.74 0 0011.05 1c-5.952 0-10.05 4.84-10.05 10.79 0 2.215.65 4.385 1.875 6.3L1 23l5.05-1.325c1.865 1.135 4.025 1.735 6.22 1.735 5.95 0 10.79-4.835 10.79-10.785 0-2.855-1.11-5.54-3.125-7.555"/></svg>
                    Direct Chat with lisa
                </a>
            </div>
        </section>
    </article>
    `;

    html += footerTemplate();
    return html;
}

module.exports = generateLandingPage;
