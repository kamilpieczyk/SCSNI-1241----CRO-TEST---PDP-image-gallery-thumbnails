import app from './app';
import pdpRangeSection from '@/other-tests/PDP range section';
import TopPageModificationsController from '@controllers/topPageModification.controller';
import LocationController from '@controllers/location.controller';
import implementStyle from '@/implement-style'


// if (LocationController.isGoogleShopping() && LocationController.checkIfIsSofaProduct()) {
  const topPageMods = new TopPageModificationsController();
  implementStyle();
  app();
  pdpRangeSection();

  window.dispatchEvent(new Event('resize'));

  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 1000);
// }
