import _ from 'lodash';
import createReducer from '../utils/createReducer';
import {
  GUARDIAN_INFO_START,
  GUARDIAN_INFO_SUCCESS,
  GUARDIAN_INFO_FAIL,
} from './actions';

const initialState = {
  guardianInfo: {},
  error: false,
  errorMessage: {},
  fetching: true,
};

export default createReducer(initialState, {
  [GUARDIAN_INFO_START](state) {
    return {
      ...state,
    };
  },
  [GUARDIAN_INFO_SUCCESS](state, { payload }) {
    return {
      ...state,
      guardianInfo: payload,
      error: false,
      errorMessage: {},
      fetching: false,
    };
  },
  [GUARDIAN_INFO_FAIL](state, { payload }) {
    const { errorMsg } = payload;
    return {
      ...state,
      guardianInfo: {},
      error: true,
      errorMessage: errorMsg,
      fetching: false,
    };
  },
});
