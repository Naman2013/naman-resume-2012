import createReducer from '../utils/createReducer';

import {
  GET_SHARED_MEMBER_PHOTOS_SUCCESS,
  GET_SHARED_MEMBER_PHOTOS_FAIL,
  GET_SHARED_MEMBER_PHOTOS_START,
} from './actions';

const initialState = {
  error: false,
  imageList: [],
  firstImageNumber: 0,
  fetching: false,
};

export default createReducer(initialState, {
  [GET_SHARED_MEMBER_PHOTOS_START]() {
    return {
      ...initialState,
      fetching: true,
    };
  },
  [GET_SHARED_MEMBER_PHOTOS_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
      fetching: false,
    };
  },
  [GET_SHARED_MEMBER_PHOTOS_FAIL](state) {
    return {
      ...state,
      error: true,
      fetching: false,
    };
  },
});
