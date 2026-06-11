const fs = require('fs');
const path = require('path');
const { headTemplate, headerTemplate, footerTemplate } = require('./templates');

function buildContactPage() {
    const title = "Get a Free Sample & Quote in 24 Hours | ShineleeBox";
    const desc = "Fill out our high-converting inquiry form to get custom advent calendars, rigid box samples, and factory-direct wholesale pricing from Guangzhou Shinelee Paper Product Co., Ltd.";
    
    let html = headTemplate(title, desc) + headerTemplate();
    
    html += `
    <!-- Header Hero Banner -->
    <section class="bg-brandGreen text-white py-16 border-b border-brandGold-dark">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <span class="text-xs font-semibold text-brandGold uppercase tracking-widest">Connect with Direct Manufacturer</span>
            <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-1">Get Free Design Mockup & Custom Quote</h1>
            <p class="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl font-light">
                Let us know your packaging requirements. Guangzhou Shinelee Paper Product Co., Ltd. provides fast dielines, physical sampling, and factory direct quotes.
            </p>
        </div>
    </section>

    <!-- Main Container -->
    <section class="py-16 bg-brandIvory">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                <!-- Left: Sales Consultant Profile & Benefits -->
                <div class="lg:col-span-4 space-y-8">
                    <!-- Lisa Profile Card -->
                    <div class="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-4">
                        <div class="flex items-center space-x-4">
                            <div class="w-16 h-16 rounded-full bg-brandGreen flex items-center justify-center text-white text-xl font-bold border-2 border-brandGold shadow">
                                L
                            </div>
                            <div>
                                <h3 class="font-serif text-lg font-bold text-brandGreen">Lisa</h3>
                                <p class="text-xs text-brandGold font-semibold">Sales Director</p>
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 mt-1">
                                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span> Online - Quick Reply
                                </span>
                            </div>
                        </div>
                        <p class="text-slate-600 text-xs leading-relaxed">
                            "Hi, I'm Lisa, your dedicated luxury packaging consultant. Share your project parameters below, and I'll personally evaluate your structure and respond with a free design layout and direct factory price."
                        </p>
                        <div class="pt-2 border-t border-slate-50">
                            <a href="https://wa.me/8618818840878?text=Hi%20Lisa,%20I'm%20visiting%20slpack.net%20and%20want%20to%20get%20a%20free%20packaging%20quote..." 
                               target="_blank"
                               class="flex items-center justify-center px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-md shadow-sm transition-all">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.59 1.97 14.113.945 11.993.945 6.558.945 2.13 5.31 2.127 10.74c-.001 1.722.506 3.4 1.467 4.908l-.969 3.541 3.63-.953z"/></svg>
                                Prefer instant reply? Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    <!-- Factory Core Commitments -->
                    <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-brandGold/10 text-brandGold-dark text-sm font-bold mt-0.5">1</span>
                            <div>
                                <h4 class="font-serif font-bold text-brandGreen text-sm">Low MOQ Support</h4>
                                <p class="text-xs text-slate-500 leading-relaxed">Mass customization starts from just 50 PCS for selected structures, keeping your initial trial risk minimal.</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-brandGold/10 text-brandGold-dark text-sm font-bold mt-0.5">2</span>
                            <div>
                                <h4 class="font-serif font-bold text-brandGreen text-sm">Rapid Dieline & Layout</h4>
                                <p class="text-xs text-slate-500 leading-relaxed">Our in-house packaging engineers deliver tailored custom dielines within 24-48 hours after size confirmation.</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-brandGold/10 text-brandGold-dark text-sm font-bold mt-0.5">3</span>
                            <div>
                                <h4 class="font-serif font-bold text-brandGreen text-sm">Direct Factory Control</h4>
                                <p class="text-xs text-slate-500 leading-relaxed">Disney FAMA, BSCI, and ISO9001 certified plant in Guangzhou means robust compliance, high margins, and tight QA.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: High-Converting 7-Field Form -->
                <div class="lg:col-span-8 bg-white p-8 rounded-lg border border-slate-100 shadow-md">
                    <div class="mb-8 border-b border-slate-100 pb-5 text-center sm:text-left">
                        <h2 class="font-serif text-2xl sm:text-3xl font-bold text-brandGreen">Free Sample + Quote</h2>
                        <p class="text-brandGold font-serif text-lg font-semibold mt-1">Receive in 24 Hours</p>
                    </div>

                    <form id="inquiryForm" class="space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <!-- Field 1: Name -->
                            <div>
                                <label for="userName" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Your Name *</label>
                                <input type="text" id="userName" required placeholder="John Smith" 
                                       class="w-full px-4 py-3 rounded border border-slate-200 text-sm focus:outline-none focus:border-brandGold transition-all">
                            </div>

                            <!-- Field 2: Company -->
                            <div>
                                <label for="companyName" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Company Name</label>
                                <input type="text" id="companyName" placeholder="Your Brand / Company" 
                                       class="w-full px-4 py-3 rounded border border-slate-200 text-sm focus:outline-none focus:border-brandGold transition-all">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <!-- Field 3: Email -->
                            <div>
                                <label for="userEmail" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address *</label>
                                <input type="email" id="userEmail" required placeholder="john@company.com" 
                                       class="w-full px-4 py-3 rounded border border-slate-200 text-sm focus:outline-none focus:border-brandGold transition-all">
                            </div>

                            <!-- Field 4: Phone / WhatsApp -->
                            <div>
                                <label for="userPhone" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">WhatsApp / Phone *</label>
                                <input type="text" id="userPhone" required placeholder="+1 234 567 8900" 
                                       class="w-full px-4 py-3 rounded border border-slate-200 text-sm focus:outline-none focus:border-brandGold transition-all">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <!-- Field 5: Product Type Dropdown -->
                            <div>
                                <label for="productType" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Product Type *</label>
                                <select id="productType" required
                                        class="w-full px-4 py-3 rounded border border-slate-200 text-sm focus:outline-none focus:border-brandGold bg-white transition-all">
                                    <option value="">Select box type...</option>
                                    <option value="Advent Calendar Box">Custom Advent Calendar Box</option>
                                    <option value="Interactive Sound Box">Interactive Music / Sound Box</option>
                                    <option value="LED Light-Up Gift Box">LED Light-Up Gift Box</option>
                                    <option value="Magnetic Rigid Gift Box">Magnetic Closure Rigid Box</option>
                                    <option value="Drawer Sliding Gift Box">Drawer Sliding Gift Box</option>
                                    <option value="Custom Shape Specialty Box">Custom Shape Box</option>
                                    <option value="Luxury Gift Set Collection">Luxury Gift Set Packaging</option>
                                </select>
                            </div>

                            <!-- Field 6: Estimated Quantity Dropdown -->
                            <div>
                                <label for="estimatedQuantity" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Estimated Quantity *</label>
                                <select id="estimatedQuantity" required
                                        class="w-full px-4 py-3 rounded border border-slate-200 text-sm focus:outline-none focus:border-brandGold bg-white transition-all">
                                    <option value="">Select quantity...</option>
                                    <option value="50 - 200 pcs">50 - 200 pcs (Low MOQ)</option>
                                    <option value="200 - 500 pcs">200 - 500 pcs</option>
                                    <option value="500 - 1000 pcs">500 - 1000 pcs</option>
                                    <option value="1000+ pcs">1000+ pcs</option>
                                </select>
                            </div>
                        </div>

                        <!-- Field 7: Additional Requirements -->
                        <div>
                            <label for="customRequirements" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Custom Requirements / Tell Us More</label>
                            <textarea id="customRequirements" rows="4" placeholder="Box size, color, special finish, intended use... Any details help us quote faster." 
                                      class="w-full px-4 py-3 rounded border border-slate-200 text-sm focus:outline-none focus:border-brandGold transition-all"></textarea>
                        </div>

                        <!-- Logo / Reference File Slot -->
                        <div>
                            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Upload Logo / Reference Image (Optional)</label>
                            <div class="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-brandGold transition-all cursor-pointer bg-slate-50 relative">
                                <input type="file" id="refFile" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full">
                                <svg class="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                                <span class="block text-xs font-bold text-slate-700">Click to upload PNG, AI, PDF (Max 10MB)</span>
                                <span id="fileName" class="block text-[10px] text-brandGold-dark mt-1 font-semibold">No file selected</span>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div>
                            <button type="submit" 
                                    class="w-full py-4 bg-brandGold hover:bg-brandGold-light text-brandGreen-dark font-bold uppercase tracking-wider text-sm rounded transition-all shadow-md flex items-center justify-center space-x-2">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                                <span>Send My Request — Free & No Commitment</span>
                            </button>
                            <span class="block text-[10px] text-slate-400 text-center mt-3">
                                🔒 Your information is safe. We respond within 24 hours on business days.
                            </span>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </section>

    <!-- Success Modal -->
    <div id="successModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs hidden items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-4">
            <div class="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 class="font-serif text-2xl font-bold text-brandGreen">Inquiry Sent Successfully!</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
                Thank you for your request. Lisa, our Sales Director, has received your packaging parameters and will prepare your factory direct quote and custom dieline within 24 hours.
            </p>
            <button onclick="document.getElementById('successModal').style.display='none'"
                    class="w-full py-3 bg-brandGreen text-white font-bold rounded hover:bg-brandGreen-light transition-all text-sm">
                Close Window
            </button>
        </div>
    </div>

    <!-- Active Prefilling JavaScript -->
    <script>
        // File upload label update
        const refFileInput = document.getElementById('refFile');
        refFileInput.addEventListener('change', function() {
            const fileNameSpan = document.getElementById('fileName');
            if (this.files && this.files.length > 0) {
                fileNameSpan.textContent = "Selected: " + this.files[0].name;
            } else {
                fileNameSpan.textContent = "No file selected";
            }
        });

        // Dynamic Query prefilling
        window.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const productParam = urlParams.get('product');
            const categoryParam = urlParams.get('category');
            const subjectParam = urlParams.get('subject');

            const productTypeSelect = document.getElementById('productType');
            const customReqs = document.getElementById('customRequirements');

            if (productParam) {
                customReqs.value = "Inquiry details regarding Product ID: " + productParam + ". Please provide standard pricing options, template dielines, and sampling lead times.";
                // Try selecting matching category
                if (productParam.startsWith('IP-')) {
                    if (productParam === 'IP-001' || productParam === 'IP-003' || productParam === 'IP-004' || productParam === 'IP-005' || productParam === 'IP-007') {
                        productTypeSelect.value = "LED Light-Up Gift Box";
                    } else if (productParam === 'IP-002' || productParam === 'IP-006') {
                        productTypeSelect.value = "Interactive Sound Box";
                    }
                } else if (productParam.startsWith('AC-')) {
                    productTypeSelect.value = "Advent Calendar Box";
                }
            } else if (categoryParam) {
                if (categoryParam === 'advent-calendars') {
                    productTypeSelect.value = "Advent Calendar Box";
                } else if (categoryParam === 'interactive-packaging') {
                    productTypeSelect.value = "LED Light-Up Gift Box";
                } else if (categoryParam === 'magnetic-boxes') {
                    productTypeSelect.value = "Magnetic Rigid Gift Box";
                } else if (categoryParam === 'drawer-boxes') {
                    productTypeSelect.value = "Drawer Sliding Gift Box";
                }
            } else if (subjectParam) {
                customReqs.value = "Inquiry subject: " + decodeURIComponent(subjectParam) + ". Please share catalog models, material recommendations, and price calculations.";
            }
        });

        // Submit mock flow
        document.getElementById('inquiryForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Extract parameters for high-precision analytics
            const productType = document.getElementById('productType').value;
            const estimatedQuantity = document.getElementById('estimatedQuantity').value;
            const pagePath = window.location.pathname;

            console.log('Inquiry Form Submitted:', { productType, estimatedQuantity, pagePath });

            // Push to GTM dataLayer
            if (window.dataLayer) {
                window.dataLayer.push({
                    'event': 'form_submission',
                    'event_category': 'conversion',
                    'event_label': 'Contact Form Submission',
                    'product_type': productType,
                    'estimated_quantity': estimatedQuantity,
                    'page_path': pagePath
                });
            }

            // Push directly to GA4 (lead generation event)
            if (typeof gtag === 'function') {
                gtag('event', 'generate_lead', {
                    'event_category': 'conversion',
                    'event_label': 'Contact Form Submission',
                    'product_type': productType,
                    'estimated_quantity': estimatedQuantity,
                    'page_path': pagePath
                });
            }

            document.getElementById('successModal').style.display = 'flex';
            this.reset();
            document.getElementById('fileName').textContent = "No file selected";
        });
    </script>
    `;
    
    html += footerTemplate();
    fs.writeFileSync(path.join(__dirname, 'contact.html'), html, 'utf8');
    console.log("contact.html generated successfully!");
}

buildContactPage();
