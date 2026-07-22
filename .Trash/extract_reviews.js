(() => {
  const reviews = [];
  // Try to find review containers
  const reviewContainers = document.querySelectorAll('[data-hook="review"], .review, .celwidget[data-hook="cr-insights-widget"]');
  
  // Get review histogram
  const histogram = {};
  const starRows = document.querySelectorAll('[data-hook="cr-filter-info-review-rating-count"] .a-histogram-row, #histogramTable .a-histogram-row');
  starRows.forEach(row => {
    const starText = row.querySelector('.a-size-base, a')?.textContent?.trim();
    const countText = row.querySelector('.a-size-base:nth-child(3), a .a-size-base')?.textContent?.trim();
    if (starText && countText) {
      histogram[starText] = countText;
    }
  });
  
  // Get review distribution
  const ratingSummary = {};
  const ratingEl = document.querySelector('#acrPopover .a-size-base, [data-hook="rating-out-of-text"]');
  ratingSummary.avgRating = ratingEl ? ratingEl.textContent.trim() : '';
  const totalReviews = document.querySelector('#acrCustomerReviewText');
  ratingSummary.totalReviews = totalReviews ? totalReviews.textContent.trim() : '';
  
  // Get individual reviews visible on page
  const reviewCards = document.querySelectorAll('[data-hook="review"], .a-section.review');
  reviewCards.forEach(card => {
    const titleEl = card.querySelector('[data-hook="review-title"], .review-title span');
    const bodyEl = card.querySelector('[data-hook="review-body"], .review-text');
    const ratingEl = card.querySelector('[data-hook="review-star-rating"], .review-rating .a-icon-alt');
    const dateEl = card.querySelector('[data-hook="review-date"]');
    
    if (bodyEl) {
      reviews.push({
        title: titleEl ? titleEl.textContent.trim() : '',
        rating: ratingEl ? (ratingEl.textContent || ratingEl.getAttribute('aria-label') || '').trim() : '',
        date: dateEl ? dateEl.textContent.trim() : '',
        body: bodyEl.textContent.trim().substring(0, 500)
      });
    }
  });
  
  // Get rating distribution percentages
  const ratingsByStar = {};
  const starBars = document.querySelectorAll('.a-histogram-row a');
  starBars.forEach(bar => {
    const href = bar.getAttribute('href') || '';
    const starMatch = href.match(/one_star|two_star|three_star|four_star|five_star/);
    const count = bar.textContent.trim();
    if (starMatch && count) {
      ratingsByStar[starMatch[0]] = count;
    }
  });
  
  return { ratingSummary, histogram, ratingsByStar, reviewCount: reviews.length, reviews: reviews.slice(0, 10) };
})()