import createReducer from '../utils/createReducer';

import {
  FETCH_POST_START,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  FETCH_PAGE_META_START,
  FETCH_PAGE_META_SUCCESS,
} from './get-post-action';

const initialState = {
  post: {},
  error: {},
  failed: false,
  fetching: true,
  pageMeta: {
    headerIconURL: '',
    headerObjectTitle: 'Loading...',
    showRecommends: false,
    showCreateNewPostButton: false,
  },
  fetchingPageMeta: false,
};

export default createReducer(initialState, {
  [FETCH_PAGE_META_START](state) {
    return {
      ...state,
      fetchingPageMeta: true,
    };
  },
  [FETCH_PAGE_META_SUCCESS](state, { payload }) {
    return {
      ...state,
      pageMeta: payload,
      fetchingPageMeta: false,
    };
  },
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
