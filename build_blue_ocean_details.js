const fs = require('fs');

const products = [
    {
        id: "MS-001",
        name: "Custom Eco-friendly Breathable Paper Miswak Sleeve",
        image: "https://sc02.alicdn.com/kf/A591bec9e74a54e2f9db31b855e7e7a84f.png",
        description: "A professional, hygienic ritual solution for Miswak. Our patented breathable paper structure ensures freshness while maintaining a luxury religious aesthetic.",
        features: ["Patented Breathable Structure", "FSC Certified Paper", "Gold Foil Religious Branding", "Moisture-Wicking Interior"],
        specs: { material: "Textured Breathable Paper", finishing: "Gold Foil / UV Spot", size: "Customizable to fit standard Miswak", moq: "500 pcs" }
    },
    {
        id: "HC-001",
        name: "Waterproof Hajj & Umrah Ritual Tracking Cards",
        image: "https://sc02.alicdn.com/kf/Abccb6f158a524a209cd7ddf91081ac44w.png",
        description: "Engineered for the intense environments of Hajj and Umrah. These stone-paper cards are 100% waterproof and sweat-proof, ensuring your ritual progress is safely tracked.",
        features: ["100% Waterproof Stone Paper", "Tear-resistant", "Gold Foil Ritual Steps", "Travel-friendly Size"],
        specs: { material: "Eco-friendly Stone Paper", finishing: "Matte + Gold Foil", size: "10cm x 15cm", moq: "1000 pcs" }
    },
    {
        id: "QS-001",
        name: "Premium Removable Gold Foil Qibla Direction Stickers",
        image: "https://sc02.alicdn.com/kf/A60031bd53c0f48068c785b1cb8809debk.png",
        description: "Luxury Qibla direction stickers for high-end hotels and travel kits. Features a residue-free adhesive and premium gold foil texture that respects the sanctity of the ritual.",
        features: ["Residue-free Removable Adhesive", "High-density Gold Foil", "Surface-safe for Marble/Wood", "Elegant Religious Design"],
        specs: { material: "Specialty Removable Vinyl", finishing: "Mirror Gold Foil", size: "5cm Diameter", moq: "2000 pcs" }
    },
    {
        id: "ZB-001",
        name: "DIY Flat-pack Cardboard Zakat & Sadaqah Charity Box",
        image: "https://sc02.alicdn.com/kf/Aa01b1a1eae274f22be8a3dade38a595b6.png",
        description: "An educational charity box designed to teach kids the spirit of Zakat. Flat-pack design significantly reduces logistics costs and carbon footprint.",
        features: ["Easy DIY Assembly", "100% Recyclable Cardboard", "Educational Illustrations", "Flat-pack Shipping"],
        specs: { material: "350g Recycled Kraft Board", printing: "CMYK Eco-inks", size: "10cm x 10cm x 10cm", moq: "500 pcs" }
    },
    {
        id: "HW-001",
        name: "Professional Hospital Wudu Kit - Sterile Spiritual Care",
        image: "https://sc02.alicdn.com/kf/A7236db9ea38f41bb8e4f8ec8746c0c3bN.png",
        description: "Global first-mover solution for clinical environments. A dry, sterile Tayammum kit that allows patients to fulfill religious obligations safely after surgery.",
        features: ["Sterile Tayammum Pad", "Super-Absorbent Lint-free Paper", "Moisture-proof Resealable Bag", "Medical Grade Compliance"],
        specs: { material: "Compressed Natural Earth + Virgin Pulp", packaging: "Individual Sterile Bag", certification: "ISO 9001 / Halal", moq: "100 sets" }
    }
];

const template = (p) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>` + p.name + ` | SLPACK Surprise Systems</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #F7F3EC; color: #1F1F1F; }
        .serif { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body class="min-h-screen">
    <header class="bg-white border-b border-gray-200 h-20 flex items-center px-8">
        <a href="../index.html" class="flex flex-col">
            <span class="serif text-2xl font-bold">ShineleeBox</span>
            <span class="text-[8px] uppercase tracking-widest text-yellow-600 font-bold -mt-1">Surprise Engineering</span>
        </a>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
            <img src="` + p.image + `" class="w-full h-auto rounded-sm shadow-xl" alt="` + p.name + `">
        </div>
        <div class="space-y-8">
            <span class="text-yellow-600 font-bold uppercase tracking-widest text-[10px]">` + p.id + ` | Blue Ocean Series</span>
            <h1 class="serif text-4xl font-bold leading-tight">` + p.name + `</h1>
            <p class="text-gray-600 leading-relaxed">` + p.description + `</p>
            
            <div class="space-y-4">
                <h3 class="font-bold uppercase tracking-widest text-xs border-b border-gray-200 pb-2">Key Features</h3>
                <ul class="grid grid-cols-1 gap-3">
                    ` + p.features.map(f => `<li class="flex items-center text-sm"><svg class="w-4 h-4 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>` + f + `</li>`).join('') + `
                </ul>
            </div>

            <div class="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                <h3 class="font-bold uppercase tracking-widest text-xs mb-4">Technical Specs</h3>
                <div class="grid grid-cols-2 gap-y-4 text-xs">
                    ` + Object.entries(p.specs).map(([k, v]) => `<div><span class="text-gray-400 uppercase">` + k + `</span><p class="font-semibold">` + v + `</p></div>`).join('') + `
                </div>
            </div>

            <a href="../contact.html" class="inline-block bg-[#5A1F2B] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm hover:opacity-90">Inquire for Wholesale</a>
        </div>
    </main>

    <footer class="bg-[#1F1F1F] text-[#F7F3EC] py-12 text-center text-[10px] font-bold uppercase tracking-[0.4em]">
        ShineleeBox © 2026 — Global Leading Provider of Surprise Systems
    </footer>
</body>
</html>
`;

products.forEach(p => {
    fs.writeFileSync('products/' + p.id.toLowerCase() + '.html', template(p));
});
