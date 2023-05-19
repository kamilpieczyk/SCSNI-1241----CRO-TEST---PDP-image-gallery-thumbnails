import { createContext, h } from 'preact'
import { useState } from 'preact/hooks'

export const ColorSliderContext = createContext(null);

/** @jsx h */

export const ColorSliderContextProvider = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const [type, setType] = useState('color');
  const [isColorChanged, setColorChanged] = useState(false);

  const context = {
    visible: [isVisible, setVisible],
    type: [type, setType],
    changed: [isColorChanged, setColorChanged]
  }

  return (
    <ColorSliderContext.Provider value={context}>
      {children}
    </ColorSliderContext.Provider>
  )
}