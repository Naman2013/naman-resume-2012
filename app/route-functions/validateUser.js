import store from '../store';
import { checkUser } from '../modules/User';

export default function validateUser(nextState, replace, callback) {
  store.dispatch(checkUser(nextState.location.pathname, replace, callback));
}
