import createReducer from '../utils/createReducer';

import {
  FETCH_PICTURES_START,
  FETCH_PICTURES_SUCCESS,
  FETCH_PICTURES_FAIL,
} from './get-pictures-action';

const initialState = {
  images: {},
  count: 0,
  error: {},
  failed: false,
  fetching: true,
};

export default createReducer(initialState, {
  [FETCH_PICTURES_START](state) {
    return {
      ...state,
      images: {},
      count: 0,
      error: {},
      fetching: true,
    };
  },
  [FETCH_PICTURES_SUCCESS](state, { payload }) {
    return {
      ...state,
      images: payload.imageList,
      count: payload.imageCount,
      error: {},
      fetching: false,
    };
  },
  [FETCH_PICTURES_FAIL](state, { payload }) {
    return {
      ...state,
      post: {},
      error: payload,
      fetching: false,
    };
  },
});
