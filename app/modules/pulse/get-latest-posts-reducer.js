import createReducer from '../utils/createReducer';

import {
  FETCH_PAGE_META_START,
  FETCH_PAGE_META_SUCCESS,
  FETCH_POPULAR_POSTS_START,
  FETCH_POPULAR_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  RESET_ILLUMINATIONS_POSTS,
  SEARCH_POSTS_FAIL,
  SEARCH_POSTS_START,
  SEARCH_POSTS_SUCCESS
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
  illuminations: {
    posts: [],
  },
  error: {},
  failed: false,
  fetching: true,
  fetchingPageMeta: false,
  pageMeta: { ...defaultPageMeta },
  page: 1,
  postsPerPage: 10,
  searchTriggered: false,
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
  [FETCH_POSTS_START](state) {
    return {
      ...state,
      illuminations: {
        posts: [],
      },
      error: {},
      fetching: true,
    };
  },
  [FETCH_POSTS_SUCCESS](state, { payload }) {
    return {
      ...state,
      illuminations: payload,
      error: {},
      page: payload.page,
      fetching: false,
    };
  },
  [FETCH_POSTS_FAIL](state, { payload }) {
    return {
      ...state,
      illuminations: {
        posts: [],
      },
      error: payload,
      fetching: false,
    };
  },
  [RESET_ILLUMINATIONS_POSTS](state) {
    return {
      ...state,
      illuminations: {
        posts: [],
      },
      fetching: false,
      searchTriggered: false,
    };
  },
  [SEARCH_POSTS_START](state) {
    return {
      ...state,
      illuminations: {
        posts: [],
      },
      error: {},
      searchTriggered: true,
      fetching: true,
    };
  },
  [SEARCH_POSTS_SUCCESS](state, { payload }) {
    return {
      ...state,
      illuminations: payload,
      error: {},
      page: payload.page,
      fetching: false,
    };
  },
  [SEARCH_POSTS_FAIL](state, { payload }) {
    return {
      ...state,
      illuminations: {
        posts: [],
      },
      error: payload,
      fetching: false,
    };
  },
});
