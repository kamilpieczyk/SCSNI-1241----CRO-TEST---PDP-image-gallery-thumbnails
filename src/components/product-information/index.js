import { h } from 'preact'
import { useEffect, useCallback, useState } from 'preact/hooks'

import ProductController from '@controllers/product.controller'

import './style.scss'


/** @jsx h */

const ProductInformation = () => {
  const [show, setShow] = useState(true);
  const [isMobile, setMobile] = useState(false);

  const product = new ProductController();

  const handleSeeMoreClick = useCallback(() => {
    const element = document.querySelector('.pdp-guideprice-section');

    if (show) {
      element.style.display = "block";
      window.dispatchEvent(new Event('seeFullProductDescription'));
    }
    else 
      element.style.display = "none";
    
    setShow(!show);
  });

  useEffect(() => {
    if (window.matchMedia('(max-width: 769px)').matches) {
      setMobile(true);
    }

    window.addEventListener('resize', () => {
      if (window.matchMedia('(max-width: 769px)').matches)
        setMobile(true);
      else
        setMobile(false);
    })
  }, [])

  useEffect(() => {
    window.addEventListener('seeFullProductDescription', () => {
      setShow(false);
    });

    window.addEventListener('hideProductDescription', () => {
      setShow(true);
    });
  }, []);

  return (
    <div
      className="pdp-plp-fusion__product-information"
      style={{ display: isMobile ? 'none' : 'block' }}
    >
      <h2 
        // style={{ display: show ? "block" : "none", }}
      >
        Product Information
      </h2>
      <p
        style={{ display: show ? "block" : "none", }}
      >
        { product.productDescriptionShort }
      </p>
      <a
        onClick={handleSeeMoreClick}
        style={{ display: show ? 'block' : 'none' }}
      >
        See more
      </a>
    </div>
  )
}

export default ProductInformation;