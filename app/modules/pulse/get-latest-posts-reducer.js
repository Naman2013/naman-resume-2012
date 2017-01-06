import createReducer from '../utils/createReducer';

import {
  FETCH_LATEST_POSTS_START,
  FETCH_LATEST_POSTS_SUCCESS,
  FETCH_LATEST_POSTS_FAIL
} from './get-latest-posts-action';

const initialState = {
  latestPosts: {},
  error: {},
  failed: false,
  fetching: true
};

export default createReducer(initialState, {
  [FETCH_LATEST_POSTS_START](state) {
    return {
      ...state,
      latestPosts: {},
      error: {},
      fetching: true
    };
  },
  [FETCH_LATEST_POSTS_SUCCESS](state, { payload }) {
    return {
      ...state,
      latestPosts: payload,
      error: {},
      fetching: false
    };
  },
  [FETCH_LATEST_POSTS_FAIL](state, { payload }) {
    return {
      ...state,
      latestPosts: {},
      error: payload,
      fetching: false
    };
  },
});
