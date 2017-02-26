import createReducer from '../utils/createReducer';

import {
  FETCH_PAGE_META_START,
  FETCH_PAGE_META_SUCCESS,
  FETCH_LATEST_POSTS_START,
  FETCH_LATEST_POSTS_SUCCESS,
  FETCH_LATEST_POSTS_FAIL,
} from './get-latest-posts-action';

const defaultPageMeta = {
  headerTitle: 'Loading...',
  objectIdList: [],
  showAdUnit: false,
  showCreateNewPostButton: false,
  showHottestPostsMenu: false,
  showLatestPostsMenu: false,
  showPopularPosts: false,
  showPostTypesSubmenu: false,
  showRecommends: false,
  showTwitterWidget: false,
};

const initialState = {
  latestPosts: {},
  error: {},
  failed: false,
  fetching: true,
  fetchingPageMeta: false,
  pageMeta: { ...defaultPageMeta },
};

export default createReducer(initialState, {
  [FETCH_PAGE_META_START](state) {
    return {
      ...state,
      fetchingPageMeta: true,
      pageMeta: { ...defaultPageMeta },
    };
  },
  [FETCH_PAGE_META_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingPageMeta: false,
      pageMeta: payload,
    };
  },
  [FETCH_LATEST_POSTS_START](state) {
    return {
      ...state,
      latestPosts: {},
      error: {},
      fetching: true,
    };
  },
  [FETCH_LATEST_POSTS_SUCCESS](state, { payload }) {
    return {
      ...state,
      latestPosts: payload,
      error: {},
      fetching: false,
    };
  },
  [FETCH_LATEST_POSTS_FAIL](state, { payload }) {
    return {
      ...state,
      latestPosts: {},
      error: payload,
      fetching: false,
    };
  },
});
