import createReducer from '../utils/createReducer';

import {
  FETCH_ERRORS_START,
  RESET_ERROR_STATE,
  FETCH_ERRORS_SUCCESS,
  CAPTURE_ERROR_STATE,
  SET_SIGN_IN_RETURN_URL,
} from './actions';

const initialState = {
  /**
    @handlingScenario: boolean used to determine whether or not we are dealing
    with an upsell or account issue it should be reset after a working issue
    has been resolved in case future scenarios occur this flag is used to
    help understand that the user has already been asked to address their account
    */
  handlingScenario: false,

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
      handlingScenario: true,
    };
  },
  [RESET_ERROR_STATE](state) {
    return {
      ...state,
      apiError: null,
      errorCode: null,
      statusCode: null,
      currentPageID: null,
      handlingScenario: false,
      signInReturnURL: '',
    };
  },
});
