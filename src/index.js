import app from './app';
// import { createLoader, hideLoader } from './implement-loader';
import TopPageModificationsController from '@controllers/topPageModification.controller';
import LocationController from '@controllers/location.controller';
import implementStyle from '@/implement-style'


if ( !LocationController.checkIfIsFlooringProduct() ) {
  const topPageMods = new TopPageModificationsController();
  implementStyle();
  app();

  window.dispatchEvent(new Event('resize'));

  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 1000);
}
