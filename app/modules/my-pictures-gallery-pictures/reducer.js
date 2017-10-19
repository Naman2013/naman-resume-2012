import clone from 'lodash/clone';
import createReducer from '../utils/createReducer';

import {
  FETCH_GALLERY_PICS_START,
  FETCH_GALLERY_PICS_SUCCESS,
  FETCH_GALLERY_PICS_FAIL,
  FETCH_GALLERY_PICS_COUNT_START,
  FETCH_GALLERY_PICS_COUNT_SUCCESS,
  FETCH_GALLERY_PICS_COUNT_FAIL,
} from './actions';

import {
  SHARE_MEMBER_PHOTO_SUCCESS,
} from '../share-member-photo/actions';


const initialState = {
  canEditFlag: false,
  imageCount: 0,
  maxImageCount: 9,
  firstImageNumber: 1,
  imageList: [],
  fetching: false,
  error: false,
  galleryTitle: '',
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
  [SHARE_MEMBER_PHOTO_SUCCESS](state, { payload }) {
    const imageList = clone(state.imageList);

    imageList.map((image) => {
      if (image.customerImageId === payload.customerImageId) {
        image.canShareFlag = payload.canShareFlag
      }
      return image;
    });

    return {
      ...state,
      imageList,
    };
  },
});
