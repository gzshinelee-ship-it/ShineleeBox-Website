
(async () => {
    // Force a reload to get fresh performance data in mobile view
    // But since we can't easily wait for reload in a console script, 
    // we'll just try to get the existing LCP or wait a bit.
    
    function getLCP() {
        return new Promise((resolve) => {
            const entries = performance.getEntriesByType('largest-contentful-paint');
            if (entries.length > 0) {
                resolve(entries[entries.length - 1].startTime);
            } else {
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    resolve(entries[entries.length - 1].startTime);
                }).observe({ type: 'largest-contentful-paint', buffered: true });
                setTimeout(() => resolve(null), 3000);
            }
        });
    }

    const lcp = await getLCP();
    return {
        lcp: lcp ? (lcp / 1000).toFixed(2) + "s" : "N/A",
        userAgent: navigator.userAgent,
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };
})();
