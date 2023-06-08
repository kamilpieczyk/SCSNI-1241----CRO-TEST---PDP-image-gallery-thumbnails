import { h } from 'preact'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'preact/hooks'
import './style.scss';
import 'swiper/css';

/** @jsx h */
export default ({ threeD, video }) => {
  const [ slides, setSlides ] = useState([])
  const [ activeIndex, setActiveIndex ] = useState(1)
  const [ isColorChanged, setColorChanged ] = useState(false)

  const ThreeD = threeD;
  const Video = video;

  const fetchSlides = ( reFetch = false ) => {
    const slides = document.querySelectorAll('.swiper-slide.pdp-carousel-slide__thumb')
    const sliderArr = []

    let order = 1;
    slides.forEach((slide, index) => {
      if ( 
        !slide.querySelector('.pdp-carousel-slide__thumb-content--video') 
        && !slide.classList.contains('pdp-carousel-slide__thumb--has-ar') 
        && !slide.classList.contains('pdp-carousel-slide__thumb--no-ar') 
      ) {

        const image = slide.querySelector('img')

        if (order >= 4) {
          order = order+1
        }

        if (order >= 5) {
          order = order+1
        }

        if ( index === 0 && !reFetch) {
          index = 1
        }
        else if ( index === 1 && !reFetch) {
          index = 0
        }

        order = order+1
        sliderArr.push({ img: reFetch ? image.getAttribute('src') : image.getAttribute('data-src'), index, order })
      }
    });

    setSlides(sliderArr)
  }
  /** @param {number} index */
  const handleSlideClick = (index) => {
    const button = document.querySelector(`span.swiper-pagination-bullet[aria-label="Go to slide ${index}"]`)
    setActiveIndex(index)
    window.activeIndex = index
    if ( button ) {
      button.click();
    }
  }

  const get3dIndex = () => {
    let button = document.querySelector('.pdp-carousel-slide__thumb--no-ar');
    if (!button) button = document.querySelector('.pdp-carousel-slide__thumb--has-ar');

    const index = button ? Array.prototype.indexOf.call(button.parentNode.children, button) + 1 : 0;
    return index
  }

  const getVideoIndex = () => {
    const videoButton = document.querySelector('.pdp-carousel-slide__thumb-content--video')
    /**
     * @type {number}
     */
    const index = videoButton ? Array.prototype.indexOf.call(videoButton.parentNode.parentNode.children, videoButton.parentNode) + 1 : 0;

    return index;
  }

  const handleSlideChangeOnSlider = () => {
    const dotsContainer = document.querySelector('.swiper-pagination.swiper-pagination-white.product-detail-carousel__bullets.swiper-pagination-clickable.swiper-pagination-bullets')
    const observer = new MutationObserver(() => {
      const activeDot = dotsContainer.querySelector('.swiper-pagination-bullet-active');
      const labelAttr = activeDot.getAttribute('aria-label');
      let number = labelAttr.replace('Go to slide ', '')
      number = Number(number)

      const threeDIndex = Number(get3dIndex())
      const videoIndex = Number(getVideoIndex())

       if (threeDIndex === number && window.activeIndex !== number) {
        setActiveIndex(12)
        window.activeIndex = 12
      }
      else if (videoIndex === number && window.activeIndex !== number) {
        setActiveIndex(13)
        window.activeIndex = 13
      }
      else if (window.activeIndex !== number) {
        setActiveIndex(number)
        window.activeIndex = number
      }
    })

    if (dotsContainer) {
      observer.observe(dotsContainer, {
        childList: true,
        attributes: true,
        subtree: true
      })
    }
  }

  const handleColorChange = () => {
    let colorSwatchBox = document.querySelector('.swiper-container-thumbs.js-swatch-carousel-thumbs.pdp-carousel-slide__thumbs')
    const container = document.querySelector('.product-detail__addto-section')

    if (colorSwatchBox) {
      const selectedInitialy = colorSwatchBox.querySelector('.selected')
      const initialDiv = selectedInitialy.querySelector('[data-attr-value]')
      const initialColor = initialDiv.getAttribute('data-attr-value')
      const initialTrim = document.querySelector('.swatch-swiper-section.second .colour-description span')

      const observer = new MutationObserver(() => {
        if (!isColorChanged) {
          colorSwatchBox = document.querySelector('.swiper-container-thumbs.js-swatch-carousel-thumbs.pdp-carousel-slide__thumbs')
          const selected = colorSwatchBox.querySelector('.selected')
          const selectedDiv = selected.querySelector('[data-attr-value]')
          const selectedColor = selectedDiv.getAttribute('data-attr-value')

          const selectedTrim = document.querySelector('.swatch-swiper-section.second .colour-description span')

          if (initialColor !== selectedColor) {
            setColorChanged(true)
            window.isColorChanged = true
          }
          else if (initialTrim && selectedTrim && initialTrim.textContent !== selectedTrim.textContent) {
            setColorChanged(true)
            window.isColorChanged = true
          }
        }
      })

      observer.observe(container, {
        childList: true,
        attributes: true,
        subtree: true
      })
    }
  }

  useEffect(() => fetchSlides(), [])

  useEffect(() => {
    handleSlideChangeOnSlider()
    handleColorChange()
    window.isColorChanged = false
    window.activeIndex = 1
  }, [])

  useEffect(() => {
    if (isColorChanged) {
      fetchSlides(true)
    }
  }, [isColorChanged])

  return (
    <Swiper
      className='plp-fusion__action-box---mobile-slides'
      spaceBetween={ 6 }
      slidesPerView={ 5 }
    >
      { slides.map( (slide) => (
        <SwiperSlide style={`order: ${slide.order}`}>
          <div 
            className={`plp-fusion__action-box---mobile-slides---slide ${activeIndex === slide.index+1 && 'active'}`} 
            onClick={ () => {
              handleSlideClick(slide.index+1)
            } } 
            data-index={slide.index}
          >
            <img src={ slide.img } alt="slide-img" />
          </div>
        </SwiperSlide>
      )) }

      { threeD && (
        <SwiperSlide style={`order: ${video ? 4 : 5}`}>
          <ThreeD callback={() => {setActiveIndex(12); window.activeIndex = 12}} isActive={activeIndex === (12)} />
        </SwiperSlide>
      ) }

      { video && (
        <SwiperSlide style="order: 5">
          <Video callback={() => {setActiveIndex(13); window.activeIndex = 13}} isActive={activeIndex === 13} />
        </SwiperSlide>
      ) }
    </Swiper>
  )
}