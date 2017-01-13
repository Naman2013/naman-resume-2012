import createReducer from '../utils/createReducer';

import {
  FETCH_BEST_START,
  FETCH_BEST_SUCCESS,
  FETCH_BEST_FAIL
} from './get-best-action';

const initialState = {
  bestPosts: {},
  error: {},
  sponsor: false,
  date: false,
  failed: false,
  fetching: true
};

export default createReducer(initialState, {
  [FETCH_BEST_START](state) {
    return {
      ...state,
      bestPosts: {},
      sponsor: false,
      date: false,
      error: {},
      fetching: true
    };
  },
  [FETCH_BEST_SUCCESS](state, { payload }) {
    return {
      ...state,
      bestPosts: payload.posts,
      sponsor: payload.sponsorInformation,
      date: payload.pageDate,
      error: {},
      fetching: false
    };
  },
  [FETCH_BEST_FAIL](state, { payload }) {
    return {
      ...state,
      bestPosts: {},
      sponsor: false,
      date: false,
      error: payload,
      fetching: false
    };
  },
});
