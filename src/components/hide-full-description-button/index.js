import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import './style.scss'

/** @jsx h */

const HideFullDescripton = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    window.dispatchEvent(new Event('hideProductDescription'));

    const element = document.querySelector('.pdp-guideprice-section');
    element.style.display = "none";
  }

  useEffect(() => {
    window.addEventListener('seeFullProductDescription', () => {
      setShow(true);
    });
    window.addEventListener('hideProductDescription', () => {
      setShow(false);
    });
  }, [])

  return (
    <div className="pdp-fusion__hide-full-description-container">
      <a onClick={handleClick} className="pdp-fusion__hide-full-description" style={{ display: show ? 'block' : 'none' }}>
        See less
      </a>
    </div>
  )
}

export default HideFullDescripton;