import createReducer from '../utils/createReducer';

import {
  FETCH_GALLERIES_START,
  FETCH_GALLERIES_SUCCESS,
  FETCH_GALLERIES_FAIL,
  FETCH_GALLERIES_COUNT_SUCCESS,
  FETCH_GALLERIES_COUNT_FAIL,
} from './actions';

const initialState = {
  galleryList: [],
  resultsCount: 0,
  imageCount: 0,
  maxImageCount: 9,
  firstImageNumber: 1,
  fetching: false,
  error: false,
  errorBody: {},
};

export default createReducer(initialState, {
  [FETCH_GALLERIES_START](state) {
    return {
      ...state,
      galleryList: [],
      resultsCount: 0,
      imageCount: state.imageCount, // different call handles this
      maxImageCount: state.maxImageCount,
      firstImageNumber: state.firstImageNumber,
      fetching: true,
      error: false,
      errorBody: {},
    };
  },
  [FETCH_GALLERIES_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
      imageCount: state.imageCount, // different call handles this
      fetching: false,
      error: false,
      errorBody: {},
    };
  },
  [FETCH_GALLERIES_FAIL](state, { payload }) {
    return {
      ...state,
      galleryList: [],
      resultsCount: 0,
      imageCount: state.imageCount, // different call handles this
      maxImageCount: state.maxImageCount,
      firstImageNumber: state.firstImageNumber,
      fetching: false,
      error: true,
      errorBody: payload,
    };
  },
  [FETCH_GALLERIES_COUNT_SUCCESS](state, { payload }) {
    return {
      ...state,
      imageCount: Number(payload.galleryCount),
    };
  },
  [FETCH_GALLERIES_COUNT_FAIL](state) {
    return {
      ...state,
      imageCount: 0,
    };
  },
});
