
(async () => {
    function getLCP() {
        return new Promise((resolve) => {
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                resolve(lastEntry.startTime);
            }).observe({ type: 'largest-contentful-paint', buffered: true });
            
            // Timeout if no LCP
            setTimeout(() => resolve(null), 5000);
        });
    }

    const title = document.title;
    const metaDescription = document.querySelector('meta[name="description"]')?.content || "";
    const h1 = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()).join(" | ");
    
    const bodyText = document.body.innerText;
    const wordCount = bodyText.split(/\s+/).length;
    const keyword = "advent calendar";
    const keywordCount = (bodyText.toLowerCase().match(new RegExp(keyword, 'g')) || []).length;
    const density = ((keywordCount / wordCount) * 100).toFixed(2);

    const lcp = await getLCP();

    return {
        title,
        metaDescription,
        h1,
        wordCount,
        keywordCount,
        density: density + "%",
        lcp: lcp ? (lcp / 1000).toFixed(2) + "s" : "N/A"
    };
})();
