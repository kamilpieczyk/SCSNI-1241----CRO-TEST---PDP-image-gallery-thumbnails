var DyPreviewMode = new function() {

  var CHANGE_MODE = 'dyOnSiteEditor::changeMode';
  var ROTATE_BUTTON_SPACE = 100;

  var lastEvent = null;
  var landscape = false;
  var onSiteIFrame = null;
  var rotateButton = null;
  var aboutLink = null;
  var modes = {
    phone: {
      width: '320px',
      height: '568px'
    },
    phoneLandscape: {
      height: '320px',
      width: '568px'
    },
    tablet: {
      width: '768px',
      height: '1024px'
    },
    tabletLandscape: {
      height: '768px',
      width: '1024px'
    },
    desktop: {
      width: '100vw',
      height: '100vh'
    }
  };

  function resetClasses(iframe) {
    iframe.classList.remove('mobile');
    iframe.classList.remove('phone');
    iframe.classList.remove('phone-landscape');
    iframe.classList.remove('tablet');
    iframe.classList.remove('tablet-landscape');
  }

  function setMobileMode(iframe) {
    resetClasses(iframe);
    iframe.classList.add('mobile');
    getRotateButton().style.setProperty('display', 'block');
    getAboutLink().style.setProperty('display', 'block');
  }

  function setPhoneMode() {
    var iframe = getOnSiteIFrame();
    landscape = false;
    setMobileMode(iframe);
    iframe.classList.add('phone');
    var scale = calculateScale(iframe, modes.phone);
    modes.phone.scale = scale > 1 ? 1 : scale;
    switchModeStyle(iframe, modes.phone, modes.phone.scale);
  }

  function setPhoneLandscapeMode() {
    var iframe = getOnSiteIFrame();
    landscape = true;
    setMobileMode(iframe);
    iframe.classList.add('phone-landscape');
    switchModeStyle(iframe, modes.phoneLandscape, modes.phone.scale);
  }

  function setTabletMode() {
    var iframe = getOnSiteIFrame();
    landscape = false;
    setMobileMode(iframe);
    iframe.classList.add('tablet');
    var scale = calculateScale(iframe, modes.tablet);
    modes.tablet.scale = scale > 1 ? 1 : scale;
    switchModeStyle(iframe, modes.tablet, modes.tablet.scale);
  }

  function setTabletLandscapeMode() {
    var iframe = getOnSiteIFrame();
    landscape = true;
    setMobileMode(iframe);
    iframe.classList.add('tablet-landscape');
    switchModeStyle(iframe, modes.tabletLandscape, modes.tablet.scale);
  }

  function setDesktopMode() {
    var iframe = getOnSiteIFrame();
    resetClasses(iframe);
    switchModeStyle(iframe, modes.desktop, 1);
    getRotateButton().style.setProperty('display', 'none');
    getAboutLink().style.setProperty('display', 'none');
  }

  function switchModeStyle(iframe, dimension, scale) {
    iframe.style.setProperty('width', dimension.width);
    iframe.style.setProperty('height', dimension.height);
    iframe.style.setProperty('transform', 'scale(' + scale + ')');
  }

  function calculateScale(iframe, dimension) {
    var bodyStyle = window.getComputedStyle(document.body);
    var iframeStyle = window.getComputedStyle(iframe);
    var bodyWidth = parseInt(bodyStyle.width);
    var bodyHeight = parseInt(bodyStyle.height) - ROTATE_BUTTON_SPACE;
    var iframeWidth = parseInt(dimension.width) + getIFrameAddedWidth(iframeStyle);
    var iframeHeight = parseInt(dimension.height) + getIFrameAddedHeight(iframeStyle);
    return Math.min(bodyWidth/iframeWidth, bodyHeight/iframeHeight);
  }

  function getIFrameAddedWidth(iframeStyle) {
    return parseInt(iframeStyle.marginLeft)
      + parseInt(iframeStyle.marginRight)
      + parseInt(iframeStyle.borderLeftWidth)
      + parseInt(iframeStyle.borderRightWidth);
  }

  function getIFrameAddedHeight(iframeStyle) {
    return parseInt(iframeStyle.marginTop)
      + parseInt(iframeStyle.marginBottom)
      + parseInt(iframeStyle.borderTopWidth)
      + parseInt(iframeStyle.borderBottomWidth);
  }

  function getOnSiteIFrame() {
    if (!onSiteIFrame) {
      onSiteIFrame = document.getElementsByClassName('dy-onsite-iframe-source')[0];
    }
    return onSiteIFrame;
  }

  function getRotateButton() {
    if (!rotateButton) {
      rotateButton = document.getElementsByClassName('dy-rotate-preview')[0];
    }
    return rotateButton;
  }

  function getAboutLink() {
    if (!aboutLink) {
      aboutLink = document.getElementsByClassName('dy-about-mobile-view')[0];
    }
    return aboutLink;
  }

  this.listener = function listener(event) {
    if (event.data.action === CHANGE_MODE) {
      lastEvent = event;
        switch (event.data.mode) {
          case 'phone':
            setPhoneMode();
            break;
          case 'phone-landscape':
            setPhoneLandscapeMode();
            break;
          case 'tablet':
            setTabletMode();
            break;
          case 'tablet-landscape':
            setTabletLandscapeMode();
            break;
          default:
            setDesktopMode();
        }
      }
  };

  this.rotateDevice = function rotateDevice() {
    if (landscape) {
      switch (lastEvent.data.mode) {
        case 'phone-landscape':
          lastEvent.data.mode = 'phone';
          break;
        case 'tablet-landscape':
          lastEvent.data.mode = 'tablet';
          break;
      }
    } else {
      switch (lastEvent.data.mode) {
        case 'phone':
          lastEvent.data.mode = 'phone-landscape';
          break;
        case 'tablet':
          lastEvent.data.mode = 'tablet-landscape';
          break;
      }
    }

    DyPreviewMode.listener(lastEvent);
  };
};

window.addEventListener('message', DyPreviewMode.listener, false);
