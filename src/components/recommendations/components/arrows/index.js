import { h, Ref } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { Swiper } from 'swiper'

import './style.scss'

/** @jsx h */

/**
 * @argument {{ swiperRef: Ref<Swiper> }} props
 * @returns {JSX}
 */
const Arrows = ({ swiperRef }) => {
  const [isBegining, setBegining] = useState(true);
  const [isEnd, setEnd] = useState(false);

  useEffect(() => {
    swiperRef.current?.on('slideChange', (e) => {
      setBegining(e.isBeginning);
      setEnd(e.isEnd);
    })
  }, [swiperRef.current])

  const prev = () => {
    const swiper = swiperRef.current;
    swiper.slidePrev();
  }

  const next = () => {
    const swiper = swiperRef.current;
    swiper.slideNext();
  }

  return (
    <div className = "pdp-fusion__recommender-arrows" >
      <button onClick={prev} className = {`pdp-fusion__recommender-arrows__prev pdp-fusion__recommender-arrow ${isBegining ? '' : 'dy-tab-recommender__arrows-arrow---active'}`}>
        <img
          src="https://useruploads.visualwebsiteoptimizer.com/useruploads/530451/images/f6448add99f83aeb73d1176527887e95_iconarrow.svg"
          alt="arrow-icon"
        />
      </button>

      <button onClick={next} className={`pdp-fusion__recommender-arrows__next pdp-fusion__recommender-arrow ${isEnd ? '' : 'dy-tab-recommender__arrows-arrow---active'}`}>
        <img
          src="https://useruploads.visualwebsiteoptimizer.com/useruploads/530451/images/f6448add99f83aeb73d1176527887e95_iconarrow.svg"
          alt="arrow-icon"
        />
      </button>
    </div>
  )
}

export default Arrows;