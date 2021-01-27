import { closeAllMenus } from 'app/modules/global-navigation/actions';
import { API } from 'app/api';
import { store as storeUser, storeUserNewAT, set, deleteSessionToken, deleteMarketingTrackingId } from 'app/modules/User';

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

export const updateUserAt = at => dispatch => {
  return storeUserNewAT({ at }).then(() => {
    dispatch(
      set({
        at,
      })
    );
  });
};

export const logUserIn = (loginForm, reloadOpts = {}) => dispatch => {
  const { username, pwd } = loginForm;

  dispatch(logUserInStart());

  return API.post('/api/users/login', {
    username,
    passwd: pwd,
  })
    .then(result => {
      const { apiError } = result.data;

      if (apiError) {
        console.error('Error!', apiError);
        dispatch(logUserInFail(result.data));
      } else {
        dispatch(closeAllMenus());
        deleteSessionToken();
        deleteMarketingTrackingId();
        dispatch(resetLogIn());
        dispatch(
          storeUser(Object.assign({ reload: true, ...reloadOpts }, result.data))
        );
      }
    })
    .catch(error => dispatch(logUserInFail(error)));
};

/* Log the user in via Google SSO */
export const logGoogleUserIn = (
  googleProfileResult,
  reloadOpts = {}
) => dispatch => {
  const { googleProfileId, googleProfileEmail } = googleProfileResult;

  dispatch(logGoogleUserInStart());

  return API.post('/api/users/login', {
    username: googleProfileEmail,
    passwd: 'notrequiredforthiscall',
    googleProfileId,
  })
    .then(result => {
      const { apiError } = result.data;

      if (apiError) {
        dispatch(logGoogleUserInFail(result.data));
      } else {
        deleteSessionToken();
        deleteMarketingTrackingId();
        dispatch(resetLogIn());
        dispatch(
          storeUser(Object.assign({ reload: true, ...reloadOpts }, result.data))
        );
        // window.location.reload();
      }
    })
    .catch(error => dispatch(logGoogleUserInFail(error)));
};
