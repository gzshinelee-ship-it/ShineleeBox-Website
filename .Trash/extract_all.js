(() => {
  const results = [];
  const items = document.querySelectorAll('[data-asin]:not([data-asin=""])');
  items.forEach((item, idx) => {
    const asin = item.dataset.asin;
    const titleEl = item.querySelector('h2 a, h2 span');
    const ratingEl = item.querySelector('.a-icon-alt, [aria-label*="stars"]');
    const reviewsCountEl = item.querySelector('.a-size-small .a-link-normal, [data-cy="reviews-block"] .a-size-small');
    const priceEl = item.querySelector('.a-price .a-offscreen, .a-price span[aria-hidden]');
    const linkEl = item.querySelector('h2 a, a.a-link-normal[href*="/dp/"]');
    
    if (asin && titleEl) {
      const title = (titleEl.textContent || titleEl.innerText || '').trim();
      const rating = ratingEl ? (ratingEl.textContent || ratingEl.getAttribute('aria-label') || '').trim() : '';
      const reviews = reviewsCountEl ? (reviewsCountEl.textContent || '').trim().replace(/[()]/g, '') : '';
      const price = priceEl ? (priceEl.textContent || '').trim() : '';
      const link = linkEl ? linkEl.href : `https://www.amazon.ca/dp/${asin}`;
      
      results.push({ idx, asin, title, rating, reviews, price, link });
    }
  });
  return { total: results.length, results };
})()