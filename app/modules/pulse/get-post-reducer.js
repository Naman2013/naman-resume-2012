import createReducer from '../utils/createReducer';

import {
  FETCH_POST_START,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  FETCH_PAGE_META_START,
  FETCH_PAGE_META_SUCCESS,
  FETCH_POPULAR_POSTS_START,
  FETCH_POPULAR_POSTS_SUCCESS,
  FETCH_MORE_ABOUT_OBJECT_START,
  FETCH_MORE_ABOUT_OBJECT_SUCCESS,
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
  fetchingPopularPosts: false,
  popularPosts: {
    itemList: [],
  },
  fetchingMoreAboutObject: false,
  moreAboutObject: {
    itemList: [],
    sectionObjectTitle: '',
    sectionTitle: '',
    sectionSubtitle: '',
  },
};

export default createReducer(initialState, {
  [FETCH_MORE_ABOUT_OBJECT_START](state) {
    return {
      ...state,
      fetchingMoreAboutObject: true,
      moreAboutObject: {
        itemList: [],
      },
    };
  },
  [FETCH_MORE_ABOUT_OBJECT_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingMoreAboutObject: false,
      moreAboutObject: payload,
    };
  },
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
      fetching: true,
      failed: false,
    };
  },
  [FETCH_POST_SUCCESS](state, { payload }) {
    return {
      ...state,
      post: payload.posts[0],
      error: {},
      fetching: false,
      failed: false,
    };
  },
  [FETCH_POST_FAIL](state, { payload }) {
    return {
      ...state,
      post: {},
      error: payload,
      fetching: false,
      failed: true,
    };
  },
});
