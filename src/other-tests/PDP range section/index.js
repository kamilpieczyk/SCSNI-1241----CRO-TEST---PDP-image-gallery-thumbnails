function RangeTileStyle() {
  return /* css */ `
    .range-tile {
      display: flex;
      min-width: 405px;
      max-width: 405px;
      border: 1px solid #D1D1D1;
      border-radius: 4px;
      overflow: hidden;
      padding: 10px;
      line-height: 1;
      background-color: white;
    }
    .range-tile * {
      line-height: 1;
    }
    .range-tile__image-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 10px;
      border-right: 1px solid #D1D1D1;
    }
    
    .range-tile__image-box img {
      width: 150px;
      height: 96px;
      margin-bottom: 7px;
      border-radius: 3px;
    }
    .range-tile__image-box__dimentions {
      display: flex;
      border-radius: 3px;
      background-color: #F4F4F4;
      width: 150px;
      justify-content: space-around;
      align-items: center;
      height: 36px;
    }
    
    .range-tile__image-box__dimentions__dimention-box {
      display: flex;
      flex-direction: column;
      font-size: 11px;
      gap: 2px;
    }
    .range-tile__content-box {
      padding-left: 10px;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .range-tile__content-box__name-box {
      font-size: 14px !important;
      flex-grow: 1;
    }   
    .range-tile__content-box__price-box {
      margin-bottom: 13px;
    }
    .range-tile__content-box__price-box__was {
      color: #707070;
      font-size: 14px;
      text-decoration: line-through;
      font-weight: 100;
      margin-bottom: 3px;
    }
    .range-tile__content-box__price-box__price-now {
      color: #DC0036;
      font-size: 16px;
      font-weight: 700;
    }
    .range-tile__content-box__action-buttons {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    .product-range-card__info-item.product-range-card__price.js-recomm-action {
      width: 170px;
      min-height: 30px;
      margin: 0;
      padding: 0;
    }
    .range-tile__content-box__action-buttons .add-to-cart-range {
      font-size: 14px !important;
      font-weight: 100 !important;
      line-height: 0 !important;
      width: 170px;
      height: 30px;
      margin: 0;
    }
    .range-tile__content-box__action-buttons .wishlist-heart {
      min-width: 32px;
      min-height: 32px;
      max-width: 32px;
      max-height: 32px;
      width: 32px;
      height: 32px;
      background-color: #F4F4F4;
      background-image: url(https://useruploads.visualwebsiteoptimizer.com/useruploads/530451/images/68610981e687a92f98375806b6130816_iconheart2x.png);
      background-position: center;
      background-size: 20px 18px;
      background-repeat: no-repeat;
      text-indent: -9999px;
    }
    
    .range-tile__content-box__action-buttons .wishlist-heart:hover {
      background-color: #FDFDFD;
    }
    .range-tile__content-box__action-buttons .wishlist-heart.active {
      background-image: url(https://www.scs.co.uk/on/demandware.static/Sites-SFRA_SCS-Site/-/en_GB/v1665736444521/icons/icon--heart-filled.svg);
    }
    @media (max-width: 770px) {
      .range-tile {
        min-width: 100%;
        max-width: 100%;
        position: relative;
      }
      .range-tile__content-box__name-box {
        width: calc(100% - 54px);
      }
      .range-tile__content-box__action-buttons .add-to-cart-range {
        width: 150px;
      }
      .range-tile__content-box__price-box__was {
        font-size: 12px;
      }
      .range-tile__content-box__action-buttons .wishlist-heart {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
  `;
}
function RangeTile({id, wishlistID, name, brand, price, wasPrice, width, height, depth, image, button, dataAdid, device, link}) {
  if(brand) {
    if(name.toUpperCase().includes(brand.toUpperCase())) {
      name = name.slice(brand.length);
    }
  }

  const handleWhishlist = () => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const wishlist = getCookie('wishlist');

    if (wishlist.includes(id)) {
    // if (wishlist.includes(wishlistID)) {
      const container = document.querySelector('.range-section-container');
      const button = container.querySelector(`.wishlist-heart[data-pid=${id}]`);
      if (button) {
        button.classList.add('active');
      }
    }
  }

  setTimeout(handleWhishlist, 1000);

  return  /*HTML*/`
    <div class="range-tile">
      <div class="range-tile__image-box">
        <a href="/${id}.html">
          <img src=${ image } alt="image-${name}" />
        </a>
        <div class="range-tile__image-box__dimentions">
          <div class="range-tile__image-box__dimentions__dimention-box">
            <span>Width</span>
            <strong>${width}cm</strong>
          </div>
          
          <div class="range-tile__image-box__dimentions__dimention-box">
            <span>Height</span>
            <strong>${height}cm</strong>
          </div>
          
          <div class="range-tile__image-box__dimentions__dimention-box">
            <span>Depth</span>
            <strong>${depth}cm</strong>
          </div>
        </div>
      </div>
      <div class="range-tile__content-box">
        <a class="range-tile__content-box__name-box" href="${link}">
          <p style="margin: 0px; font-size: 14px; margin-bottom: 3px">${brand}</p>
          <h3 style="margin: 0px; font-size: 14px; font-weight: 600;">${name}<h3>
        </a>
        <div class="range-tile__content-box__price-box">
          ${
            wasPrice
              ? /* html */ `<div class="range-tile__content-box__price-box__was">Was £${wasPrice}</div>`
              : ''
          }
          <div class="range-tile__content-box__price-box__price-now">
            Now £${price}
          </div>
        </div>
        <div class="range-tile__content-box__action-buttons">
          <div class="product-range-card__info-item product-range-card__price js-recomm-action" data-pid=${id}>
            <input type="hidden" class="add-to-cart-url" value="/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Cart-AddProduct">
            <input type="hidden" class="add-to-cart-quantity" value="1">
            ${button.outerHTML}
          </div>
          <button
            type="button" 
            class="btn wishlist-heart wishlist-heart__tile null dyMonitor" 
            data-add-to-wishlist-url="/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Wishlist-AddProduct" 
            data-remove-from-wishlist-url="/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Wishlist-RemoveProduct" 
            data-pid=${id}
            data-adid=${dataAdid}
          ></button>
        </div>
      </div>
    </div>
  `;
};
class MainComponent {
  constructor(className, insertBeforeSelector) {
    this.state = {
      range: '',
      rangeLink: '/',
      data: []
    };
    this.breakpoints = {
      mobile: 415,
      tablet: 768
    }
    this.containerClass = className;
    this.container = document.querySelector(`.${className}`);
    if (!this.container) {
      this.getData();
      this.setDeviceType();
      this.createContainer();
      this.placeContainer(insertBeforeSelector);
      this.runEventListeners();
    }
  }
  getDeviceType = () => {
    const screenWidth = window.innerWidth;
    if(screenWidth > this.breakpoints.tablet) this.setState('device', 'desktop');
    else if (screenWidth > this.breakpoints.mobile && screenWidth <= this.breakpoints.tablet) this.setState('device', 'tablet');
    else this.setState('device', 'mobile');
  }
  setDeviceType = () =>  {
    this.getDeviceType();
    window.addEventListener('resize', this.getDeviceType);
  }
  createContainer() {
    this.container = document.createElement('div');
    this.container.classList.add(this.containerClass);
    this.container.innerHTML = this.render();
  }
  placeContainer(insertBeforeSelector) {
    const beforeElement = document.querySelector(insertBeforeSelector);
    beforeElement.parentNode.insertBefore(this.container, beforeElement);
  }
  setState(state, value) {
    this.state[state] = value;
    if(this.container) {
      this.container.innerHTML = this.render();
      this.runEventListeners();
    }
  }
  getData() {
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
    this.setState('range', rangeName);
    this.setState('rangeLink', rangeHref);

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
      const dataArray = [...this.state.data];
      dataArray.push(elementData);
      this.setState('data', dataArray);
    });
  }
  runEventListeners() {
    this.handleScrolltButtons('next');
    this.handleScrolltButtons('prev');
    this.handleActivateButtons();
    this.removeOldRange();
    this.handleScrollbarWidth();
    window.addEventListener('resize', this.handleScrollbarWidth);
    this.handleSwipe();
  }
  handleScrolltButtons(direction = 'next') {
    const button = document.querySelector(`#range-section-button-${direction}`);
    const container = this.container.querySelector('.product-range__content');
    const tile = container.querySelector('.range-tile');

    button.addEventListener('click', () => {
      button.setAttribute('disabled', true);
      setTimeout(() => button.removeAttribute('disabled'), 1000);
      if(direction === 'next') {
        if(container.offsetWidth >= 1260) {
          container.scrollTo({
            left: container.scrollLeft + container.offsetWidth + 15,
            behavior: 'smooth'
          });
        } else if(window.matchMedia('(max-width: 770px)').matches) {
          container.scrollTo({
            left: container.scrollLeft + container.offsetWidth + 20,
            behavior: 'smooth'
          });
          this.handleScrollbarMove('next');
        }else {
          container.scrollTo({
            left: container.scrollLeft + tile.offsetWidth + 20,
            behavior: 'smooth'
          });
        }
      } else {
        if(container.offsetWidth >= 1260) {
          container.scrollTo({
            left: container.scrollLeft - container.offsetWidth - 15,
            behavior: 'smooth'
          });
        } else if(window.matchMedia('(max-width: 770px)').matches) {
          container.scrollTo({
            left: container.scrollLeft - container.offsetWidth - 20,
            behavior: 'smooth'
          });
          this.handleScrollbarMove('prev');
        }else {
          container.scrollTo({
            left: container.scrollLeft - tile.offsetWidth - 20,
            behavior: 'smooth'
          });
        }
      }
    })
  }
  handleSwipe() {
    let direction
    let touchstartX = 0
    let touchendX = 0
        
    const checkDirection = () => {
      const container = this.container.querySelector('.product-range__content');
      if (touchendX < touchstartX) {
        // swiped left
        direction = 'next';
        const button = document.querySelector(`#range-section-button-${direction}`);
        const isDisabled = button.getAttribute('disabled');

        if(!isDisabled){
          button.setAttribute('disabled', true);
          setTimeout(() => button.removeAttribute('disabled'), 1000);
          if(container.offsetWidth >= 1260) {
            container.scrollTo({
              left: container.scrollLeft + container.offsetWidth + 15,
              behavior: 'smooth'
            });
          } else if(window.matchMedia('(max-width: 770px)').matches) {
            container.scrollTo({
              left: container.scrollLeft + container.offsetWidth + 20,
              behavior: 'smooth'
            });
            this.handleScrollbarMove('next');
          }else {
            container.scrollTo({
              left: container.scrollLeft + tile.offsetWidth + 20,
              behavior: 'smooth'
            });
          }
        }
      }
      if (touchendX > touchstartX) {
        // swiped right!
        direction = 'prev';
        const button = document.querySelector(`#range-section-button-${direction}`);
        const isDisabled = button.getAttribute('disabled');

        if(!isDisabled){
          button.setAttribute('disabled', true);
          setTimeout(() => button.removeAttribute('disabled'), 1000);
          if(container.offsetWidth >= 1260) {
            container.scrollTo({
              left: container.scrollLeft - container.offsetWidth - 15,
              behavior: 'smooth'
            });
          } else if(window.matchMedia('(max-width: 770px)').matches) {
            container.scrollTo({
              left: container.scrollLeft - container.offsetWidth - 20,
              behavior: 'smooth'
            });
            this.handleScrollbarMove('prev');
          }else {
            container.scrollTo({
              left: container.scrollLeft - tile.offsetWidth - 20,
              behavior: 'smooth'
            });
          }
        }
      }
    }
    document.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX
    })
    document.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX
      checkDirection()
    })
  }
  handleActivateButtons() {
    const buttonN = document.querySelector(`#range-section-button-next`);
    const buttonP = document.querySelector(`#range-section-button-prev`);
    const container = this.container.querySelector('.product-range__content');
    if(container.scrollLeft > 0) {
      buttonP.classList.add('active');
    } else {
      buttonP.classList.remove('active');
    }
    if(container.scrollLeft >= container.scrollWidth - 15) {
      buttonN.classList.remove('active');
    } else {
      buttonN.classList.add('active');
    }
    container.addEventListener('scroll', () => {
      if(container.scrollLeft > 0) {
        buttonP.classList.add('active');
      } else {
        buttonP.classList.remove('active');
      }
      if(container.scrollLeft >= container.scrollWidth - container.offsetWidth) {
        buttonN.classList.remove('active');
      } else {
        buttonN.classList.add('active');
      }
    })
  }
  handleScrollbarWidth() {
    const container = this.container.querySelector('.product-range__content');
    const list = container.querySelectorAll('.range-tile');
    const scrollbar = this.container.querySelector('.product-range__scroll-bar');
    const finger = scrollbar.querySelector('div');
    finger.style.setProperty('width', scrollbar.offsetWidth/list.length+'px', 'important');
  }
  handleScrollbarMove(direction) {
    const container = this.container.querySelector('.product-range__content');
    const list = container.querySelectorAll('.range-tile');
    const scrollbar = this.container.querySelector('.product-range__scroll-bar');
    const finger = scrollbar.querySelector('div');
    const button = this.container.querySelector(`#range-section-button-${direction}`);
    if(button.classList.contains('active')) {
      if(direction === 'next') {
        finger.style.setProperty('left', Number(finger.style.left.replace('px', '')) + Number(scrollbar.offsetWidth/list.length) + 'px');
      } else {
        finger.style.setProperty('left', Number(finger.style.left.replace('px', '')) - Number(scrollbar.offsetWidth/list.length) + 'px');
      }
    }
  }
  removeOldRange() {
    const odlRange = document.querySelector('.product-range');
    if(odlRange) odlRange.remove();
  }
  style() {
    return /* CSS */ `
      .${this.containerClass} {
        position: relative;
        margin-right: auto;
        margin-left: auto;
    	  overflow: hidden;
        background: #F4F4F4;
        padding: 15px 10px;
        padding-bottom: 20px;
        margin-bottom: 25px;
      }
      /* @media (max-width: 768px) {
        .${this.containerClass} {
          margin-top: 40px;
        }
      } */
      .range-section-container h2 {
        color: #222222;
        font-size: 18px !important;
        width: 100%;
        padding-bottom: 20px;
        margin-bottom: 13px;
      }
      .product-range__content {
        display: flex;
        width: 100%;
        overflow: hidden;
        gap: 24px;
      }
      .product-range__action-buttons {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 21px;
      }
      .product-range__action-buttons__ful-range-button {
        border: 1px solid #423E3E;
        background-color: #FFFFFF;
        color: #423E3E;
        font-weight: 100;
        font-size: 16px;
        min-width: 240px;
        min-height: 38px;
        text-align: center;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none !important;
        padding: 0 20px;
      }
      .product-range__action-buttons__ful-range-button:hover {
        color: black;
        border-color: black;
      }
      .range-section__scroll-action-buttons-container {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: end;
        width: 100%;
        padding-right: 30px;
        gap: 6px;
      }
      .range-section__scroll-action-buttons-container button {
        border-radius: 50%;
        background: none;
        border: 1px solid  #EDEEEE;
        width: 32px;
        height: 32px;
		    display: flex;
    	  justify-content: center;
    	  align-items: center;
		    cursor: default;

      }
      .range-section__scroll-action-buttons-container button img {
        opacity: .7;
      }
      .range-section__scroll-action-buttons-container button.active {
        border-color: #D1D1D1;
		    cursor: pointer;
        background: white;
      }
      
      .range-section__scroll-action-buttons-container button.active:hover {
        border-color: #BCBBBB;
      }
      
      .range-section__scroll-action-buttons-container button.active:hover img {
        opacity: 1;
      }
      .product-range__scroll-bar {
        display: none;
        width: 100%;
        height: 2px;
        background-color: #D1D1D1;
        margin-top: 20px;
        margin-bottom: 10px;
        border-radius: 19px;
        position: relative;
      }
      .product-range__scroll-bar__finger {
        height: 100%;
        width: 45px;
        background-color: #707070;
        border-radius: 19px;
        position: absolute;
        left: 0;
        transition-duration: 0.3s;
      }
      @media (max-width: 770px) {
        .range-section-container h2 {
          font-size: 18px !important;
          margin-bottom: 4px !important;
        }
        .product-range__scroll-bar {
          display: block;
        }
        .product-range__action-buttons__ful-range-button {
          width: 100%;
        }
      }
    `;
  }
  render() {
    return (/*HTML*/`
    <style>${this.style()}</style>
    <style>${RangeTileStyle()}</style>
    <div class="range-section-container container">
      <div class="range-section__scroll-action-buttons-container">
        <button id="range-section-button-prev" style="transform: rotate(180deg)">
          <img src="https://useruploads.visualwebsiteoptimizer.com/useruploads/530451/images/f6448add99f83aeb73d1176527887e95_iconarrow.svg" alt="arrow-icon" />
        </button>
        
        <button id="range-section-button-next">
          <img src="https://useruploads.visualwebsiteoptimizer.com/useruploads/530451/images/f6448add99f83aeb73d1176527887e95_iconarrow.svg" alt="arrow-icon" />
        </button>
      </div>
      <h2>
       Shop the ${this.state.range.charAt(0).toUpperCase() + this.state.range.slice(1)} range
      </h2>
      <div class="product-range__content">
        ${this.state.data.map( tile => RangeTile({ ...tile, device: this.state.device }) ).join('') }
      </div>
      <div class="product-range__scroll-bar">
        <div class="product-range__scroll-bar__finger"></div>
      </div>
      <div class="product-range__action-buttons">
        <a href=${this.state.rangeLink} class="product-range__action-buttons__ful-range-button">
          See the full ${this.state.range.charAt(0).toUpperCase() + this.state.range.slice(1)} range
        </a>
      </div>
    </div>
  `);
  }
}

export default () => new MainComponent('range-section-container', '.pdp-reviews-section');

