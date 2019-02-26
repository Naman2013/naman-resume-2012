import clone from 'lodash/clone';
import createReducer from '../utils/createReducer';

import {
  FETCH_BROWSE_FIND_DATA,
  FETCH_BROWSE_FIND_DATA_START,
  FETCH_BROWSE_FIND_DATA_SUCCESS,
  FETCH_BROWSE_FIND_DATA_FAIL,
  FETCH_BROWSE_FIND_DATA_RESET,

  } from './actions';

const initialState = {
  findData: { },
  findMessage: '',
  findRunning: false,
};

export default createReducer(initialState, {
  [FETCH_BROWSE_FIND_DATA_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
      findRunning: false,
    };
  },
  [FETCH_BROWSE_FIND_DATA_START](state) {
    return {
      ...state,
      findRunning: true,
    };
  },
  [FETCH_BROWSE_FIND_DATA_FAIL](state, { payload }) {
    return {
      ...state,
      errorBody: payload,
      findRunning: false,
    };
  },
  [FETCH_BROWSE_FIND_DATA_RESET](state, { payload }) {
    return {
      ...state,
      errorBody: payload,
      findRunning: false,
      findMessage: '',
      findData: { },
    };
  },

});
