import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import './style.scss'

/** @jsx h */

const Reviews = () => {
  const [isVisible, setVisible] = useState(false);

  const handleMoveReviews = () => {
    const reviewsBox = document.querySelector('.pdp-reviews-section');
    const fusionReviewsBox = document.querySelector('.pdp-fusion__reviews-box');

    fusionReviewsBox.appendChild(reviewsBox);
  }

  const handleButtonClick = () => {
    const reviewsBox = document.querySelector('.pdp-reviews-section');

    if (reviewsBox && reviewsBox.classList.contains('d-none')) {
      reviewsBox.classList.remove('d-none')
    }
    else if (reviewsBox) {
      reviewsBox.classList.add('d-none')
    }

    if (isVisible) {
      setVisible(false);
    }
    else {
      setVisible(true);
    }

    setTimeout(() => {
      const reviewsBox = document.querySelector('.bv-content-list-reviews');

      if (reviewsBox) {
        const top = reviewsBox.offsetTop;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100)
  }

  useEffect(() => {
    // handleMoveReviews();
    const reviewsBox = document.querySelector('.pdp-reviews-section');
    reviewsBox.classList.add('d-none')
  }, [])

  return (
    <div className="pdp-fusion__reviews">
      <div className="pdp-fusion__reviews-box" style={{ display: isVisible ? 'block' : 'none' }}></div>
      <button onClick={handleButtonClick}>
        {
          isVisible
            ? (
              <div>
                Hide reviews
                <img
                  src="https://cdn-eu.dynamicyield.com/api/9878419/images/344ee1a5944d6__icon--arrow.svg"
                  alt="arrow-down"
                  style={{transform: 'rotate(180deg)'}}
                />
              </div>
            )
            : (
              <div>
                Read reviews
                <img
                  src="https://cdn-eu.dynamicyield.com/api/9878419/images/344ee1a5944d6__icon--arrow.svg"
                  alt="arrow-down"
                />
              </div>
            )
        }
      </button>
    </div>
  )
}

export default Reviews
