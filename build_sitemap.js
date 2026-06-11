const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://slpack.net';

// Helper to format date as YYYY-MM-DD
function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function generateSitemap() {
    console.log("Generating sitemap.xml...");
    
    const sitemapEntries = [];
    const scanDirs = [
        { dir: '', prefix: '' },
        { dir: 'products', prefix: 'products/' },
        { dir: 'applications', prefix: 'applications/' },
        { dir: 'holiday-occasions', prefix: 'holiday-occasions/' },
        { dir: 'blog', prefix: 'blog/' }
    ];

    const todayStr = formatDate(new Date());

    scanDirs.forEach(({ dir, prefix }) => {
        const fullPath = path.join(__dirname, dir);
        if (!fs.existsSync(fullPath)) return;

        const files = fs.readdirSync(fullPath);
        files.forEach(file => {
            if (!file.endsWith('.html')) return;
            
            // Skip index.html under root since we index it as base domain, but we can list it or index it as /index.html
            // Standard SEO prefers / as root, and lists other pages
            let relativeUrl = prefix + file;
            if (relativeUrl === 'index.html') {
                relativeUrl = ''; // root /
            }

            const filePath = path.join(fullPath, file);
            const stats = fs.statSync(filePath);
            const lastMod = formatDate(stats.mtime);

            // Determine priority & changefreq based on path
            let priority = '0.5';
            let changefreq = 'monthly';

            if (relativeUrl === '') {
                priority = '1.0';
                changefreq = 'daily';
            } else if (relativeUrl === 'about.html' || relativeUrl === 'contact.html') {
                priority = '0.7';
                changefreq = 'monthly';
            } else if (relativeUrl === 'products/index.html' || relativeUrl === 'applications/index.html' || relativeUrl === 'holiday-occasions/index.html' || relativeUrl === 'blog/index.html') {
                priority = '0.9';
                changefreq = 'weekly';
            } else if (relativeUrl.startsWith('products/')) {
                priority = '0.8';
                changefreq = 'weekly';
            } else if (relativeUrl.startsWith('applications/') || relativeUrl.startsWith('holiday-occasions/')) {
                priority = '0.8';
                changefreq = 'weekly';
            } else if (relativeUrl.startsWith('blog/')) {
                priority = '0.6';
                changefreq = 'monthly';
            }

            sitemapEntries.push({
                url: `${DOMAIN}/${relativeUrl}`,
                lastMod,
                changefreq,
                priority
            });
        });
    });

    // Construct XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    sitemapEntries.forEach(entry => {
        xml += '  <url>\n';
        xml += `    <loc>${entry.url}</loc>\n`;
        xml += `    <lastmod>${entry.url.endsWith('/') ? todayStr : entry.lastMod}</lastmod>\n`;
        xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
        xml += `    <priority>${entry.priority}</priority>\n`;
        xml += '  </url>\n';
    });
    
    xml += '</urlset>\n';

    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
    console.log(`🎉 sitemap.xml successfully generated with ${sitemapEntries.length} pages!`);
}

generateSitemap();
