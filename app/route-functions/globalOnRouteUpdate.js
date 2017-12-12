import store from '../store';
import { deactivateMenu } from '../modules/menu/actions';
import { resetPageMeta } from '../modules/pageLevelMetaContent/seo-actions';

export default function globalOnRouteUpdate() {
  window.scrollTo(0, 0);
  store.dispatch(deactivateMenu());
  store.dispatch(resetPageMeta());
}
