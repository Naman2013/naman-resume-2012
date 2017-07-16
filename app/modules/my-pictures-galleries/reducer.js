import createReducer from '../utils/createReducer';

import {
  FETCH_GALLERY_PICS_START,
  FETCH_GALLERY_PICS_SUCCESS,
  FETCH_GALLERY_PICS_FAIL,
} from './actions';

const initialState = {
  canEditFlag: false,
  imageCount: 0,
  maxImageCount: 9,
  firstImageNumber: 1,
  imageList: [],
  fetching: false,
  error: false,
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
    };
  },
  [FETCH_GALLERY_PICS_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
    };
  },
});
