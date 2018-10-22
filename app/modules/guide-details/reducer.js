import clone from 'lodash/clone';
import createReducer from '../utils/createReducer';

import {
  FETCH_GUIDE_DATA,
  FETCH_GUIDE_DATA_START,
  FETCH_GUIDE_DATA_SUCCESS,
  FETCH_GUIDE_DATA_FAIL,
  RESET_GUIDE_DATA,

  } from './actions';

const initialState = {
  guideData: {},
};

export default createReducer(initialState, {
  [FETCH_GUIDE_DATA_SUCCESS](state, { payload }) {
    return {
      ...state,
      guideData: payload,
    };
  },
  [RESET_GUIDE_DATA](state) {
    return {
      ...state,
      guideData: Object.assign({}, initialState.guideData),
    };
  },
  [FETCH_GUIDE_DATA_START](state) {
    return {
      ...state,
      guideData: Object.assign({}, initialState.guideData),
    };
  },
  [FETCH_GUIDE_DATA_FAIL](state, { payload }) {
    return {
      ...state,
      guideData: Object.assign({}, initialState.guideData),
      errorBody: payload,
    };
  },
});
