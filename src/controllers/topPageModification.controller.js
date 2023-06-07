import Controller from './controller'

class TopPageModificationController extends Controller {
  constructor() {
    super();
    this.#modifySliderTiles();
    this.#removeShareButton();
    this.#hideExistingColorSwatches();
    // this.modifySliderTilesMobile();
    this.#handleRefreshCarouselAfterNextSlideButtonClick();
    this.#handleActiveSliderTile();

    // window.addEventListener('resize', this.modifySliderTilesMobile);

    // window.modifySliderTilesMobile = this.modifySliderTilesMobile;
  }

  #modifyShopLiveInStoreButton() {
    const button = document.querySelector('.vwo-pdp-links');
    const heading = button.querySelector('.heading');

    const span = document.createElement('span');
    span.style.display = 'none';

    heading.appendChild(span);

    if (button) {
      button.classList.remove('expanded');
      button.style.cursor = 'pointer';
    }
  }

  #shopInStoreButtonHandler() {
    const button = document.querySelector('.vwo-pdp-links');
    
    if (button) {
      const next = button.nextElementSibling.nextElementSibling;
      const heading = button.querySelector('.heading');

      if (heading) heading.onclick = () => {
        if (button.classList.contains('expanded')) {
          button.classList.remove('expanded');
          heading.classList.remove('pdp-fusion__expanded');
          next.style.setProperty('margin-top', '0px', 'important')
        }
        else {
          button.classList.add('expanded');
          heading.classList.add('pdp-fusion__expanded');
          next.style.setProperty('margin-top', '76px', 'important')
        }
      }
    }
  }

  #modifySliderTiles() {
    const carouselThumbsBox = document.querySelector('.js-pdp-carousel-thumbs');
    const carouselThumbsBoxNodeList = document.querySelectorAll('.pdp-carousel-slide__thumb');

    const container = document.createElement('div');
    container.classList.add('pdp-fusion__modify-carousel-container');

    const line = document.createElement('div');
    line.classList.add('pdp-fusion__modify-carousel-bottom-line');

    if (carouselThumbsBox) {
      carouselThumbsBox.classList.add('pdp-fusion__modify-carousel-thumbs');
      carouselThumbsBox.parentNode.appendChild(container);
      container.appendChild(carouselThumbsBox);
      container.appendChild(line);
    }

    carouselThumbsBoxNodeList.forEach((carouselThumbsBox) => {
      carouselThumbsBox.style.setProperty("width", '96px', 'important');
      carouselThumbsBox.addEventListener('click', () => {
        window.dispatchEvent(new Event('resize'));
      })
    });

    window.dispatchEvent(new Event('resize'));
  }

  #handleRefreshCarouselAfterNextSlideButtonClick() {
    const button = document.querySelector('.product-detail-carousel__controls.swiper-controls .swiper-button-next');
    
    if (button) button.onclick = () => {
      window.dispatchEvent(new Event('resize'));
    }
  }

  #removeShareButton() {
    const section = document.querySelector('.product-header');

    if (section) {
      section.remove();
    }
  }

  #hideExistingColorSwatches() {
    const swatches = document.querySelector('.dy-pdp-colour-swatches');

    if (swatches && window.matchMedia('(max-width: 768px)').matches) {
      swatches.style.setProperty('display', 'none', 'important');
    }
  }

  modifySliderTilesMobile() {
    // const firstTile = document.querySelector('.swiper-slide.pdp-carousel-slide__thumb:first-child');
    // const sixthTile = document.querySelector('.swiper-slide.pdp-carousel-slide__thumb:nth-child(6)');
    const tiles = document.querySelectorAll('.swiper-slide.pdp-carousel-slide__thumb');

    tiles.forEach((tile) => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        tile.style.setProperty('display', 'block', 'important');
        // firstTile.style.setProperty('width', '71px', 'important');
        // tile.style.setProperty('order', '-2', 'important');
        tile.style.setProperty('margin-left', '0px', 'important');
      }
    })

    // if (window.matchMedia('(max-width: 768px)').matches && firstTile) {
    //   firstTile.style.setProperty('display', 'block', 'important');
    //   // firstTile.style.setProperty('width', '71px', 'important');
    //   firstTile.style.setProperty('order', '-2', 'important');
    //   firstTile.style.setProperty('margin-left', '0px', 'important');
    // }
    // else if (firstTile) {
    //   firstTile.style.setProperty('order', 'initial', 'important');
    // }

    // if (window.matchMedia('(max-width: 369px)').matches && sixthTile) {
    //   sixthTile.style.setProperty('display', 'none', 'important');
    // }
    // else if (window.matchMedia('(max-width: 768px)').matches && sixthTile) {
    //   sixthTile.style.setProperty('display', 'block', 'important');
    //   // sixthTile.style.setProperty('width', '71px', 'important');
    //   sixthTile.style.setProperty('order', '-1', 'important');
    // }
    // else if (sixthTile) {
    //   sixthTile.style.setProperty('order', 'initial', 'important');
    // }
    
  }
  // modifySliderTilesMobile() {
  //   const firstTile = document.querySelector('.swiper-slide.pdp-carousel-slide__thumb:first-child');
  //   const sixthTile = document.querySelector('.swiper-slide.pdp-carousel-slide__thumb:nth-child(6)');

  //   if (window.matchMedia('(max-width: 768px)').matches && firstTile) {
  //     firstTile.style.setProperty('display', 'block', 'important');
  //     // firstTile.style.setProperty('width', '71px', 'important');
  //     firstTile.style.setProperty('order', '-2', 'important');
  //     firstTile.style.setProperty('margin-left', '0px', 'important');
  //   }
  //   else if (firstTile) {
  //     firstTile.style.setProperty('order', 'initial', 'important');
  //   }

  //   if (window.matchMedia('(max-width: 369px)').matches && sixthTile) {
  //     sixthTile.style.setProperty('display', 'none', 'important');
  //   }
  //   else if (window.matchMedia('(max-width: 768px)').matches && sixthTile) {
  //     sixthTile.style.setProperty('display', 'block', 'important');
  //     // sixthTile.style.setProperty('width', '71px', 'important');
  //     sixthTile.style.setProperty('order', '-1', 'important');
  //   }
  //   else if (sixthTile) {
  //     sixthTile.style.setProperty('order', 'initial', 'important');
  //   }
    
  // }

  #handleActiveSliderTile() {
    const modifier = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches

      if (isMobile) {
        const active = document.querySelector('.swiper-pagination-bullet-active')
        const label = active.getAttribute('aria-label')
        let pageNumber = label.replace('Go to slide ', '')
        pageNumber = Number(pageNumber)
  
        const thumbs = document.querySelectorAll('.pdp-carousel-slide__thumb')
  
        thumbs.forEach((thumb, index) => {
          if (index+1 === pageNumber) {
            if ( !thumb.classList.contains('dy-active-thumb') ) {
              thumb.classList.add('dy-active-thumb')
            }
          }
          else if ( thumb.classList.contains('dy-active-thumb') ) {
            thumb.classList.remove('dy-active-thumb')
          }
        })
      }
    }

    const container = document.querySelector('.custom-vo-swiper-tile-container')
    const observer = new MutationObserver((mutation) => {
      modifier()
    })

    setTimeout(() => {
      modifier()
      observer.observe(container, { childList: true, attributes: true,  subtree: false })
    }, 5000)
  }
}

export default TopPageModificationController