import createReducer from '../utils/createReducer';

import {
  FETCH_USER_PUBLIC_GALLERIES_START,
  FETCH_USER_PUBLIC_GALLERIES_SUCCESS,
  FETCH_USER_PUBLIC_GALLERIES_FAIL,
} from './actions';

const initialState = {
  galleryList: [],
  resultsCount: 0,
  maxGalleryCount: 9,
  galleryCount: 0,
  firstGalleryNumber: 1,
  fetching: false,
  error: false,
  errorBody: {},
  galleryListTitle: '',
};

export default createReducer(initialState, {
  [FETCH_USER_PUBLIC_GALLERIES_START](state) {
    return {
      ...state,
      galleryList: [],
      resultsCount: 0,
      maxGalleryCount: state.maxGalleryCount,
      firstGalleryNumber: state.firstGalleryNumber,
      fetching: true,
      error: false,
      errorBody: {},
    };
  },
  [FETCH_USER_PUBLIC_GALLERIES_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
      fetching: false,
      error: false,
      errorBody: {},
    };
  },
  [FETCH_USER_PUBLIC_GALLERIES_FAIL](state, { payload }) {
    return {
      ...state,
      galleryList: [],
      resultsCount: 0,
      maxGalleryCount: state.maxGalleryCount,
      firstGalleryNumber: state.firstGalleryNumber,
      fetching: false,
      error: true,
      errorBody: payload,
    };
  },
});
