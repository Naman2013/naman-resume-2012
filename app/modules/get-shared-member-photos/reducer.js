import createReducer from '../utils/createReducer';
import cloneDeep from 'lodash/cloneDeep';

import {
  GET_SHARED_MEMBER_PHOTOS_SUCCESS,
  GET_SHARED_MEMBER_PHOTOS_FAIL,
  GET_SHARED_MEMBER_PHOTOS_START,
  STORE_IMAGE_DETAIL_SUCCESS,
} from './actions';

const initialState = {
  error: false,
  imageList: [],
  firstImageNumber: 0,
  fetching: false,
  timelineData: {
    timelineCount: 0,
    timelineList: [],
  },
  allImages: {},
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
  [STORE_IMAGE_DETAIL_SUCCESS](state, { payload }) {
    const { customerImageId } = payload;
    const newAllImages = cloneDeep(state.allImages);
    newAllImages[customerImageId] = payload;
    return {
      ...state,
      allImages: newAllImages,
    };
  },
});
