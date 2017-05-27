import { hashHistory } from 'react-router';
import cookie from 'cookie';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

export const set = createAction(SET_USER, 'user');
export const removeUser = createAction(REMOVE_USER);

export function store(user) {
  localStorage.setItem('user', JSON.stringify(user));
  document.cookie = cookie.serialize('cid', user.cid, { domain: '.slooh.com' });
  document.cookie = cookie.serialize('token', user.token, { domain: '.slooh.com' });
  document.cookie = cookie.serialize('at', user.at, { domain: '.slooh.com' });
  document.cookie = cookie.serialize('fname', user.fname, { domain: '.slooh.com' });

  return (dispatch) => {
    dispatch(set(user));
  };
}

export function destroySession() {
  localStorage.removeItem('user');
  document.cookie = cookie.serialize('cid', '', { domain: '.slooh.com', expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });
  document.cookie = cookie.serialize('token', '', { domain: '.slooh.com', expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });
  document.cookie = cookie.serialize('at', '', { domain: '.slooh.com', expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });
  document.cookie = cookie.serialize('fname', '', { domain: '.slooh.com', expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });
}

export const logout = () => {
  destroySession();
  hashHistory.push('/');
  window.location.reload();
}

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
  return (dispatch, getState) => {
    const userJSON = localStorage.getItem('user');

    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(store(user));
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
