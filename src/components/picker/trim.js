import { h } from 'preact'
import { useCallback } from 'preact/hooks'

import ProductController from '@controllers/product.controller';
// import pdpRangeSection from '@/other-tests/PDP range section';

/** @jsx h */

/** @argument {{ closeAction: Function, setColorChanged: Function }} */
const ColorPicker = ({ closeAction, setColorChanged }) => {
  const product = new ProductController();

  const handleSelectButton = (action) => {
    action();
    closeAction();
    setColorChanged(true);
    window.plpFusion.isColorChanged = true;
    // setTimeout(pdpRangeSection, 1500);
    setTimeout(window.modifySliderTilesMobile, 1500);
    window.dispatchEvent(new Event('color-change'));
  }

  const handleBackButton = useCallback(() => {
    closeAction();
  }, []);

  return (
    <div className = "pdp-fusion__color-picker-box">
      <div className = "pdp-fusion__color-picker-title">
        <span className = "product-attributes-picker__back" onClick = {handleBackButton}>
          Back
        </span>
        <label className = "product-attributes-picker__title" >Trim:</label>
      </div>
      <div className = "pdp-fusion__colors-container">
        {
          product.trims.map(color => (
            <div className = "pdp-fusion__color-picker__color-box">
              <div
                style = {`background-image: url(${color.imageStyle})`}
                className = "pdp-fusion__color-picker__image"
              ></div>
              <div>{ color.name }</div>
              <div className = "pdp-fusion__color-picker__select-box">
                {
                  !color.isSelected
                    ? (
                      <button className = "pdp-fusion__color-picker__select" onClick = {() => handleSelectButton(color.action)}>
                        Select
                      </button>
                    )
                    : (
                      <span class="btn btn-md btn-success btn-selected">
                        <span class="icon icon-standard-success--white hide-420">
                          <img src="/on/demandware.static/Sites-SFRA_SCS-Site/-/default/dw34b469b2/icons/standard-success--white.svg" />
                        </span>
                        Selected
                      </span>
                    )
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ColorPicker