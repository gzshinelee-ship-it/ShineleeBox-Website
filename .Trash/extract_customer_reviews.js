(() => {
  // Find all review elements
  const reviews = [];
  
  // Try multiple selectors for review cards
  const reviewCards = document.querySelectorAll('[data-hook="review"], .review.aok-relative');
  
  reviewCards.forEach((card, i) => {
    const titleEl = card.querySelector('[data-hook="review-title"] span:nth-child(2), .review-title-content span');
    const bodyEl = card.querySelector('[data-hook="review-body"] span, .review-text-content span');
    const ratingEl = card.querySelector('[data-hook="review-star-rating"] .a-icon-alt, .a-icon-star .a-icon-alt');
    const dateEl = card.querySelector('[data-hook="review-date"]');
    
    const title = titleEl ? titleEl.textContent.trim() : '';
    const body = bodyEl ? bodyEl.textContent.trim().substring(0, 800) : '';
    const rating = ratingEl ? (ratingEl.textContent || '').trim() : '';
    const date = dateEl ? dateEl.textContent.trim() : '';
    
    reviews.push({ title, rating, date, body });
  });
  
  // Also try the cr-review-list approach
  if (reviews.length === 0) {
    const reviewDivs = document.querySelectorAll('#cm-cr-dp-review-list > div, [data-cel-widget*="customer_review"]');
    reviewDivs.forEach(div => {
      const titleEl = div.querySelector('.review-title span');
      const bodyEl = div.querySelector('.review-text span');
      const ratingEl = div.querySelector('.a-icon-star .a-icon-alt');
      const title = titleEl ? titleEl.textContent.trim() : '';
      const body = bodyEl ? bodyEl.textContent.trim().substring(0, 800) : '';
      const rating = ratingEl ? ratingEl.textContent.trim() : '';
      if (body) reviews.push({ title, rating, body });
    });
  }
  
  return { count: reviews.length, reviews: reviews.slice(0, 15) };
})()