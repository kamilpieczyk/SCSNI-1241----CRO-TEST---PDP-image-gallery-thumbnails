import { h } from 'preact'
import { useState, useEffect, useCallback, useRef } from 'preact/hooks'

import './style.scss'

/**@jsx h */

const MobileProductInfo = () => {
  const [isOpen, setOpen] = useState(false);

  const contentBoxRef = useRef(null);

  const moveDimensionBox = useCallback(() => {
    let dimensionsBox = document.querySelector('.product-dimensions.section-content.js-pdp-section-content');
    dimensionsBox = dimensionsBox.cloneNode(true);
    dimensionsBox.style.display = 'block !important';
    contentBoxRef.current.appendChild(dimensionsBox);
    const img = dimensionsBox.querySelector('.category-tile__thumbnail');
    img.setAttribute('src', img.getAttribute('data-src'));
    
    const handleUkImages = document.querySelectorAll('.page .product-detail .product-info .uk-img');
    handleUkImages.forEach(img => {
      img.setAttribute('src', img.getAttribute('data-src'));
    })
  }, []);

  const moveDescriptionBox = useCallback(() => {
    let descriptionBox = document.querySelector('.product-info.section-content.js-pdp-section-content.row.product-info__row');
    descriptionBox = descriptionBox.cloneNode(true);
    descriptionBox.style.display = 'block !important';
    descriptionBox.style.flexDirection = 'column !important';
    contentBoxRef.current.appendChild(descriptionBox);
  }, []);

  useEffect(() => {
    moveDimensionBox();
    moveDescriptionBox();
  }, []);

  return (
    <div className="col-md-4">
      <h2
        className = {`section-heading is-expandable pdp-fusion__mobile-info ${ isOpen && 'expanded' }`}
        onClick = { () => setOpen(!isOpen) }
      >
        <span>Product Information</span>
      </h2>

      <div
        className = "pdp-fusion__mobile-info__content-box"
        ref = { contentBoxRef }
        style = {{ display: isOpen ? "block" : "none" }}
      ></div>

    </div>
  )
}

export default MobileProductInfo;