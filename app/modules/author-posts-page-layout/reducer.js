import createReducer from '../utils/createReducer';

import {
  FETCH_AUTHOR_PAGE_META_START,
  FETCH_AUTHOR_PAGE_META_SUCCESS,
} from './actions';

const initialState = {
  headerTitle: '',
  authorId: null,
  firstName: '',
  location: '',
  membershipType: '',
  displayName: '',
  memberSince: '',
  avatarURL: '',
  showLatestPostsMenu: false,
  showHottestPostsMenu: false,
  showPostTypesSubmenu: false,
  showAdUnit: false,
  showPopularPosts: false,
  showFeaturedObjects: false,
  showCreateNewPostButton: false,
  headerSubtitle: '',
  fetchingPageMeta: false,
};

export default createReducer(initialState, {
  [FETCH_AUTHOR_PAGE_META_START]() {
    return {
      ...initialState,
      fetchingPageMeta: true,
    };
  },
  [FETCH_AUTHOR_PAGE_META_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
      fetchingPageMeta: false,
    };
  },
});
