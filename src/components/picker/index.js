import { h } from 'preact'
import { useState, useContext, useEffect } from 'preact/hooks'

import ColorPicker from './color';
import TrimPicker from './trim';
import { ColorSliderContext } from '@/context/color-slider.context'

import './style.scss'

/** @jsx h  */

const PickerComponent = () => {
  const context =  useContext(ColorSliderContext);

  const [selectType] = context.type;
  const [isVisible, setVisible] = context.visible;
  const [isColorChanged, setColorChanged] = context.changed;

  if (isVisible) return (
    <div className="pdp-fusion__color-picker-container">
      <div className="pdp-fusion__color-picker">
        {
          selectType === 'color'
          ? <ColorPicker closeAction = {() => setVisible(false)} setColorChanged={setColorChanged} />
          : <TrimPicker closeAction = {() => setVisible(false)} setColorChanged={setColorChanged} />
        }
      </div>
    </div>
  )
}

export default PickerComponent