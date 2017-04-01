import createReducer from '../utils/createReducer';

import {
  FETCH_PHOTO_ROLL_START,
  FETCH_PHOTO_ROLL_SUCCESS,
  FETCH_PHOTO_ROLL_FAIL,

  FETCH_MISSION_PHOTOS_START,
  FETCH_MISSION_PHOTOS_SUCCESS,
  FETCH_MISSION_PHOTOS_FAIL,

  FETCH_MISSIONS_START,
  FETCH_MISSIONS_SUCCESS,
  FETCH_MISSIONS_FAIL,

  UPDATE_BY_OBJECT_FILTER,
  RESET_OBJECT_TYPE_FILTER,

  UPDATE_SCHEDULE_MISSION_ID,
  RESET_SCHEDULE_MISSION_ID,

  FETCH_FIT_IMAGES_START,
  FETCH_FIT_IMAGES_SUCCESS,
  RESET_FIT_IMAGES,
} from './actions';

const initialState = {
  photoRoll: {
    response: {
      imageList: [],
      imageCount: 0,
    },
    fetching: false,
    error: false,
    errorBody: {},
  },
  missionPhotos: {
    response: {
      imageList: [],
      imageCount: 0,
    },
    fetching: false,
    error: false,
    errorBody: {},
  },
  missions: {
    response: {
      imageList: [],
      imageCount: 0,
    },
    fetching: false,
    error: false,
    errorBody: {},
  },
  objectTypeFilter: {
    filterByField: '',
    filterByIndex: null,
  },
  scheduledMissionId: '',
  loadedFITSImages: {
    fetchingImages: false,
    error: false,
    images: {
      popupTitleText: '',
      imageCount: 0,
      apiError: false,
      ownerLocation: '',
      ownerFirstName: '',
      ownerDisplayName: '',
      ownerMembershipType: '',
      ownerMemberSince: '',
      ownerAvatarURL: '',

      buttonText: '',
      infoText: '',
      missionDateTime: '',
      missionIconURL: '',
      missionObsName: '',
      missionPierName: '',
      missionTitle: '',

      groupList: [],
    },
  },
};

export default createReducer(initialState, {
  [FETCH_FIT_IMAGES_START](state) {
    return {
      ...state,
      loadedFITSImages: Object.assign({}, initialState.loadedFITSImages, { fetchingImages: true }),
    };
  },
  [FETCH_FIT_IMAGES_SUCCESS](state, { payload }) {
    return {
      ...state,
      loadedFITSImages: {
        fetchingImages: false,
        error: false,
        images: payload,
      },
    };
  },
  [RESET_FIT_IMAGES](state) {
    return {
      ...state,
      loadedFITSImages: Object.assign({}, initialState.loadedFITSImages),
    };
  },
  [FETCH_MISSION_PHOTOS_START](state) {
    return {
      ...state,
      missionPhotos: {
        response: {
          imageList: [],
          imageCount: 0,
        },
        fetching: true,
        error: false,
        errorBody: {},
      },
    };
  },
  [FETCH_MISSION_PHOTOS_SUCCESS](state, { payload }) {
    return {
      ...state,
      missionPhotos: {
        response: payload,
        fetching: false,
        error: false,
        errorBody: {},
      },
    };
  },
  [FETCH_MISSION_PHOTOS_FAIL](state, { payload }) {
    return {
      ...state,
      missions: {
        response: {
          imageList: [],
          imageCount: 0,
        },
        fetching: false,
        error: true,
        errorBody: payload,
      },
    };
  },
  [UPDATE_SCHEDULE_MISSION_ID](state, { payload }) {
    return {
      ...state,
      scheduledMissionId: payload,
    };
  },
  [RESET_SCHEDULE_MISSION_ID](state) {
    return {
      ...state,
      scheduledMissionId: '',
    };
  },
  [UPDATE_BY_OBJECT_FILTER](state, { payload }) {
    return {
      ...state,
      objectTypeFilter: payload,
    };
  },
  [RESET_OBJECT_TYPE_FILTER](state) {
    return {
      ...state,
      objectTypeFilter: Object.assign({}, initialState.objectTypeFilter),
    };
  },
  [FETCH_MISSIONS_START](state) {
    return {
      ...state,
      missions: {
        response: {
          imageList: [],
          imageCount: 0,
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
          imageCount: 0,
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
          imageCount: 0,
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
          imageCount: 0,
        },
        fetching: false,
        error: true,
        errorBody: payload,
      },
    };
  },
});
