import { h } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'

import VideoIcon from '@components/icons/video';
import ThreeDIcon from '@components/icons/threeD';
import ViewInYourSpaceIcon from '@components/icons/viewInYourSpace';

import './style.scss';
import { ColorSliderContext } from '@/context/color-slider.context'

/** @jsx h */

const ActionBox = () => {
  const context =  useContext(ColorSliderContext);

  const [isVideo, setVideo] = useState(false);
  const [is3D, set3D] = useState(false);
  const [isView, setView] = useState(false);

  const handle3DvideoClick = () => {
    let elementWithHandler = document.querySelector('[aria-label="Go to slide 3"]');
    if (window.plpFusion?.isColorChanged)
      elementWithHandler = document.querySelector('[aria-label="Go to slide 2"]');
    elementWithHandler.click();
  }
  
  const handleVideoClick = () => {
    let elementWithHandler = document.querySelector('[aria-label="Go to slide 4"]');

    if (!document.querySelector('.sketchfab-container'))
      elementWithHandler = document.querySelector('[aria-label="Go to slide 3"]');

    if (window.plpFusion?.isColorChanged)
      elementWithHandler = document.querySelector('[aria-label="Go to slide 3"]');

    if (!document.querySelector('.sketchfab-container') && window.plpFusion?.isColorChanged)
      elementWithHandler = document.querySelector('[aria-label="Go to slide 2"]');

    elementWithHandler.click();
  }

  useEffect(() => {
    const threeD = document.querySelector('#sketchfab-container');
    if (threeD) set3D(true);
      
    const video = document.querySelector('.pdp-carousel-slide__content--video');
    if (video) setVideo(true);
  }, []);

  return (
    <div className="plp-fusion__action-box">
      <div
        style={{ display: isView ? 'block' : 'none' }}
        className="plp-fusion__action"
        id="js-start-ar"
      >
        <ViewInYourSpaceIcon />
      </div>

      <div
        style={{ display: is3D ? 'block' : 'none' }}
        className="plp-fusion__action"
        onClick={handle3DvideoClick}
      >
        <ThreeDIcon />
      </div>

      <div
        style={{ display: isVideo ? 'block' : 'none' }}
        className="plp-fusion__action"
        onClick={handleVideoClick}
      >
        <VideoIcon />
      </div>
    </div>
  )
}

export default ActionBox;