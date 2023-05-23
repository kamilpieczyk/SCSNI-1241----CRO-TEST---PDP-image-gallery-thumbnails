import './style.scss'

import { h } from 'preact'
import { useMemo, useEffect, useState, useRef } from 'preact/hooks'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar, Mousewheel } from 'swiper'

import Tile from './tile'

/** @jsx h */

const RangeSlider = () => {
  const [visibleTilesNo, setVisibleTilesNo] = useState(3);
  const [range, setRange] = useState('');
  const [rangeLink, setRangeLink] = useState('');
  const [data, setData] = useState([]);
  const [isBegining, setBegining] = useState(true);
  const [isEnd, setEnd] = useState(false);

  const swiperRef = useRef();

  const getData = () => {
    const oldRangeCBox = document.querySelector('.product-range');
    const oldRangeContainer = document.querySelector('.product-range__right-col');
    const elements = oldRangeContainer.querySelectorAll('.product-range-card');
    const rangeTitleBox = oldRangeCBox.querySelector('h2')
    let rangeName = '';
    const fullRangeButton = document.querySelector('.btn.btn-primary.product-range__button');
    const rangeHref = fullRangeButton ? fullRangeButton.getAttribute('href') : '/';
    if(rangeTitleBox) {
      const rangeSpan = rangeTitleBox.querySelector('span.range-name');
      if(rangeSpan) rangeName = rangeSpan.textContent;
    }
    setRange(rangeName);
    setRangeLink(rangeHref);

    let rangeArr = [];

    elements.forEach(element => {
      let id = '';
      let link = '';
      const addToBasketButton = element.querySelector('.add-to-cart-range');
      const linkElement = element.querySelector('.product-range-card__info-item h3 a');
      
      if (linkElement) {
        link = linkElement.getAttribute('href');
      }
      
      if (addToBasketButton) {
        id = addToBasketButton.getAttribute('data-pid');
      }

      const gaAttribute = element.getAttribute('data-product-ga-data');
      const dimentionsBox = element.querySelectorAll('.product-range-card__measurement-data');
      const { id: wishlistID, name, brand, price } = JSON.parse(gaAttribute);
      const width = dimentionsBox[0].innerText;
      const height = dimentionsBox[1].innerText;
      const depth = dimentionsBox[2].innerText;
      let wasPrice = null;
      const image = element.querySelector('.product-range-card__image.tile-image.lozad').getAttribute('data-background-image');
      const wasContainer = element.querySelector('span.pdp-price-mid-hide.strike-through.vwostrikethrough.list.product-pricing__was');
      const button = element.querySelector('.add-to-cart-range');
      const dataAdid = button.getAttribute('data-adid');
      if (wasContainer) {
        const wasBox = wasContainer.querySelector('.product-pricing__now-value-main');
        if(wasBox) wasPrice = wasBox.textContent;
      }
      
      const elementData = {id, wishlistID, name, brand, price, wasPrice, width, height, depth, image, button, dataAdid, link}
      rangeArr.push(elementData);
    });

    setData(rangeArr);
  }
  
  const handleNumberTilesOnResize = () => {
    if (window.matchMedia('(max-width: 870px)').matches) {
      setVisibleTilesNo(1.6);
    }
    else if (window.matchMedia('(max-width: 1000px)').matches) {
      setVisibleTilesNo(2);
    }
    else if (window.matchMedia('(max-width: 1100px)').matches) {
      setVisibleTilesNo(2.2);
    }
    else if (window.matchMedia('(max-width: 1245px)').matches) {
      setVisibleTilesNo(2.6);
    }
    else {
      setVisibleTilesNo(3);
    }
  }

  const handleColorChange = (e) => {
    setTimeout(getData, 2000)
  }

  useEffect(() => {
    getData();
    handleNumberTilesOnResize();
    window.addEventListener('resize', handleNumberTilesOnResize);
    window.addEventListener('color-change', handleColorChange);
  }, [])

  useEffect(() => {
    swiperRef.current?.on('slideChange', (e) => {
      setBegining(e.isBeginning);
      setEnd(e.isEnd);
    })
  }, [swiperRef.current])

  return(
    <div class="range-section-container">
      <div className="container" style="overflow: hidden">
        <div class="range-section__scroll-action-buttons-container container">
          <button id={`range-section-button-prev`} className={`${!isBegining && 'active'}`} style="transform: rotate(180deg)" onClick={() => {
            swiperRef.current && swiperRef.current.slidePrev();
          }}>
            <img src="https://useruploads.visualwebsiteoptimizer.com/useruploads/530451/images/f6448add99f83aeb73d1176527887e95_iconarrow.svg" alt="arrow-icon" />
          </button>
          
          <button id="range-section-button-next" className={`${!isEnd && 'active'}`} onClick={ () => {
            swiperRef.current && swiperRef.current.slideNext();
          }}>
            <img src="https://useruploads.visualwebsiteoptimizer.com/useruploads/530451/images/f6448add99f83aeb73d1176527887e95_iconarrow.svg" alt="arrow-icon" />
          </button>
        </div>
        <h2>
        Shop the {range.charAt(0).toUpperCase() + range.slice(1)} range
        </h2>

        <Swiper
          slidesPerView={visibleTilesNo}
          spaceBetween={16}
          modules={[ Navigation ]}
          className='dy-range-swiper-container'
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
        >
          {
            data.map(tile => (
              <SwiperSlide>
                <Tile {...tile}/>
              </SwiperSlide>
            ))
          }
        </Swiper>

        <div class="product-range__scroll-bar">
          <div class="product-range__scroll-bar__finger"></div>
        </div>
        <div class="product-range__action-buttons">
          <a href={rangeLink} class="product-range__action-buttons__ful-range-button">
            See the full {range.charAt(0).toUpperCase() + range.slice(1)} range
          </a>
        </div>
      </div>
    </div>
  )
}

export default RangeSlider