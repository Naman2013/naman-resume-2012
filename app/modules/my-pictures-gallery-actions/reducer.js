import createReducer from '../utils/createReducer';

import {
  ADD_IMAGE_TO_GALLERY_SUCCESS,
  ADD_IMAGE_TO_GALLERY_FAIL,
  ADD_IMAGE_TO_GALLERY_START,
  RESET_ADD_RESPONSE,
} from './actions';

const initialState = {
  addToGallery: {
    loading: false,
    response: '',
    galleryId: '',
  }
};

export default createReducer(initialState, {
  [ADD_IMAGE_TO_GALLERY_START](state) {
    return {
      ...state,
      addToGallery: {
        loading: true,
        response: null,
        galleryId: null,
      }
    };
  },
  [ADD_IMAGE_TO_GALLERY_SUCCESS](state, { payload }) {
    return {
      ...state,
      addToGallery: {
        loading: false,
        response: payload.response,
        galleryId: payload.galleryId,
      }
    };
  },
  [ADD_IMAGE_TO_GALLERY_FAIL](state, { payload }) {
    console.log(payload)
    return {
      ...state,
      addToGallery: {
        loading: false,
        response: null,
        galleryId: null,
      }
    };
  },
  [RESET_ADD_RESPONSE](state, { payload }) {
    return {
      ...state,
      addToGallery: {
        loading: false,
        response: null,
        galleryId: null,
      }
    };
  },
});
