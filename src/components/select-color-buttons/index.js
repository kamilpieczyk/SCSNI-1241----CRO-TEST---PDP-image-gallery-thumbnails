import { h } from 'preact'
import { useState, useEffect, useContext } from 'preact/hooks'

import Button from './button'
import { ColorSliderContext } from '@/context/color-slider.context'

import './style.scss'

/** @jsx h */

const SelectColorsButttons = () => {
  const [colorData, setColorData] = useState({
    count: '',
    text: '',
    imageStyle: '',
  });
  const [trimData, setTrimData] = useState({
    count: '',
    text: '',
    imageStyle: '',
  });
  const [isColorButtonVisible, setIsColorButtonVisible] = useState(false);
  const [isTrimButtonVisible, setIsTrimButtonVisible] = useState(false);

  const context = useContext(ColorSliderContext);
  const [isColorSwatchSliderVisible, setColorSwatchVisible] = context.visible;
  const [type, setType] = context.type;

  const getData = ( trim = false ) => {
    const swatches = document.querySelector('.product-attributes-wrapper.vwo-hide-picker');
    const colorDiv = swatches ? swatches.querySelector(`[data-attr="${trim ? 'customTrim' : 'color'}"]`) : null;
    const countDiv = colorDiv ? colorDiv.querySelector('.product-attributes__count') : null;
    const swatchTextDiv = colorDiv ? colorDiv.querySelector('.swatch-text') : null;
    const imageDiv = colorDiv ? colorDiv.querySelector('.swatch-image') : null;

    const count = countDiv ? countDiv.textContent : '';
    const text = swatchTextDiv ? swatchTextDiv.textContent : '';
    const imageStyle = imageDiv ? imageDiv.style.backgroundImage : '';

    if (trim && colorDiv) {
      setIsTrimButtonVisible(true);
    }
    else if (colorDiv) {
      setIsColorButtonVisible(true);
    }

    if (trim) {
      setTrimData({
        count,
        text,
        imageStyle
      })
    }
    else {
      setColorData({
        count,
        text,
        imageStyle
      })
    }
  }

  useEffect(() => {
    getData();
    getData(true)
  })

  return (
    <div className={`product-attributes-wrapper pdp-fusion__swatches-container ${!isColorButtonVisible && 'no-swatches'}`} style="display: block !important">
      { isColorButtonVisible && (
        <Button {...colorData} onClick={() => {
          setColorSwatchVisible(true);
          setType('color');
        }} />
      ) }
      { isTrimButtonVisible && (
        <Button {...trimData} isTrim onClick={() => {
          setColorSwatchVisible(true);
          setType('trim');
        }} />
      )}
    </div>
  )
}

export default SelectColorsButttons