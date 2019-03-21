import createReducer from '../utils/createReducer';
import {
  DOWNLOAD_IMAGE_REQUEST,
  DOWNLOAD_IMAGE_SUCCESS,
  DOWNLOAD_IMAGE_ERROR,
} from './actions';

const initialState = {
  isLoading: false,
  error: null,
};

export default createReducer(initialState, {
  [DOWNLOAD_IMAGE_REQUEST](state) {
    return {
      ...state,
      isLoading: true,
      error: false,
      file: null,
    };
  },
  [DOWNLOAD_IMAGE_SUCCESS](state) {
    return {
      ...state,
      isLoading: false,
      error: null,
    };
  },
  [DOWNLOAD_IMAGE_ERROR](state, { error }) {
    return {
      ...state,
      isLoading: false,
      error,
    };
  },
});
