import createReducer from '../utils/createReducer';

import {
  FETCH_POST_START,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL
} from './get-post-action';

const initialState = {
  post: {},
  error: {},
  failed: false,
  fetching: true
};

export default createReducer(initialState, {
  [FETCH_POST_START](state) {
    return {
      ...state,
      post: {},
      error: {},
      fetching: true
    };
  },
  [FETCH_POST_SUCCESS](state, { payload }) {
    return {
      ...state,
      post: payload.posts[0],
      error: {},
      fetching: false
    };
  },
  [FETCH_POST_FAIL](state, { payload }) {
    return {
      ...state,
      post: {},
      error: payload,
      fetching: false
    };
  },
});
