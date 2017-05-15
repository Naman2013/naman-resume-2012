import store from '../store';
import validateUser from './validateUser';

export default function validateRegistrationPaths(nextState, replace, callback) {
  // if a registration path lands without an error, then navigate the user home
  const { apiError } = store.getState().authorization;
  if (!apiError) {
    replace('/');
  }

  callback();
}
