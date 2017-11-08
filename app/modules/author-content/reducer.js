import createReducer from '../utils/createReducer';

import {
  FETCH_AUTHOR_CONTENT_START,
  FETCH_AUTHOR_CONTENT_SUCCESS,
  FETCH_AUTHOR_CONTENT_FAIL,
} from './actions';

const initialState = {
  postsCount: 0,
  pages: 0,
  posts: [],
  fetching: false,
  count: 10,
  page: 1,
  authorId: null,
  firstPostIndex: 0,
};

export default createReducer(initialState, {
  [FETCH_AUTHOR_CONTENT_START]() {
    return {
      ...initialState,
      fetching: true,
    };
  },
  [FETCH_AUTHOR_CONTENT_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
      fetching: false,
    };
  },
  [FETCH_AUTHOR_CONTENT_FAIL](state) {
    return {
      ...initialState,
      fetching: false,
    };
  },
});
