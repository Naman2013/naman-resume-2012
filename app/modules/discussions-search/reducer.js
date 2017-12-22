import createReducer from '../utils/createReducer';
import {
  SEARCH_FORUMS_START,
  SEARCH_FORUMS_SUCCESS,
  SEARCH_FORUMS_FAIL,
  RESET_SEARCH_FORUMS,
} from './actions';

const initialState = {
  fetching: false,
  firstPostIndex: 0,
  posts: [],
  page: 1,
  postsPerPage: 10,
  postsCount: 0,
  error: false,
  searchTriggered: false,
};

export default createReducer(initialState, {
  [SEARCH_FORUMS_START](state, { payload }) {
    const { appendToList } = payload;
    return {
      ...state,
      posts: appendToList ? state.posts : [],
      fetching: true,
      searchTriggered: true,
    };
  },
  [SEARCH_FORUMS_SUCCESS](state, { payload }) {
    const { posts, postsCount, page, appendToList, firstPostIndex } = payload;
    const newPosts = appendToList ? state.posts.concat(posts) : posts;
    return {
      ...state,
      fetching: false,
      postsCount,
      page,
      firstPostIndex,
      posts: newPosts,
    };
  },
  [SEARCH_FORUMS_FAIL](state) {
    return {
      ...state,
      fetching: false,
      error: true,
      posts: [],
      postsCount: 0,
      page: 1,
    };
  },
  [RESET_SEARCH_FORUMS]() {
    return {
      ...initialState
    };
  },
});
