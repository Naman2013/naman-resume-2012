import createReducer from '../utils/createReducer';
import {
  FETCH_SETTINGS_START,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAIL,
} from './get-mashup-actions';

const initialState = {
  fetching: false,
  error: null,
  result: {
    apiError: false,
    errorCode: 0,
    errorMsg: '',
    statusCode: 200,
    scriptSource: null,
    dataId: null,
    personalizationId: null,
    personalizationDesc: null,
  },
};

export default createReducer(initialState, {
  [FETCH_SETTINGS_START]() {
    return {
      ...initialState,
      fetching: true,
    };
  },
  [FETCH_SETTINGS_SUCCESS](state, { payload }) {
    return {
      ...state,
      result: payload,
      fetching: false,
    };
  },
  [FETCH_SETTINGS_FAIL](state, { payload }) {
    return {
      ...state,
      error: payload,
      fetching: false,
    };
  },
});
