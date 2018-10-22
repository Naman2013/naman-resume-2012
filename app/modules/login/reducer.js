import createReducer from '../utils/createReducer';
import {
  LOGIN_USER_START,
  LOGIN_USER_FAIL,
  LOGIN_GOOGLE_USER_START,
  LOGIN_GOOGLE_USER_FAIL,
  RESET_LOGIN_USER,
} from './actions';

const initialState = {
  loggingIn: false,
  loginFailed: false,
};

export default createReducer(initialState, {
  [RESET_LOGIN_USER]() {
    return {
      ...initialState,
    };
  },
  [LOGIN_USER_START]() {
    return {
      ...initialState,
      loggingIn: true,
    };
  },
  [LOGIN_USER_FAIL](state) {
    return {
      ...state,
      loginFailed: true,
    };
  },
  [LOGIN_GOOGLE_USER_START]() {
    return {
      ...initialState,
      loggingIn: true,
    };
  },
  [LOGIN_GOOGLE_USER_FAIL](state) {
    return {
      ...state,
      loginFailed: true,
    };
  },
});
