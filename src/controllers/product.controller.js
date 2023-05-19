import Controller from '@controllers/controller'

class ProductController extends Controller {

  productDescription = "";
  productDescriptionShort = "";
  /** 
   * @type {Array<{
        id: String
        name: String,
        category: String,
        rating: String,
        ratingCount: String,
        price: String,
        sale: String,
        was: String,
        save: String,
        image: String,
        link: String
   * }>}}
   */
  recommendations = [];

  /** @type {Array<String>} */
  wishlist = [];
  /** @type {Array<{
    name: String;
    imageStyle: String;
    action: Function | null;
    isSelected: boolean;
   }>} 
  */
  colors = [];
  /** @type {Array<{
    name: String;
    imageStyle: String;
    action: Function | null;
    isSelected: boolean;
   }>} 
  */
  trims = [];

  constructor() {
    super();
    this.#getProductDescriptionCopy({ reduced: true });
    this.#hideCompleteYourLookSections();
    this.#hideFabricAndCloursSections();
    // this.#hideReviewsSections();
    this.#hideMyScsHomeSections();
    this.#hideBottomColorSelection();
    this.#getRecommendations();
    this.#getWishlist();
    this.#getAvailableColors();
    this.#getAvailableTrims();
  }

  /**
   * @param { { reduced: Boolean } }
   * @returns { String }
   */
  #getProductDescriptionCopy({ reduced }) {
    const element = this.getElement('.product-info__details');
    /**
     * @type { String }
    */
    let textContent = element.innerText;

    if (reduced) {
      /**
       * @type { Array<String> }
       */
      let reducedArray = element.innerText.trim().split(' ');
      reducedArray = reducedArray.slice(0, 28);
      this.productDescriptionShort = reducedArray.join(' ').concat(' ...');
    }

    this.productDescription = textContent;
  }

  #getRecommendations() {
    const container = document.querySelector('#dy-recommendations-container');

    if (container) {
      const data = container.innerText;
      const dataArray = JSON.parse(data);
      dataArray.pop();
      this.recommendations = dataArray;
    }
  }

  #hideCompleteYourLookSections() {
    const section = document.querySelector('.hulla');
    if (section)
      section.remove();
  }

  #hideFabricAndCloursSections() {
    const section = document.querySelector('.product-tertiary.pdp-colours-section.container');
    if (section)
      section.remove();
  }

  #hideReviewsSections() {
    const section = document.querySelector('.pdp-reviews-section');
    if (section)
      section.remove();
  }

  #hideMyScsHomeSections() {
    const section = document.querySelector('.photoslurp-product-widget');
    if (section)
      section.remove();
  }

  #hideBottomColorSelection() {
    const section = document.querySelector('#vwo-new-attributes-anchor');
    if (section)
      section.style.display = 'none';
  }

  #getWishlist() {
    const cookie = this.getCookie('wishlist');
    if (cookie) {
      const parsed = JSON.parse(cookie);
      /** @type {Array<String>} */
      const values = Object.values(parsed)
  
      this.wishlist = values;
    }
  }

  #getAvailableColors() {
    const colorBoxes = document.querySelectorAll('.js-swatch-carousel-thumbs .swiper-wrapper [data-type="color"]')

    /** @type {Array<{
     * name: String;
     * imageStyle: String;
     * action: Function;
     * isSelected: Boolean;
     * }>} */
    const colors = [];

    colorBoxes.forEach(colorHolder => {
      const nameBox = colorHolder.querySelector('[data-attr-value]');
      const imageBox = colorHolder.querySelector('[data-background-image]');

      const name = nameBox ? nameBox.getAttribute('data-attr-value') : null;
      const image = imageBox ? imageBox.getAttribute('data-background-image') : null;
      const action = imageBox ? () => imageBox.click() : null;
      const isSelected = colorHolder && colorHolder.classList.contains('selected');

      const color = {
        name, imageStyle: image, action, isSelected
      }

      colors.push(color);
    })

    this.colors = colors;
  }
  
  #getAvailableTrims() {
    const colorBoxes = document.querySelectorAll('.js-swatch-carousel-thumbs .swiper-wrapper [data-type="customTrim"]')

    /** @type {Array<{
     * name: String;
     * imageStyle: String;
     * action: Function;
     * isSelected: Boolean;
     * }>} */
    const colors = [];

    colorBoxes.forEach(colorHolder => {
      const nameBox = colorHolder.querySelector('[data-attr-value]');
      const imageBox = colorHolder.querySelector('[data-background-image]');

      const name = nameBox ? nameBox.getAttribute('data-attr-value') : null;
      const image = imageBox ? imageBox.getAttribute('data-background-image') : null;
      const action = imageBox ? () => imageBox.click() : null;
      const isSelected = colorHolder && colorHolder.classList.contains('selected');

      const color = {
        name, imageStyle: image, action, isSelected
      }

      colors.push(color);
    })

    this.trims = colors;
  }
}

export default ProductController;