(async () => {
  try {
    // Try to fetch reviews via Amazon's internal API
    const asin = 'B08CBBP461';
    const url = `https://www.amazon.ca/product-reviews/${asin}/ref=cm_cr_arp_d_viewopt_sr?filterByStar=critical&pageNumber=1`;
    
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html',
        'Accept-Language': 'en-CA,en;q=0.9',
      },
      credentials: 'include'
    });
    
    const text = await resp.text();
    // Extract reviews using regex
    const reviews = [];
    const reviewRegex = /data-hook="review"[^>]*>[\s\S]*?data-hook="review-title"[^>]*>\s*<span[^>]*>([^<]+)<\/span>[\s\S]*?data-hook="review-body"[^>]*>\s*<span[^>]*>([\s\S]*?)<\/span>/g;
    
    let match;
    while ((match = reviewRegex.exec(text)) !== null) {
      if (reviews.length < 10) {
        reviews.push({
          title: match[1].trim(),
          body: match[2].replace(/<[^>]+>/g, '').trim().substring(0, 500)
        });
      }
    }
    
    return { status: resp.status, reviewCount: reviews.length, reviews };
  } catch(e) {
    return { error: e.message };
  }
})()