import clone from 'lodash/clone';
import createReducer from '../utils/createReducer';

import {
  FETCH_OBJECT_DETAILS,
  FETCH_OBJECT_DETAILS_START,
  FETCH_OBJECT_DETAILS_SUCCESS,
  FETCH_OBJECT_DETAILS_FAIL,
  RESET_OBJECT_DETAILS,

  FETCH_OBJECT_DATA,
  FETCH_OBJECT_DATA_START,
  FETCH_OBJECT_DATA_SUCCESS,
  FETCH_OBJECT_DATA_FAIL,
  RESET_OBJECT_DATA,

  FETCH_OBJECT_MISSIONS,
  FETCH_OBJECT_MISSIONS_START,
  FETCH_OBJECT_MISSIONS_SUCCESS,
  FETCH_OBJECT_MISSIONS_FAIL,

  FETCH_OBJECT_QUESTS,
  FETCH_OBJECT_QUESTS_START,
  FETCH_OBJECT_QUESTS_SUCCESS,
  FETCH_OBJECT_QUESTS_FAIL,

  FETCH_OBJECT_FOLLOW,
  FETCH_OBJECT_FOLLOW_START,
  FETCH_OBJECT_FOLLOW_SUCCESS,
  FETCH_OBJECT_FOLLOW_FAIL,

  FETCH_OBJECT_SPECIALISTS,
  FETCH_OBJECT_SPECIALISTS_START,
  FETCH_OBJECT_SPECIALISTS_SUCCESS,
  FETCH_OBJECT_SPECIALISTS_FAIL,
  RESET_OBJECT_SPECIALISTS,
} from './actions';

const initialState = {
  objectDetails: {},
  objectData: {
    objectTitle: null,
    objectSubtitle: null,
    objectTagline: null,
    objectDescription: null,
    objectConstellation: null,
    objectDomain: null,
    objectType: null,
    objectIconURL: null,
    objectAudioURL: null,
    objectRA: null,
    objectDeclination: null,
    objectMagnitude: null,
    objectSizeArcSeconds: null,
    objectDistance: null,
    faqTopicId: null,
    slugLookupId: null,
    showFollowPromptFlag: null,
    followPrompt: null,
    followPromptIconUrl: null,
    followActionIconUrl: null,
    toggleFollowConfirmationFlag: null,
    toggleFollowConfirmationPrompt: null,
    hasBurnhamsData: null,
    pointsList: {
      listCount: null,
      list: {
        objectType: null,
        domain: null,
        constellation: null,
      },
    },
    hasBestTelescopesFlag: null,
    bestTelescopes: {
      listTitle: null,
      listCount: null,
      list: [],
    },
    visibilitySeason: {
      label: null,
      observatories: [
        {
          label: null,
          text: null,
        },
      ],
    },
    midnightCulmination: {
      label: null,
      text: null,
      description: null,
    },
    hasFeaturedObservation: null,
    featuredObservation: {
      title: null,
      subTitle: null,
      description: null,
      iconUrl: null,
      imageUrl: null,
      imageLabel: null,
      imageTitle: null,
      hasLink: null,
      linkLabel: null,
      linkUrl: null,
    },
    hasRelatedGuide: null,
    relatedGuide: {
      title: null,
      subTitle: null,
      description: null,
      iconUrl: null,
      imageUrl: null,
      imageLabel: null,
      imageTitle: null,
      hasLink: null,
      linkLabel: null,
      linkUrl: null,
    },
    hasRelatedObject: null,
    relatedObject: {
      title: null,
      subTitle: null,
      description: null,
      iconUrl: null,
      imageUrl: null,
      imageLabel: null,
      imageTitle: null,
      hasLink: null,
      linkLabel: null,
      linkUrl: null,
    },
    hasRelatedShow: null,
    relatedShow: {
      title: null,
      subTitle: null,
      description: null,
      iconUrl: null,
      imageUrl: null,
      imageLabel: null,
      imageTitle: null,
      hasLink: null,
      linkLabel: null,
      linkUrl: null,
    },
    hasRelatedStory: null,
    relatedStory: {
      title: null,
      subTitle: null,
      description: null,
      iconUrl: null,
      imageUrl: null,
      imageLabel: null,
      imageTitle: null,
      hasLink: null,
      linkLabel: null,
      linkUrl: null,
    },
  },
  objectMissions: {},
  objectQuests: {},
  objectFollow: {},
  objectSpecialists: {},
};

