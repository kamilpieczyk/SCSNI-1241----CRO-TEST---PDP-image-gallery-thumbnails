import { h } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'

import VideoIcon from '@components/icons/video';
import ThreeDIcon from '@components/icons/threeD';
import ViewInYourSpaceIcon from '@components/icons/viewInYourSpace';
import Slides from './slides';

import './style.scss';
import { ColorSliderContext } from '@/context/color-slider.context'

/** @jsx h */

const ActionBox = () => {
  const context =  useContext(ColorSliderContext);

  const [isVideo, setVideo] = useState(false);
  const [is3D, set3D] = useState(false);
  const [isView, setView] = useState(false);
  const [isMobile, setMobile] = useState(false);

  const handle3DvideoClick = () => {
    let button = document.querySelector('.pdp-carousel-slide__thumb--no-ar');
    if (!button) button = document.querySelector('.pdp-carousel-slide__thumb--has-ar');

    const index = button ? Array.prototype.indexOf.call(button.parentNode.children, button) + 1 : 0;
    let elementWithHandler = document.querySelector(`[aria-label="Go to slide ${index}"]`);
    elementWithHandler.click();
  }
  
  const handleVideoClick = () => {
    const videoButton = document.querySelector('.pdp-carousel-slide__thumb-content--video')
    /**
     * @type {number}
     */
    const index = videoButton ? Array.prototype.indexOf.call(videoButton.parentNode.parentNode.children, videoButton.parentNode) + 1 : 0;

    let elementWithHandler = document.querySelector(`[aria-label="Go to slide ${index}"]`);

    elementWithHandler.click();
  }

  const handleDevice = () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setMobile(true)
    }
    else {
      setMobile(false)
    }
  }

  useEffect(() => {
    const threeD = document.querySelector('#sketchfab-container');
    if (threeD && !isMobile) set3D(true);
      
    const video = document.querySelector('.pdp-carousel-slide__content--video');
    if (video) setVideo(true);
  }, [isMobile]);

  useEffect(() => {
    const element = document.querySelector('.pdp-carousel-slide__thumb--no-ar');

    if (is3D && element && !isMobile) {
      element.classList.add('d-none')
    }
    else if (element) {
      element.classList.remove('d-none')
    }
  }, [is3D, isMobile])

  useEffect(() => {
    handleDevice()
    window.addEventListener('resize', handleDevice)
  }, [])

  if (isMobile) return (
    <div className="plp-fusion__action-box-mobile">
      <Slides 
        threeD={ !is3D ? null : ({ callback, isActive }) => (
          <div
            style={{ display: is3D ? 'block' : 'none' }}
            className={`plp-fusion__action ${isActive && 'active'}`}
            onClick={() => {
              handle3DvideoClick();
              callback();
            }}
          >
            <div className="plp-fusion__action---360">
              <img src="https://www.scs.co.uk/on/demandware.static/Sites-SFRA_SCS-Site/-/en_GB/v1686064936359/images/pdp/icon--360.svg" alt="play-icon" />
            </div>
          </div>
        )}

        video={ !isVideo ? null : ({ callback, isActive }) => (
          <div
            style={{ display: isVideo ? 'block' : 'none' }}
            className={`plp-fusion__action ${isActive && 'active'}`}
            onClick={() => { 
              handleVideoClick();
              callback();
            }}
          >
            <div className="plp-fusion__action---video">
              <img src="https://www.scs.co.uk/on/demandware.static/Sites-SFRA_SCS-Site/-/en_GB/v1686060016359/images/pdp/icon--video.svg" alt="play-icon" />
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default ActionBox;