import { h } from 'preact'

/** @jsx h */

/** @param {{
  count: String;
  text: String;
  imageStyle: String;
  onClick: Function;
 }} */
const Button = ({ count, text, imageStyle, onClick, isTrim }) => {
  return (
    <div onClick={onClick} class="product-attributes product-attributes-fancy has-selected-value" data-attr="color" data-url-param="dwvar_OL054270_color" data-selected-value="HILTON-COLLECTION-GREY-2" style={{
      cursor: 'pointer',
    }}>
      <label class="product-attributes__title color" style={{ marginBottom: '-3px' }}>
        <span style = {{ fontSize: '13px' }}>Choose a { isTrim ? 'trim' : 'colour' }</span>
        <span class="product-attributes__count">{ count }</span>
      </label>
      <div class="product-attributes__selected-value">
        <div data-select-url="https://www.scs.co.uk/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Product-Variation?dwvar_OL054270_color=HILTON-COLLECTION-GREY-2&amp;dwvar_OL054270_customTrim=OAK-EFFECT&amp;pid=OL054270&amp;quantity=1" class="product-attributes__value  selected selectable">
          <span data-attr-value="HILTON-COLLECTION-GREY-2" class="swatch-value color-value">
            <span 
              class="swatch-image" 
              style = {{
                backgroundImage: imageStyle,
                backgroundSize: 'contain',
                width: '42px',
                height: '42px',
              }}
            ></span>
            <span class="swatch-text" style = {{ fontSize: '13px' }}>{ text }</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Button