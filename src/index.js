import app from './app';
import TopPageModificationsController from '@controllers/topPageModification.controller';
import LocationController from '@controllers/location.controller';
import implementStyle from '@/implement-style'


if (LocationController.isGoogleShopping() && LocationController.checkIfIsSofaProduct() && window.matchMedia('(min-width: 769px)').matches) {
  const topPageMods = new TopPageModificationsController();
  implementStyle();
  app();

  window.dispatchEvent(new Event('resize'));

  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 1000);
}
