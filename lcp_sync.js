
(() => {
    const entries = performance.getEntriesByType('largest-contentful-paint');
    const lcp = entries.length > 0 ? entries[entries.length - 1].startTime : null;
    
    // Fallback: Navigation timing as a proxy for speed if LCP is missing
    const nav = performance.getEntriesByType('navigation')[0];
    const loadEvent = nav ? nav.loadEventEnd : null;

    return {
        lcp: lcp ? (lcp / 1000).toFixed(2) + "s" : "N/A",
        loadEvent: loadEvent ? (loadEvent / 1000).toFixed(2) + "s" : "N/A",
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };
})();
