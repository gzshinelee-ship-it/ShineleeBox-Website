const fs = require('fs');
const path = require('path');
const { headTemplate, headerTemplate, footerTemplate } = require('./templates');

function buildBlogPost() {
    const title = "Case Study: How Douglas Fulfilled 300,000 Custom Advent Calendars in 60 Days | ShineleeBox";
    const desc = "Deep dive into the supply chain power of ShineleeBox. How we delivered a massive 300k set campaign for European giant Douglas across 2,000 stores with FSC certification.";
    
    let html = headTemplate(title, desc, '../') + headerTemplate('../');
    
    html += `
    <article class="py-20 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav class="mb-8 text-xs font-bold uppercase tracking-widest text-slate-400">
                <a href="../index.html" class="hover:text-brandGold">Home</a> / <a href="index.html" class="hover:text-brandGold">Blog</a> / Success Stories
            </nav>
            
            <h1 class="font-serif text-4xl sm:text-5xl font-bold text-brandGreen mb-6 leading-tight">
                Scaling for Giants: The Douglas 300,000 Set Success Story
            </h1>
            
            <div class="flex items-center space-x-4 mb-12 border-b border-slate-100 pb-8">
                <div class="w-12 h-12 bg-brandGold rounded-full flex items-center justify-center text-brandGreen font-bold">L</div>
                <div>
                    <p class="text-sm font-bold text-slate-800">By Lisa Xia</p>
                    <p class="text-xs text-slate-500">Sales Director | June 15, 2026</p>
                </div>
            </div>

            <img src="../images/about/about-shinelee.jpg" alt="Douglas Case Study" class="w-full h-96 object-cover rounded-2xl shadow-xl mb-12">

            <div class="prose prose-slate lg:prose-lg max-w-none text-slate-600 leading-relaxed space-y-8">
                <p class="text-xl font-medium text-slate-800 italic border-l-4 border-brandGold pl-6">
                    "Can you deliver 300,000 high-end double-door advent calendars across Europe in just 8 weeks?" 
                </p>
                
                <p>
                    This was the challenge presented to ShineleeBox by **Douglas**, Europe’s leading premium beauty retailer with over 2,000 stores. In the world of B2B packaging, "Scale" is often the enemy of "Precision." But at ShineleeBox, we proved that you can have both.
                </p>

                <h2 class="font-serif text-2xl font-bold text-brandGreen">The Challenge: Massive Volume, Tight Timeline</h2>
                <p>
                    Retail holiday campaigns wait for no one. Douglas required a sophisticated, retail-ready advent calendar structure that featured a double-door magnetic opening and intricate internal drawer systems. The project demanded:
                </p>
                <ul class="list-disc pl-6 space-y-2">
                    <li><strong>300,000 Sets</strong>: Full mass production.</li>
                    <li><strong>60-Day Lead Time</strong>: From final design confirmation to export cargo loading.</li>
                    <li><strong>FSC Compliance</strong>: 100% sustainable paper materials to meet EU environmental standards.</li>
                    <li><strong>Retail-Ready Integrity</strong>: Sturdy enough to be handled in high-traffic city center stores.</li>
                </ul>

                <h2 class="font-serif text-2xl font-bold text-brandGreen">The Shinelee Solution</h2>
                <p>
                    Leveraging our 10,000+ SQM facility in Guangzhou and our team of 150+ skilled specialists, we deployed a multi-stage production strategy:
                </p>
                <div class="bg-brandIvory-dark p-8 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 class="font-bold text-brandGreen mb-2">1. Rapid Dieline & Prototyping</h4>
                        <p class="text-sm">Our 8 senior engineers completed the complex vector dielines within 48 hours, ensuring perfect structural alignment for the 24-day surprise experience.</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-brandGreen mb-2">2. Industrial-Scale Offset Printing</h4>
                        <p class="text-sm">High-speed Heidelberg presses ensured consistent color calibration across all 300,000 units, matching the iconic Douglas branding perfectly.</p>
                    </div>
                </div>

                <h2 class="font-serif text-2xl font-bold text-brandGreen">The Result: A Viral Unboxing Experience</h2>
                <p>
                    The project was delivered on time and within budget. These advent calendars became a centerpiece for Douglas’s winter campaign, generating millions of views across social media as influencers shared their daily unboxing moments.
                </p>

                <div class="bg-brandGreen text-white p-10 rounded-2xl shadow-2xl relative overflow-hidden">
                    <h3 class="font-serif text-2xl font-bold text-brandGold mb-4">Why This Matters for Your Brand?</h3>
                    <p class="mb-6 opacity-90 text-sm">Whether you are a global giant needing 300,000 sets or a boutique brand starting with 500, we apply the same "Douglas-Level" quality standards to every box.</p>
                    <div class="flex flex-wrap gap-4">
                        <a href="../contact.html" class="bg-brandGold text-brandGreen font-bold px-6 py-3 rounded hover:bg-brandGold-light transition-all">Get a Free Dieline Design</a>
                        <a href="../products/advent-calendar-boxes.html" class="border border-white/30 px-6 py-3 rounded hover:bg-white/10 transition-all">Explore Advent Collection</a>
                    </div>
                </div>
            </div>
        </div>
    </article>
    `;
    
    html += footerTemplate('../');
    
    const blogDir = path.join(__dirname, 'blog');
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir);
    fs.writeFileSync(path.join(blogDir, 'douglas-advent-calendar-case-study.html'), html, 'utf8');
}

buildBlogPost();
