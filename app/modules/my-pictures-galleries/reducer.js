import createReducer from '../utils/createReducer';

import {
  FETCH_GALLERIES_START,
  FETCH_GALLERIES_SUCCESS,
  FETCH_GALLERIES_FAIL,
} from './actions';

const initialState = {
  canEditFlag: false,
  imageCount: 0,
  imageList: [],
};

export default createReducer(initialState, {
  [FETCH_GALLERIES_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_GALLERIES_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetching: false,
      ...payload,
    };
  },
  [FETCH_GALLERIES_FAIL](state) {
    return {
      ...state,
      fetching: false,
      error: true,
    };
  },
});
