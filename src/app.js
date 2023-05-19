import { h, render } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import ProductInformation from '@components/product-information';
import Reviews from '@components/reviews';
import HideFullDescriptionButton from '@components/hide-full-description-button';
import Recommendations from '@/components/recommendations';
import ActionBox from '@components/action-box';
import SelectColorButtons from '@components/select-color-buttons';
import Picker from '@components/picker';
import MobileProductInfo from '@components/mobile-product-information';
import { ColorSliderContextProvider } from '@/context/color-slider.context'

import '@/global-styles/style.scss'

/** @jsx h */

const renderSelectColorButtons = () => {
  const priceContainer = document.querySelector('.prices.product-pricing--pdp.js-prices');

  if (priceContainer) {
    const div = document.createElement('div');
    priceContainer.parentNode.insertBefore(div, priceContainer);

    render(
      <ColorSliderContextProvider>
        <SelectColorButtons />
        <Picker />
      </ColorSliderContextProvider>
    , div);
  }
}

const renderActionBox = () => {
  const carouselContainer = document.querySelector('.pdp-fusion__modify-carousel-container');

  if (carouselContainer) {
    const div = document.createElement('div');
    carouselContainer.appendChild(div);
    render(
      <ColorSliderContextProvider>
        <ActionBox />
      </ColorSliderContextProvider>, 
      div
    );
  }
}

const renderProductInfoAndReccomander = () => {
  const originalSection = document.querySelector('.pdp-guideprice-section');
  const section = document.createElement('section');

  const carouselSection = document.querySelector('.product-primary-carousel');
  const desktopProductInfoContainer = document.createElement('div');
  carouselSection.appendChild(desktopProductInfoContainer);

  section.classList.add('product-information-section');
  section.classList.add('container');

  originalSection.parentNode.insertBefore(section, originalSection.nextSibling);

  const ProductInfoAndReccomander = () => {
    const [isMobile, setMobile] = useState(false);

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

    return (
      <div>
        { isMobile ? <MobileProductInfo /> : <HideFullDescriptionButton />}
        <Recommendations />
      </div>
    )
  }
  
  render(
    <ProductInfoAndReccomander />,
    section
   );

   render(
    <ProductInformation />,
    desktopProductInfoContainer
   )

  originalSection.style.display = 'none';
}

const renderReviews = () => {
  const container = document.createElement('div');
  container.classList.add('pdp-fusion__reviews-container');
  container.classList.add('container');
  document.querySelector('.product-wrapper').appendChild(container);

  render(
    <Reviews />,
    container
  )
}

export default () => {
  window.plpFusion = { isColorChanged: false };
  renderProductInfoAndReccomander();
  renderActionBox();
  renderSelectColorButtons();
  setTimeout(renderReviews, 2000)
}