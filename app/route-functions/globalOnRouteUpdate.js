import store from '../store';
import { deactivateMenu } from '../modules/menu/actions';

export default function globalOnRouteUpdate() {
  window.scrollTo(0, 0);
  store.dispatch(deactivateMenu());
}
