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

  } from './actions';

const initialState = {
  objectDetails: {},
  objectData: {},
  objectMissions: {},
  objectQuests: {},
};

export default createReducer(initialState, {
  
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

});
