import createReducer from '../utils/createReducer';

import {
  SHARE_MEMBER_PHOTO_SUCCESS,
  SHARE_MEMBER_PHOTO_FAIL,
  SHARE_MEMBER_PHOTO_START,
} from './actions';

const initialState = {
  error: false,
  showSharePrompt: false,
  sharePrompt: '',
};

export default createReducer(initialState, {
  [SHARE_MEMBER_PHOTO_START](state) {
    return {
      ...initialState,
    };
  },
  [SHARE_MEMBER_PHOTO_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
  [SHARE_MEMBER_PHOTO_FAIL](state) {
    return {
      ...state,
      error: true,
    };
  },
});
