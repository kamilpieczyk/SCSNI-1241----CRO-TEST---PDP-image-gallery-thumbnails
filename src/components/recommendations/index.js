import { h } from 'preact'
import { useMemo, useEffect, useState, useRef } from 'preact/hooks'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar, Mousewheel } from 'swiper'

import ProductController from '@controllers/product.controller'

import './style.scss';
import Tile from './components/tile';
import Arrows from './components/arrows';


/** @jsx h */

const Recommendations = () => {
  const [visibleTilesNo, setVisibleTilesNo] = useState(4);

  const handleTilesNumber = () => {
    if (window.matchMedia('(max-width: 900px)').matches) {
      setVisibleTilesNo(2.4);
    }
    else if (window.matchMedia('(max-width: 1200px)').matches) {
      setVisibleTilesNo(3);
    }
    else {
      setVisibleTilesNo(4);
    }
  }

  useEffect(() => {
    handleTilesNumber();
    window.addEventListener('resize', handleTilesNumber)
  }, [])

  const swiperRef = useRef();

  const product = useMemo(() => new ProductController(), []);

  return (
    <section className="recommended-container">
      <Arrows swiperRef={ swiperRef }/>
      <h3 className="recommended__title">
        You may also like
      </h3>

      <Swiper
        slidesPerView={visibleTilesNo}
        spaceBetween={16}
        modules={[ Scrollbar, Navigation ]}
        scrollbar={{ draggable: true }}
        className='dy-swiper-container'
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
      >
        {
          product.recommendations.map(recommendation => (
            <SwiperSlide key={recommendation.id}>
              <Tile recommendation={recommendation} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </section>
  )
}

export default Recommendations;