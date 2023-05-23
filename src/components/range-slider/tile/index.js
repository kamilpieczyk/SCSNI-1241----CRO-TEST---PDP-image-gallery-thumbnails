import './style.scss'

import { h } from 'preact'
import { useMemo, useEffect, useState, useRef } from 'preact/hooks'

/** @jsx h */

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const RangeTile = ({id, wishlistID, name, brand, price, wasPrice, width, height, depth, image, button, dataAdid, link}) => {
  const [isWishlist, setWishlist] = useState(false);

  const handleAddRemoveWishlist = async () => {
    const body = new URLSearchParams();
    body.append('pid', id);

    const fetchSettings = {
      method: 'post',
      body
    }

    let data;

    if (!isWishlist) {
      data = await fetch('/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Wishlist-AddProduct', fetchSettings)
      handleUpdateNumber('increase')
    }
    else {
      data = await fetch(`/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Wishlist-RemoveProduct?pid=${id}`)
      handleUpdateNumber('decrease')
    }

    if (data.status === 200) {
      setWishlist(!isWishlist);
    }
  }

  const handleIsWishlist = () => {
    let cookie = getCookie('wishlist');

    if (cookie) {
      cookie = JSON.parse(cookie);
      cookie = Object.keys(cookie);
      
      cookie.forEach(el => {
        if (id === el) {
          setWishlist(true);
        }
      })
    }
  }

  /**
   * 
   * @param {'increase' | 'decrease'} action 
   */
  const handleUpdateNumber = (action) => {
    const numbers = document.querySelectorAll('.wishlist__quantity');

    numbers.forEach(number => {
      let value = Number(number.textContent);

      if (action === 'decrease')
        value = value-1;
      else
        value = value+1;

      number.textContent = value;
    })

    if (numbers.length <= 0 && action === 'increase') {
      const wishlistBox = document.querySelector('a.wishlist')
      const counter = document.createElement('span')
      counter.className = 'wishlist__quantity'
      counter.innerText = 1
      wishlistBox.appendChild(counter)
    }
  }

  useEffect(() => {
    handleIsWishlist();
  }, [])

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
            className={`btn dy-range-wishlist-heart null dyMonitor ${isWishlist && 'active'}`}
            onClick={handleAddRemoveWishlist}
            // className="btn wishlist-heart wishlist-heart__tile null dyMonitor"
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