export default createReducer(initialState, {

  /* DETAILS */

  [FETCH_OBJECT_DETAILS_SUCCESS](state, { payload }) {
    return {
      ...state,
      objectDetails: payload,
    };
  },
  [RESET_OBJECT_DETAILS](state) {
    return {
      ...state,
      objectDetails: Object.assign({}, initialState.objectDetails),
    };
  },
  [FETCH_OBJECT_DETAILS_START](state) {
    return {
      ...state,
      objectDetails: Object.assign({}, initialState.objectDetails),
    };
  },
  [FETCH_OBJECT_DETAILS_FAIL](state, { payload }) {
    return {
      ...state,
      objectDetails: Object.assign({}, initialState.objectDetails),
      errorBody: payload,
    };
  },

  /* DATA */

  [FETCH_OBJECT_DATA_SUCCESS](state, { payload }) {
    return {
      ...state,
      objectData: payload,
    };
  },
  [RESET_OBJECT_DATA](state) {
    return {
      ...state,
      objectData: Object.assign({}, initialState.objectData),
    };
  },
  [FETCH_OBJECT_DATA_START](state) {
    return {
      ...state,
      objectData: Object.assign({}, initialState.objectData),
    };
  },
  [FETCH_OBJECT_DATA_FAIL](state, { payload }) {
    return {
      ...state,
      objectData: Object.assign({}, initialState.objectData),
      errorBody: payload,
    };
  },

  /* MISSIONS */

  [FETCH_OBJECT_MISSIONS_SUCCESS](state, { payload }) {
    return {
      ...state,
      objectMissions: payload,
    };
  },
  [FETCH_OBJECT_MISSIONS_START](state) {
    return {
      ...state,
      objectMissions: {},
    };
  },
  [FETCH_OBJECT_MISSIONS_FAIL](state, { payload }) {
    return {
      ...state,
      objectMissions: {},
      errorBody: payload,
    };
  },


  /* QUESTS */

  [FETCH_OBJECT_QUESTS_SUCCESS](state, { payload }) {
    return {
      ...state,
      objectQuests: payload,
    };
  },
  [FETCH_OBJECT_QUESTS_START](state) {
    return {
      ...state,
      objectQuests: {},
    };
  },
  [FETCH_OBJECT_QUESTS_FAIL](state, { payload }) {
    return {
      ...state,
      objectQuests: {},
      errorBody: payload,
    };
  },

  /* FOLLOW */

  [FETCH_OBJECT_FOLLOW_SUCCESS](state, { payload }) {
    return {
      ...state,
      objectFollow: payload,
    };
  },
  [FETCH_OBJECT_FOLLOW_START](state) {
    return {
      ...state,
      objectFollow: {},
    };
  },
  [FETCH_OBJECT_FOLLOW_FAIL](state, { payload }) {
    return {
      ...state,
      objectFollow: {},
      errorBody: payload,
    };
  },

  /* SPECIALISTS */

  [FETCH_OBJECT_SPECIALISTS_SUCCESS](state, { payload }) {
    return {
      ...state,
      objectSpecialists: payload,
    };
  },
  [RESET_OBJECT_SPECIALISTS](state) {
    return {
      ...state,
      objectSpecialists: Object.assign({}, initialState.objectSpecialists),
    };
  },
  [FETCH_OBJECT_SPECIALISTS_START](state) {
    return {
      ...state,
      objectSpecialists: Object.assign({}, initialState.objectSpecialists),
    };
  },
  [FETCH_OBJECT_SPECIALISTS_FAIL](state, { payload }) {
    return {
      ...state,
      objectSpecialists: Object.assign({}, initialState.objectSpecialists),
      errorBody: payload,
    };
  },
});
