import createReducer from '../utils/createReducer';
import {
  FETCH_SHOW_CONTENT_START,
  FETCH_SHOW_CONTENT_SUCCESS,
  FETCH_SHOW_CONTENT_FAIL,
} from './get-show-content-actions';

const initialState = {
  fetching: false,
  error: false,
  errorBody: null,
  resultBody: {
    posts: [],
  },
};

export default createReducer(initialState, {
  [FETCH_SHOW_CONTENT_START]() {
    return {
      ...initialState,
      fetching: true,
    };
  },
  [FETCH_SHOW_CONTENT_SUCCESS](state, { payload }) {
    return {
      ...state,
      resultBody: payload,
      fetching: false,
    };
  },
  [FETCH_SHOW_CONTENT_FAIL](state, { payload }) {
    return {
      ...initialState,
      error: true,
      errorBody: payload,
    };
  },
});
