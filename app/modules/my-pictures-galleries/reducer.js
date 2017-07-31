import createReducer from '../utils/createReducer';

import {
  FETCH_GALLERY_PICS_START,
  FETCH_GALLERY_PICS_SUCCESS,
  FETCH_GALLERY_PICS_FAIL,
  FETCH_GALLERY_PICS_COUNT_START,
  FETCH_GALLERY_PICS_COUNT_SUCCESS,
  FETCH_GALLERY_PICS_COUNT_FAIL,
} from './actions';

const initialState = {
  canEditFlag: false,
  imageCount: 0,
  maxImageCount: 9,
  firstImageNumber: 1,
  imageList: [],
  fetching: false,
  error: false,
  resultsCount: 0,

};

export default createReducer(initialState, {
  [FETCH_GALLERY_PICS_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_GALLERY_PICS_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetching: false,
      ...payload,
      imageCount: state.imageCount, // another call handles this
    };
  },
  [FETCH_GALLERY_PICS_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
    };
  },
  [FETCH_GALLERY_PICS_COUNT_SUCCESS](state, { payload }) {
    return {
      ...state,
      imageCount: Number(payload.imageCount),
    };
  },
  [FETCH_GALLERY_PICS_COUNT_FAIL](state) {
    return {
      ...state,
      imageCount: 0,
    };
  },
});
