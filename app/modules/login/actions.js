import axios from 'axios';
import { store as storeUser } from 'modules/User';

export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export const LOGIN_GOOGLE_USER_START = 'LOGIN_GOOGLE_USER_START';
export const LOGIN_GOOGLE_USER_FAIL = 'LOGIN_GOOGLE_USER_FAIL';

export const RESET_LOGIN_USER = 'RESET_LOGIN_USER';

const logUserInStart = payload => ({
  type: LOGIN_USER_START,
  payload,
});

const logUserInFail = payload => ({
  type: LOGIN_USER_FAIL,
  payload,
});

const logGoogleUserInStart = payload => ({
  type: LOGIN_GOOGLE_USER_START,
  payload,
});

const logGoogleUserInFail = payload => ({
  type: LOGIN_GOOGLE_USER_FAIL,
  payload,
});

export const resetLogIn = () => ({
  type: RESET_LOGIN_USER,
});

export const logUserIn = loginForm => (dispatch) => {
  const { username, pwd } = loginForm;

  dispatch(logUserInStart());

  return axios.post('/api/users/login', {
    username,
    passwd: pwd,
  }).then((result) => {
    const { apiError } = result.data;

    if (apiError) {
      dispatch(logUserInFail(result.data));
    } else {
      dispatch(resetLogIn());
      dispatch(storeUser(result.data));
    }
  })
    .catch(error => dispatch(logUserInFail(error)));
};

/* Log the user in via Google SSO */
export const logGoogleUserIn = googleProfileResult => (dispatch) => {
  const { googleProfileId, googleProfileEmail } = googleProfileResult;

  dispatch(logGoogleUserInStart());

  return axios.post('/api/users/login', {
    username: googleProfileEmail,
    passwd: 'notrequiredforthiscall',
    googleProfileId: googleProfileId,
  }).then((result) => {
    const { apiError } = result.data;

    if (apiError) {
      dispatch(logGoogleUserInFail(result.data));
    } else {
      dispatch(resetLogIn());
      dispatch(storeUser(result.data));
    }
  })
    .catch(error => dispatch(logGoogleUserInFail(error)));
};
