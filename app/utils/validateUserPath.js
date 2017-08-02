/**
  first cut at solving for moving users around based on
  their signed in state and their account level

  ROLES would be much more efficient!
*/
import { browserHistory } from 'react-router';

const PUBLIC_PATHS = [
  '/',
  '/about/mission',
  '/about/news',
  '/about/job',
  '/about/contact',
  '/about/leadership',
  '/about/pricing',
  '/registration/sign-in',
  '/registration/plans',
  '/registration/upgrade-apprentice',
  '/registration/upgrade-astronomer',
];

const SIGN_IN_PATH = '/registration/sign-in';
const HOME = '/';

export function isPublicPath(path) {
  return PUBLIC_PATHS.indexOf(path) > -1;
}

function redirectToSignIn() {
  browserHistory.push(SIGN_IN_PATH);
}

function redirectToHome() {
  browserHistory.push(HOME);
}

export function validateUserPath(path, user = {}) {
  const { isAuthorized } = user;
  const publicPath = isPublicPath(path);

  return {
    shouldRedirect: (!isAuthorized && !publicPath),
  };
}
