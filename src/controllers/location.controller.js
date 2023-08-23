import Controller from '@controllers/controller'

class LocationController extends Controller {
  /** 
   @type { String }
   */
  pathname = null;
  /** 
   @type { Boolean }
   */
  isBasket = null;
  /** 
   @type { Boolean }
   */
  isCheckout = null;

  constructor() {
    super();
    this.#fetchPathname();
    this.#checkIfIsBasket();
    this.#checkIfIsCheckout();
  }

  #fetchPathname() {
    const path = window.location.pathname;
    this.pathname = path
  }

  #checkIfIsBasket() {
    this.isBasket = this.pathname === '/basket';
  }

  #checkIfIsCheckout() {
    this.isCheckout = this.pathname === '/checkout/';
  }

  static checkIfIsSofaProduct() {
    const container = document.querySelector('.product-wrapper');
    const gaData = container.getAttribute('data-product-ga-data');
    const objectData = JSON.parse(gaData);
    /** @type {String} */
    const category = objectData.category;

    return category.toUpperCase().includes('SOFA');
  }

  static checkIfIsFlooringProduct() {
    const container = document.querySelector('.product-wrapper');
    const gaData = container.getAttribute('data-product-ga-data');
    const objectData = JSON.parse(gaData);
    /** @type {String} */
    const category = objectData.category;
    
    return category.toUpperCase().includes('FLOORING');
  }

  static isGoogleShopping() {
    return window.location.search.includes('gclid=');
  }
}

export default LocationController;