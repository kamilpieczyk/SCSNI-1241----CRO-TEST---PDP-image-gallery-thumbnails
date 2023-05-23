import { h } from 'preact'
import { useMemo, useState, useEffect, useCallback } from 'preact/hooks'

import ProductController from '@controllers/product.controller'

import './style.scss'

/** @jsx h */

/**
 * @param {{
 *  recommendation: {
 *    id: String,
 *    name: String,
 *    rating: String,
 *    price: String,
 *    sale: String,
 *    was: String,
 *    save: String,
 *    image: String,
 *    link: String
 * }
 * }} props
*/
const Tile = ({ recommendation }) => {
  const [isWishlist, setWishlist] = useState(false)
  const [category, setCategory] = useState('')
  const [name, setName] = useState(recommendation.name)

  const ratingWidth = useMemo(() => Number(recommendation.rating) * 100 / 5, []);
  const product = useMemo(() => new ProductController(),[]);

  const handleWishlistIconClick = useCallback((e) => {
    setWishlist(!isWishlist);
    if (!isWishlist) e.target.classList.add('active');
    else e.target.classList.remove('active');
  })

  const handleTileClick = useCallback(() => {
    window.location.href = recommendation.link;
  })

  const getCategory = () => {
    const categories = recommendation.category.split(',');
    if (categories.length > 1) {
      /** @type {String} */
      let range = categories[1];
      range = range.replace('Sofa Range', '');
      
      let name = recommendation.name;
      name = name.replace(range, '');

      if (name.split(' ').length > 6) {
        name = name.split(' ').slice(0, 6).join(' ');
        name = name+"..."
      }

      setCategory(range);
      setName(name);
    }
    // const category = recommendation.category;
    // if (category) {
    //   setCategory(category);
    // }
  }

  useEffect(() => {
    getCategory();
    if (product.wishlist.includes(recommendation.id)) {
      setWishlist(true);
      document.querySelector(`[data-pid="${recommendation.id}"]`).classList.add('active');
    }
  }, []);

  return (
    <div className="recommended__tile-container__tile" id={recommendation.id} name={recommendation.name}>
      <div className="recommended__tile-container__tile__image-container">
        <img
          src = { recommendation.image }
          alt = "product-image"
          data-src = { recommendation.image }
          onClick = { handleTileClick }
        />
      </div>
      

      <div className="recommended__tile-container__tile__content">
        <button
          className="recommended__tile-container__tile__content__heart-box wishlist-heart js-wishlist-heart"
          data-add-to-wishlist-url="/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Wishlist-AddProduct"
          data-remove-from-wishlist-url="/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Wishlist-RemoveProduct"
          data-pid={ recommendation.id }
          onClick={ handleWishlistIconClick }
        >
          <img
            src = {
              isWishlist
                ? 'https://cdn-eu.dynamicyield.com/api/9878392/images/341020a4597d__icon--heart-filled.svg'
                : 'https://cdn-eu.dynamicyield.com/api/9878392/images/29ad1a39a0edc__icon--heart.svg'
            }
            alt="heard-icon"
          />
        </button>

        <div className="recommended__tile-container__tile__content__title-section">
          <h3><span>{ category }</span> { name }</h3>

          <div className="recommended__tile-container__tile__content__title-section__rating">
            <div className="recommended__tile-container__tile__content__title-section__rating__stars-container">
              <span style={{ width: `${ ratingWidth }%` }}>
                ★★★★★
              </span>
              <span>★★★★★</span>
            </div>

            <div className="recommended__tile-container__tile__content__title-section__ratingrating-number">
              ({ recommendation.ratingCount })
            </div>
          </div>

        </div>

        <div className="recommended__tile-container__tile__content__price-section">
          <div className="recommended__tile-container__tile__content__price-section__price-label">
            {
              (recommendation.was || recommendation.sale) ? 'Now only' : 'Only'
            }
          </div>

          <div className="recommended__tile-container__tile__content__price-section__price-box">
            <div className="recommended__tile-container__tile__content__price-section__price-box__price">
              <span>£</span>{ Number(recommendation.price).toLocaleString() }
            </div>

            {
              recommendation.save && (
                <div className="recommended__tile-container__tile__content__price-section__price-box__save">
                  Save £{ Number(recommendation.save).toFixed(0) }
                </div>
              )
            }
            
          </div>

          <div className={`recommended__tile-container__tile__content__price-section__was-sale ${!recommendation.was && 'd-none'}`}>
            {
              recommendation.was && (
                <div className="recommended__tile-container__tile__content__price-section__was-sale__was">
                  Was <span>£{ recommendation.was }</span>
                </div>
              )
            }
            {
              recommendation.sale && (
                <div className="recommended__tile-container__tile__content__price-section__was-sale__sale">
                  | Sale <span>£{ recommendation.sale }</span>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
 )
}

export default Tile