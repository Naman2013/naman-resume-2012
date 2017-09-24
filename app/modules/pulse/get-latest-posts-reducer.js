import createReducer from '../utils/createReducer';

import {
  FETCH_POPULAR_POSTS_START,
  FETCH_POPULAR_POSTS_SUCCESS,
  FETCH_PAGE_META_START,
  FETCH_PAGE_META_SUCCESS,
  FETCH_LATEST_POSTS_START,
  FETCH_LATEST_POSTS_SUCCESS,
  FETCH_LATEST_POSTS_FAIL,
} from './get-latest-posts-action';

const defaultPageMeta = {
  headerTitle: '',
  headerSubtitle: '',
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
  fetchingPopularPosts: false,
  popularPosts: {
    itemList: [],
  },
  latestPosts: {},
  error: {},
  failed: false,
  fetching: true,
  fetchingPageMeta: false,
  pageMeta: { ...defaultPageMeta },
  page: 1,
  postsPerPage: 10,
};

export default createReducer(initialState, {
  [FETCH_POPULAR_POSTS_START](state) {
    return {
      ...state,
      fetchingPopularPosts: true,
      popularPosts: {
        itemList: [],
      },
    };
  },
  [FETCH_POPULAR_POSTS_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingPopularPosts: false,
      popularPosts: payload,
    };
  },
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
      page: payload.page,
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
