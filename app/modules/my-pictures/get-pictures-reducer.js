import createReducer from '../utils/createReducer';

import {
  FETCH_PICTURES_START,
  FETCH_PICTURES_SUCCESS,
  FETCH_PICTURES_FAIL,

  FETCH_PHOTO_ROLL_START,
  FETCH_PHOTO_ROLL_SUCCESS,
  FETCH_PHOTO_ROLL_FAIL,

  FETCH_MISSIONS_START,
  FETCH_MISSIONS_SUCCESS,
  FETCH_MISSIONS_FAIL,
} from './get-pictures-action';

const initialState = {
  photoRoll: {
    response: {
      imageList: [],
    },
    fetching: false,
    error: false,
    errorBody: {},
  },
  missions: {
    response: {
      imageList: [],
    },
    fetching: false,
    error: false,
    errorBody: {},
  },
  images: {},
  count: 0,
  error: {},
  failed: false,
  fetching: true,
};

export default createReducer(initialState, {
  [FETCH_MISSIONS_START](state) {
    return {
      ...state,
      missions: {
        response: {
          imageList: [],
        },
        fetching: true,
        error: false,
        errorBody: {},
      },
    };
  },
  [FETCH_MISSIONS_SUCCESS](state, { payload }) {
    return {
      ...state,
      missions: {
        response: payload,
        fetching: false,
        error: false,
        errorBody: {},
      },
    };
  },
  [FETCH_MISSIONS_FAIL](state, { payload }) {
    return {
      ...state,
      missions: {
        response: {
          imageList: [],
        },
        fetching: false,
        error: true,
        errorBody: payload,
      },
    };
  },
  [FETCH_PHOTO_ROLL_START](state) {
    return {
      ...state,
      photoRoll: {
        response: {
          imageList: [],
        },
        fetching: true,
        error: false,
        errorBody: {},
      },
    };
  },
  [FETCH_PHOTO_ROLL_SUCCESS](state, { payload }) {
    return {
      ...state,
      photoRoll: {
        response: payload,
        fetching: false,
        error: false,
        errorBody: {},
      },
    };
  },
  [FETCH_PHOTO_ROLL_FAIL](state, { payload }) {
    return {
      ...state,
      photoRoll: {
        response: {
          imageList: [],
        },
        fetching: false,
        error: true,
        errorBody: payload,
      },
    };
  },
  [FETCH_PICTURES_START](state) {
    return {
      ...state,
      images: {},
      count: 0,
      error: {},
      fetching: true,
    };
  },
  [FETCH_PICTURES_SUCCESS](state, { payload }) {
    return {
      ...state,
      images: payload.imageList,
      count: payload.imageCount,
      error: {},
      fetching: false,
    };
  },
  [FETCH_PICTURES_FAIL](state, { payload }) {
    return {
      ...state,
      post: {},
      error: payload,
      fetching: false,
    };
  },
});
