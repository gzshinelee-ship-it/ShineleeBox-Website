(() => {
  // Direct extraction - find all text in review containers
  const results = [];
  
  // Find all review containers
  const containers = document.querySelectorAll('div[data-cel-widget*="customer_review"]');
  
  containers.forEach((c, i) => {
    if (i > 10) return;
    // Try to get all text content
    const allText = c.textContent.trim().substring(0, 1000);
    // Get rating
    const ratingMatch = allText.match(/(\d+(\.\d+)?)\s*out of 5/);
    const rating = ratingMatch ? ratingMatch[0] : '';
    
    results.push({ idx: i, rating, text: allText });
  });
  
  return { total: containers.length, results };
})()