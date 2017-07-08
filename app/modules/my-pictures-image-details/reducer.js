import createReducer from '../utils/createReducer';

import {
  FETCH_MY_PICTURES_IMAGE_DETAILS_START,
  FETCH_MY_PICTURES_IMAGE_DETAILS_SUCCESS,
  FETCH_MY_PICTURES_IMAGE_DETAILS_FAIL,
} from './actions';

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
  fileData: {}
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
      error: true
    };
  },
});
