import createReducer from '../utils/createReducer';

import {
  FETCH_PICTURES_START,
  FETCH_PICTURES_SUCCESS,
  FETCH_PICTURES_FAIL
} from './get-pictures-action';

const initialState = {
  post: {},
  error: {},
  failed: false,
  fetching: true
};

export default createReducer(initialState, {
  [FETCH_PICTURES_START](state) {
    return {
      ...state,
      post: {},
      error: {},
      fetching: true
    };
  },
  [FETCH_PICTURES_SUCCESS](state, { payload }) {
    return {
      ...state,
      post: payload.posts[0],
      error: {},
      fetching: false
    };
  },
  [FETCH_PICTURES_FAIL](state, { payload }) {
    return {
      ...state,
      post: {},
      error: payload,
      fetching: false
    };
  },
});
