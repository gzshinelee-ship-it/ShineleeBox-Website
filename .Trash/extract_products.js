(() => {
  const results = [];
  const items = document.querySelectorAll('[data-asin]:not([data-asin=""])');
  items.forEach((item, idx) => {
    const asin = item.dataset.asin;
    const titleEl = item.querySelector('h2 a, h2 span');
    const ratingEl = item.querySelector('.a-icon-alt, [aria-label*="stars"]');
    const reviewsEl = item.querySelector('[aria-label*="stars"] + span, .a-size-small .a-link-normal');
    const priceEl = item.querySelector('.a-price .a-offscreen');
    const linkEl = item.querySelector('h2 a');
    
    if (asin && titleEl && idx < 15) {
      results.push({
        idx,
        asin,
        title: (titleEl.textContent || titleEl.innerText || '').trim(),
        rating: ratingEl ? (ratingEl.textContent || ratingEl.getAttribute('aria-label') || '').trim() : '',
        reviews: reviewsEl ? (reviewsEl.textContent || '').trim() : '',
        price: priceEl ? (priceEl.textContent || '').trim() : '',
        link: linkEl ? linkEl.href : ''
      });
    }
  });
  return results;
})()