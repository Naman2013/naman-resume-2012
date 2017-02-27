import _ from 'lodash';
import createReducer from '../utils/createReducer';
import {
  UPLOAD_AVATAR_START,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE,
  SET_AVATAR_START,
  SET_AVATAR_SUCCESS,
  SET_AVATAR_FAILURE,
  CLEAR_AVATAR_DATA,
} from './actions';

const initialState = {
  avatarUploaded: false,
  error: false,
  setAvatarError: false,
  loading: false,
  uploadError: false,
  oldAvatarType: '',
  oldAvatarURL: '',
  imagesAdded: '',
  imageCount: '',
  imageId: '',
  imageURL: '',
};

export default createReducer(initialState, {
  [UPLOAD_AVATAR_START](state) {
    return {
      ...state,
      error: false,
      avatarUploaded: false,
      loading: true,
      uploadError: false,
      setAvatarError: false,
    };
  },
  [UPLOAD_AVATAR_SUCCESS](state, { payload }) {
    const {
      apiError,
      oldAvatarType,
      oldAvatarURL,
      imagesAdded,
      imageCount,
      imageId,
      imageURL,
    } = payload;
    return {
      ...state,
      error: apiError,
      avatarUploaded: !apiError,
      oldAvatarType,
      oldAvatarURL,
      imagesAdded,
      imageCount,
      imageId,
      imageURL,
      loading: false,
    };
  },
  [UPLOAD_AVATAR_FAILURE](state, { payload }) {
    return {
      ...state,
      error: true,
      avatarUploaded: false,
      loading: false,
      uploadError: true,
    };
  },
  [SET_AVATAR_START](state) {
    return {
      ...state,
      setAvatarError: false,
    };
  },
  [SET_AVATAR_SUCCESS](state, { payload }) {
    const {
      apiError,
      imageURL,
    } = payload;
    return {
      ...state,
      setAvatarError: apiError,
      imageURL,
    };
  },
  [SET_AVATAR_FAILURE](state, { payload }) {
    return {
      ...state,
      setAvatarError: true,
    };
  },
  [CLEAR_AVATAR_DATA]() {
    return {
      ...initialState,
    };
  },
});
