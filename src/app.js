import { h, render } from 'preact'

import ActionBox from '@components/action-box';
import ActionBoxMobile from '@components/action-box-mobile';
import { ColorSliderContextProvider } from '@/context/color-slider.context'

import '@/global-styles/style.scss'

/** @jsx h */

const renderActionBox = () => {
  const carouselContainer = document.querySelector('.pdp-fusion__modify-carousel-container');

  if (carouselContainer) {
    const div = document.createElement('div');
    carouselContainer.appendChild(div);
    render(
      <ColorSliderContextProvider>
        <ActionBox />
        <ActionBoxMobile />
      </ColorSliderContextProvider>, 
      div
    );
  }
}

export default () => {
  renderActionBox();
}