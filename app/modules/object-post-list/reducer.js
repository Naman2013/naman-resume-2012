import _ from 'lodash';
import createReducer from '../utils/createReducer';
import {
  FETCH_OBJECT_ALL_TIME_BEST_START,
  FETCH_OBJECT_ALL_TIME_BEST_SUCCESS,
  FETCH_OBJECT_ALL_TIME_BEST_FAIL,
  FETCH_OBJECT_LATEST_CONTENT_START,
  FETCH_OBJECT_LATEST_CONTENT_SUCCESS,
  FETCH_OBJECT_LATEST_CONTENT_FAIL,
  FETCH_PAGE_META_START,
  FETCH_PAGE_META_SUCCESS,
  FETCH_PAGE_META_FAIL,
} from './actions';

const defaultPageMeta = {
  headerObjectTitle: 'Loading...',
  headerIconURL: '',
  showRecommends: false,
  showAdUnit: false,
  showLatestEntriesMenu: false,
  showPostTypesSubmenu: false,
  showGuardian: false,
  showFeaturedObjects: false,
  showFollowObjectButton: false,
  showCreateNewPostButton: false,
  objectId: '',
};

const initialState = {
  fetchingPageMeta: false,
  fetchingPageMetaError: false,
  fetchingPageMetaErrorBody: null,
  pageMeta: { ...defaultPageMeta },
  fetching: false,
  objectPostsPath: 'all-time-best',
  pages: 0,
  objectPosts: [],
  error: false,
};

export default createReducer(initialState, {
  [FETCH_PAGE_META_START](state) {
    return {
      ...state,
      fetchingPageMeta: true,
      fetchingPageMetaError: false,
      fetchingPageMetaErrorBody: null,
      pageMeta: { ...defaultPageMeta },
    };
  },
  [FETCH_PAGE_META_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingPageMeta: false,
      fetchingPageMetaError: false,
      fetchingPageMetaErrorBody: null,
      pageMeta: payload,
    };
  },
  [FETCH_PAGE_META_FAIL](state, { payload }) {
    return {
      ...state,
      fetchingPageMeta: false,
      fetchingPageMetaError: true,
      fetchingPageMetaErrorBody: payload,
      pageMeta: { ...defaultPageMeta },
    };
  },
  [FETCH_OBJECT_ALL_TIME_BEST_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_OBJECT_ALL_TIME_BEST_SUCCESS](state, { payload }) {
    const { type } = payload;
    let { posts } = payload;
    const filterFor = type[0];
    if (filterFor && filterFor !== 'all') {
      posts = posts.filter(post => post.type === filterFor);
    }
    return {
      ...state,
      fetching: false,
      objectPosts: posts,
    };
  },
  [FETCH_OBJECT_ALL_TIME_BEST_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
      objectPosts: [],
      pages: 0,
    };
  },
  [FETCH_OBJECT_LATEST_CONTENT_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_OBJECT_LATEST_CONTENT_SUCCESS](state, { payload }) {
    const { pages, posts } = payload;
    return {
      ...state,
      objectPosts: posts,
      fetching: false,
      pages,
    };
  },
  [FETCH_OBJECT_LATEST_CONTENT_FAIL](state, { payload }) {
    return {
      ...state,
      error: true,
      fetching: false,
      pages: 0,
      objectPosts: [],
    };
  },
});
