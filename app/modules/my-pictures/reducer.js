import clone from 'lodash/clone';
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

  UPDATE_SCHEDULE_MISSION_ID,
  RESET_SCHEDULE_MISSION_ID,

  FETCH_FIT_IMAGES_START,
  FETCH_FIT_IMAGES_SUCCESS,
  RESET_FIT_IMAGES,

  FETCH_MY_PICTURES_COUNT_SUCCESS,
  FETCH_MY_PICTURES_COUNT_FAIL,

  FETCH_MISSION_PHOTOS_COUNT_SUCCESS,
  FETCH_MISSION_PHOTOS_COUNT_FAIL,

  FETCH_MISSION_COUNT_SUCCESS,
  FETCH_MISSION_COUNT_FAIL,

  FETCH_OBSERVATIONS_COUNT_SUCCESS,
  FETCH_OBSERVATIONS_COUNT_FAIL,

  FETCH_MORE_MISSION_SUCCESS,
  FETCH_MORE_PHOTOROLL_SUCCESS,

} from './actions';

import {
  SHARE_MEMBER_PHOTO_SUCCESS,
} from '../share-member-photo/actions';

const initialState = {
  photoRoll: {
    response: {
      imageList: [],
    },
    imageCount: 0,
    maxImageCount: 9,
    firstImageNumber: 1,
    fetching: false,
    error: false,
    errorBody: {},
  },
  observations: {
    imageCount: 0,
  },
  missionPhotos: {
    response: {
      imageList: [],
    },
    missionIconURL: '',
    missionDateCreated: '',
    missionTitle: '',
    imageCount: 0,
    maxImageCount: 9,
    firstImageNumber: 1,
    fetching: false,
    error: false,
    errorBody: {},
  },
  missions: {
    response: {
      imageList: [],
    },
    firstMissionNumber: 1,
    maxMissionCount: 9,
    imageCount: 0,
    fetching: false,
    error: false,
    errorBody: {},
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
      takenByText: '',

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
        },
        imageCount: state.missionPhotos.imageCount, // different call handles this
        firstImageNumber: state.missionPhotos.firstImageNumber,
        maxImageCount: state.missionPhotos.maxImageCount,
        missionTitle: state.missionTitle,
        missionDateCreated: state.missionDateCreated,
        missionIconURL: state.missionIconURL,
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
        imageCount: state.missionPhotos.imageCount, // different call handles this
        maxImageCount: payload.maxImageCount,
        firstImageNumber: payload.firstImageNumber,
        missionTitle: payload.missionTitle,
        missionDateCreated: payload.missionDateCreated,
        missionIconURL: payload.missionIconURL,
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
        missionIconURL: state.missionPhotos.missionIconURL,
        imageCount: state.missionPhotos.imageCount, // different call handles this
        firstImageNumber: state.missionPhotos.firstImageNumber,
        maxImageCount: state.missionPhotos.maxImageCount,
        missionTitle: state.missionTitle,
        missionDateCreated: state.missionDateCreated,
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
  [FETCH_MISSIONS_START](state) {
    return {
      ...state,
      missions: {
        response: {
          imageList: [],
        },
        imageCount: state.missions.imageCount, // different call handles this
        firstMissionNumber: state.missions.firstMissionNumber,
        maxMissionCount: state.missions.maxMissionCount,
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
        imageCount: state.missions.imageCount, // different call handles this
        firstMissionNumber: payload.firstMissionNumber,
        maxMissionCount: payload.maxMissionCount,
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
        imageCount: state.missions.imageCount, // different call handles this
        firstMissionNumber: state.missions.firstMissionNumber,
        maxMissionCount: state.missions.maxMissionCount,
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
        imageCount: state.photoRoll.imageCount, // different call handles this
        maxImageCount: state.photoRoll.maxImageCount,
        firstImageNumber: state.photoRoll.firstImageNumber,
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
        imageCount: state.photoRoll.imageCount, // different call handles this
        maxImageCount: payload.maxImageCount,
        firstImageNumber: payload.firstImageNumber,
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
        imageCount: state.photoRoll.imageCount, // different call handles this
        maxImageCount: state.photoRoll.maxImageCount,
        firstImageNumber: state.photoRoll.firstImageNumber,
        fetching: false,
        error: true,
        errorBody: payload,
      },
    };
  },
  [FETCH_MY_PICTURES_COUNT_SUCCESS](state, { payload }) {
    return {
      ...state,
      photoRoll: {
        ...state.photoRoll,
        imageCount: payload.imageCount,
      },
    };
  },
  [FETCH_MY_PICTURES_COUNT_FAIL](state) {
    return {
      ...state,
      photoRoll: {
        ...state.photoRoll,
        imageCount: 0,
      },
    };
  },
  [FETCH_MISSION_COUNT_SUCCESS](state, { payload }) {
    return {
      ...state,
      missions: {
        ...state.missions,
        imageCount: payload.imageCount,
      },
    };
  },
  [FETCH_MISSION_COUNT_FAIL](state) {
    return {
      ...state,
      missions: {
        ...state.missions,
        imageCount: 0,
      },
    };
  },
  [FETCH_MISSION_PHOTOS_COUNT_SUCCESS](state, { payload }) {
    return {
      ...state,
      missionPhotos: {
        ...state.missionPhotos,
        imageCount: payload.imageCount,
      },
    };
  },
  [FETCH_MISSION_PHOTOS_COUNT_FAIL](state) {
    return {
      ...state,
      missionPhotos: {
        ...state.missionPhotos,
        imageCount: 0,
      },
    };
  },
  [FETCH_OBSERVATIONS_COUNT_SUCCESS](state, { payload }) {
    return {
      ...state,
      observations: {
        imageCount: payload.imageCount,
      },
    };
  },
  [FETCH_OBSERVATIONS_COUNT_FAIL](state) {
    return {
      ...state,
      observations: {
        imageCount: 0,
      },
    };
  },
  [SHARE_MEMBER_PHOTO_SUCCESS](state, { payload }) {
    const photoRollList = clone(state.photoRoll.response.imageList);
    const missionPhotosList = clone(state.missionPhotos.response.imageList);
    photoRollList.map((image) => {
      if (image.customerImageId === payload.customerImageId) {
        image.canShareFlag = payload.canShareFlag
      }
      return image;
    });

    missionPhotosList.map((image) => {
      if (image.customerImageId === payload.customerImageId) {
        image.canShareFlag = payload.canShareFlag
      }
      return image;
    });

    return {
      ...state,
      missionPhotos: {
        ...state.missionPhotos,
        response: {
          ...state.missionPhotos.response,
          imageList: missionPhotosList,
        },
      },
      photoRoll: {
        ...state.photoRoll,
        response: {
          ...state.photoRoll.response,
          imageList: photoRollList,
        },
      },
    };
  },
  [FETCH_MORE_PHOTOROLL_SUCCESS](state, { payload }) {
    return {
      ...state,
      photoRoll: {
        ...state.photoRoll,
        response: {
          ...state.photoRoll.response,
          imageList: [...state.photoRoll.response.imageList, ...payload.imageList],
        },
      },
    };
  },
  [FETCH_MORE_MISSION_SUCCESS](state, { payload }) {
    return {
      ...state,
      missions: {
        ...state.missions,
        response: {
          ...state.photoRoll.response,
          imageList: [...state.missions.response.imageList, ...payload.imageList],
        },
      },
    };
  },
});
