import createReducer from '../utils/createReducer';

import {
  ADD_IMAGE_TO_GALLERY_START,
  ADD_IMAGE_TO_GALLERY_SUCCESS,
  ADD_IMAGE_TO_GALLERY_FAIL,
} from './actions';

const initialState = {
  addImageToGallery: {
    fetching: false,
    error: false,
    response: '',
  }

};

export default createReducer(initialState, {
  [ADD_IMAGE_TO_GALLERY_START](state) {
    return {
      ...state,
      addImageToGallery: {
        fetching: true,
        response: '',
        error: false,
      }
    };
  },
  [ADD_IMAGE_TO_GALLERY_SUCCESS](state, { payload }) {
    return {
      ...state,
      addImageToGallery: {
        fetching: false,
        response: payload.response,
      },
    };
  },
  [ADD_IMAGE_TO_GALLERY_FAIL](state, { payload }) {
    return {
      ...state,
      addImageToGallery: {
        fetching: false,
        error: false,
        response: '',
      }
    };
  },
});
