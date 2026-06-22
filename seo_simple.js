
(() => {
    const title = document.title;
    const metaDescription = document.querySelector('meta[name="description"]')?.content || "";
    const h1 = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()).join(" | ");
    
    const bodyText = document.body.innerText;
    const wordCount = bodyText.split(/\s+/).length;
    const keyword = "advent calendar";
    const keywordCount = (bodyText.toLowerCase().match(new RegExp(keyword, 'g')) || []).length;
    const density = ((keywordCount / wordCount) * 100).toFixed(2);

    return {
        title,
        metaDescription,
        h1,
        wordCount,
        keywordCount,
        density: density + "%"
    };
})();
