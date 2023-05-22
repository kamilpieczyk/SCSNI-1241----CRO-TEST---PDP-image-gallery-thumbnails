import './style.scss'

import { h } from 'preact'
import { useMemo, useEffect, useState, useRef } from 'preact/hooks'

/** @jsx h */

const RangeTile = ({id, wishlistID, name, brand, price, wasPrice, width, height, depth, image, button, dataAdid, link}) => {
  // useEffect(() => {
  //   console.log({id, wishlistID, name, brand, price, wasPrice, width, height, depth, image, button, dataAdid, link})
  // }, [])

  return (
    <div className="range-tile">

      <div className="range-tile__image-box">
        <a href="/${id}.html">
          <img src={ image } alt={`image-${name}`} />
        </a>
        <div className="range-tile__image-box__dimentions">
          <div className="range-tile__image-box__dimentions__dimention-box">
            <span>Width</span>
            <strong>{width}cm</strong>
          </div>
          
          <div className="range-tile__image-box__dimentions__dimention-box">
            <span>Height</span>
            <strong>{height}cm</strong>
          </div>
          
          <div className="range-tile__image-box__dimentions__dimention-box">
            <span>Depth</span>
            <strong>{depth}cm</strong>
          </div>
        </div>
      </div>

      <div className="range-tile__content-box">
        <a className="range-tile__content-box__name-box" href={link}>
          <p style="margin: 0px; font-size: 14px; margin-bottom: 3px">{brand}</p>
          <h3 style="margin: 0px; font-size: 14px; font-weight: 600;">{name}</h3>
        </a>
        <div className="range-tile__content-box__price-box">
          {
            wasPrice && (
              <div className="range-tile__content-box__price-box__was">Was £{wasPrice}</div>
            )
          }
          <div className="range-tile__content-box__price-box__price-now">
            Now £{price}
          </div>
        </div>
        <div className="range-tile__content-box__action-buttons">
          <div className="product-range-card__info-item product-range-card__price js-recomm-action" data-pid={id}>
            <input type="hidden" className="add-to-cart-url" value="/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Cart-AddProduct" />
            <input type="hidden" className="add-to-cart-quantity" value="1" />
            {/* {button.outerHTML} */}
            <div  dangerouslySetInnerHTML={{
              __html: button.outerHTML
            }}/>
          </div>
          <button
            type="button" 
            className="btn wishlist-heart wishlist-heart__tile null dyMonitor" 
            data-add-to-wishlist-url="/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Wishlist-AddProduct" 
            data-remove-from-wishlist-url="/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Wishlist-RemoveProduct" 
            data-pid={id}
            data-adid={dataAdid}
          ></button>
        </div>
      </div>

    </div>
  )
}

export default RangeTile