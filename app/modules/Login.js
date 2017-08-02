import axios from 'axios';
import { push } from 'react-router-redux';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';
import * as userActions from './User';

import SETTINGS from '../config';

const LOGIN_SHOW = 'LOGIN_SHOW';
const LOGIN_HIDE = 'LOGIN_HIDE';

const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGIN_START = 'LOGIN_START';
const LOGIN_RESET = 'LOGIN_RESET';

export const show = createAction(LOGIN_SHOW);
export const hide = createAction(LOGIN_HIDE);

const loginFailed = payload => ({
  type: LOGIN_FAIL,
  payload,
});

const startLogin = () => ({
  type: LOGIN_START,
});

export const loginReset = () => ({
  type: LOGIN_RESET,
});

export const login = loginFormValues => (dispatch, getState) => {
  const { errorHandlerBody } = getState().authorization;
  const { username, passwd } = loginFormValues;

  dispatch(startLogin());

  return axios.post('/api/users/login', {
    username,
    passwd,
  })
  .then((result) => {
    const { apiError } = result.data;
    if (apiError) {
      dispatch(loginFailed(result.data));
    } else {
      dispatch(loginReset());
      dispatch(userActions.store(result.data));
      dispatch(hide());

      /**
        TODO: remove this check once we are in production with the pretty
        URL branch...
      */
      if (SETTINGS.isHashHistory()) {
        dispatch(push(errorHandlerBody.currentPageId.substr(2)));
      } else {
        dispatch(push(errorHandlerBody.currentPageId));
      }
    }
  })
  .catch((error) => {
    dispatch(loginFailed(error));
  });
};

export const globalHeaderlogin = loginFormValues => (dispatch, getState) => {
  const { errorHandlerBody } = getState().authorization;
  const { username, passwd } = loginFormValues;

  dispatch(startLogin());

  return axios.post('/api/users/login', {
    username,
    passwd,
  })
  .then((result) => {
    const { apiError } = result.data;

    if (apiError) {
      dispatch(loginFailed(result.data));
    } else {
      dispatch(loginReset());
      dispatch(userActions.store(result.data));
      dispatch(hide());
      window.location.reload();
    }
  })
  .catch((error) => {
    dispatch(loginFailed(error));
  });
};

const initialState = {
  isShowed: false,

  loginFailed: false,
  loggingIn: false,
};

export default createReducer(initialState, {
  [LOGIN_RESET](state) {
    return {
      ...state,
      loginFailed: false,
      loggingIn: false,
    };
  },
  [LOGIN_START](state) {
    return {
      ...state,
      loginFailed: false,
      loggingIn: true,
    };
  },
  [LOGIN_FAIL](state) {
    return {
      ...state,
      loginFailed: true,
      loggingIn: false,
    };
  },
  [LOGIN_SHOW](state) {
    return {
      ...state,
      isShowed: true,
    };
  },
  [LOGIN_HIDE](state) {
    return {
      ...state,
      isShowed: false,
    };
  },
});
