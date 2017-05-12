import store from '../store';
import validateUser from './validateUser';
import { authenticateRegistrationPage } from '../modules/roadtrip-registration/actions';

export default function validateRoadtripRegistration(nextState, replace, callback) {
  validateUser(nextState, replace, callback);
  store.dispatch(authenticateRegistrationPage(nextState.location.pathname, replace, callback));
}
