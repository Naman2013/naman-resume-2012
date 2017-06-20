import { hashHistory } from 'react-router';
import cookie from 'cookie';
import moment from 'moment';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';

const EXPIRATION_DAYS = 90;
const COOKIE_PATH = '/';
const futureDate = moment().add(EXPIRATION_DAYS, 'day').toDate();

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

export const set = createAction(SET_USER, 'user');
export const removeUser = createAction(REMOVE_USER);

export function store({ cid, token, at, fname }) {
  window.document.cookie = cookie.serialize('cid', cid, { domain: 'localhost', secure: false, expires: futureDate, path: COOKIE_PATH });
  window.document.cookie = cookie.serialize('token', token, { domain: 'localhost', secure: false, expires: futureDate, path: COOKIE_PATH });
  window.document.cookie = cookie.serialize('at', at, { domain: 'localhost', secure: false, expires: futureDate, path: COOKIE_PATH });
  window.document.cookie = cookie.serialize('fname', fname, { domain: 'localhost', secure: false, expires: futureDate, path: COOKIE_PATH });

  return (dispatch) => {
    dispatch(set({ cid, token, at, fname }));
  };
}

export function destroySession() {
  window.localStorage.removeItem('user');
  window.document.cookie = cookie.serialize('cid', '', { domain: 'localhost', secure: false, expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path: COOKIE_PATH });
  window.document.cookie = cookie.serialize('token', '', { domain: 'localhost', secure: false, expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path: COOKIE_PATH });
  window.document.cookie = cookie.serialize('at', '', { domain: 'localhost', secure: false, expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path: COOKIE_PATH });
  window.document.cookie = cookie.serialize('fname', '', { domain: 'localhost', secure: false, expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path: COOKIE_PATH });
}

export const logout = () => {
  destroySession();
  hashHistory.push('/');
  window.location.reload();
};

export function destroy() {
  destroySession();

  return (dispatch) => {
    dispatch(removeUser());
  };
}

/**
  Is called on initial app load in App.js
  checks if user is logged in
  */
export function checkUser(pathname, replace, callback) {
  return (dispatch) => {
    const { cid, token, at, fname } = cookie.parse(window.document.cookie);

    if (cid && token && at && fname) {
      dispatch(store({
        cid,
        token,
        at,
        fname,
      }));
      callback();
    } else {
      callback();
    }
  };
}

const initialState = {
  isAuthorized: false,
  statusCode: 200,
  membershipType: null,
  apiError: false,
  errorCode: 0,
};

export default createReducer(initialState, {
  [SET_USER](state, { user }) {
    return {
      ...state,
      ...user,
      isAuthorized: true,
    };
  },
  [REMOVE_USER]() {
    return {
      ...initialState,
    };
  },
});
