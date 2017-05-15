import createReducer from '../utils/createReducer';

import {
  FETCH_ERRORS_START,
  RESET_ERROR_STATE,
  FETCH_ERRORS_SUCCESS,
  CAPTURE_ERROR_STATE,
  SET_SIGN_IN_RETURN_URL,
} from './actions';

const initialState = {
  fetchingErrorBody: false,
  errorHandlerBody: {},

  apiError: null,
  errorCode: null,
  statusCode: null,
  currentPageID: null,

  signInReturnURL: '',
};

export default createReducer(initialState, {
  [SET_SIGN_IN_RETURN_URL](state, { signInReturnURL }) {
    return {
      ...state,
      signInReturnURL,
    };
  },
  [FETCH_ERRORS_START](state) {
    return {
      ...state,
      fetchingErrorBody: true,
    };
  },
  [FETCH_ERRORS_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingErrorBody: false,
      errorHandlerBody: payload,
    };
  },
  [CAPTURE_ERROR_STATE](state, { apiError, errorCode, statusCode, currentPageID }) {
    return {
      ...state,
      apiError,
      errorCode,
      statusCode,
      currentPageID,
    };
  },
  [RESET_ERROR_STATE](state) {
    return {
      ...state,
      apiError: null,
      errorCode: null,
      statusCode: null,
      currentPageID: null,
    };
  },
});
