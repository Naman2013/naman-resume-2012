import createReducer from '../utils/createReducer';

import {
  FETCH_GALLERIES_START,
  FETCH_GALLERIES_SUCCESS,
  FETCH_GALLERIES_FAIL,
  FETCH_GALLERIES_COUNT_SUCCESS,
  FETCH_GALLERIES_COUNT_FAIL,
  CREATE_GALLERY_START,
  CREATE_GALLERY_SUCCESS,
  CREATE_GALLERY_FAIL,
  FETCH_MORE_GALLERIES_SUCCESS,
} from './actions';

import {
  TOGGLE_PUBLIC_GALLERY_SUCCESS,
} from '../toggle-public-gallery/actions';

import {
  ADD_IMAGE_TO_GALLERY_SUCCESS,
} from '../my-pictures-gallery-actions/actions';

const initialState = {
  galleryList: [],
  resultsCount: 0,
  imageCount: 0,
  maxImageCount: 9,
  firstImageNumber: 1,
  fetching: false,
  error: false,
  errorBody: {},
  galleryCreated: false,
  galleryCreating: false,
  galleryCreatingError: false,
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
  [CREATE_GALLERY_START](state) {
    return {
      ...state,
      galleryCreating: true,
      galleryCreated: false,
      galleryCreatingError: false,
    };
  },
  [CREATE_GALLERY_SUCCESS](state, { payload }) {
    const { galleryId, title } = payload;
    state.galleryList.unshift({
      title,
      galleryId,
      galleryPictureCount: '0'
    });
    return {
      ...state,
      galleryList: state.galleryList,
      galleryCreating: false,
      galleryCreated: true,
    };
  },
  [CREATE_GALLERY_FAIL](state, { payload }) {
    return {
      ...state,
      galleryCreatingError: true,
      galleryCreated: false,
      galleryCreating: false,
    };
  },
  [ADD_IMAGE_TO_GALLERY_SUCCESS](state, { payload }) {
    return {
      ...state,
      galleryList: state.galleryList.map((gallery) => {
        return gallery.galleryId !== payload.galleryId ? gallery : ({
          ...gallery,
          galleryPictureCount: Number(gallery.galleryPictureCount) + Number(payload.galleryCountChange),
        });
      }),
    };
  },
  [TOGGLE_PUBLIC_GALLERY_SUCCESS](state, { payload }) {
    return {
      ...state,
      galleryList: state.galleryList.map((gallery) => {
        return gallery.galleryId !== payload.galleryId ? gallery : ({
          ...gallery,
          publicFlag: payload.publicFlag,
        });
      }),
    };
  },
  [FETCH_MORE_GALLERIES_SUCCESS](state, { payload }) {
    return {
      ...state,
      galleryList: [...state.galleryList, ...payload.galleryList],
    };
  },
});
