import createReducer from '../utils/createReducer';

import {
  FETCH_MY_PICTURES_IMAGE_DETAILS_START,
  FETCH_MY_PICTURES_IMAGE_DETAILS_SUCCESS,
  FETCH_MY_PICTURES_IMAGE_DETAILS_FAIL,
} from './actions';

import {
  SHARE_MEMBER_PHOTO_SUCCESS,
} from '../share-member-photo/actions';

const initialState = {
  fetching: false,
  error: false,
  imageTitle: '',
  imageURL: '',
  zoom: 0,
  originx: 0,
  originy: 0,
  observationLog: '',
  shareToken: '',
  likesCount: 0,
  canLikeFlag: false,
  showLikePrompt: false,
  likePrompt: '',
  canDownloadFlag: false,
  canEditFlag: false,
  canShareFlag: false,
  fileData: {},
  avatarURL: '',
  linkableFileData: {
    'Photo by': {},
    Telescope: {},
    Observatory: {},
  },
};

export default createReducer(initialState, {
  [FETCH_MY_PICTURES_IMAGE_DETAILS_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_MY_PICTURES_IMAGE_DETAILS_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetching: false,
      ...payload,
    };
  },
  [FETCH_MY_PICTURES_IMAGE_DETAILS_FAIL](state) {
    return {
      ...state,
      fetching: false,
      error: true,
    };
  },
  [SHARE_MEMBER_PHOTO_SUCCESS](state, { payload }) {
    return {
      ...state,
      canShareFlag: payload.canShareFlag,
    };
  },
});
