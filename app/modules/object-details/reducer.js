import clone from 'lodash/clone';
import createReducer from '../utils/createReducer';

import {
  FETCH_OBJECT_DATA,
  FETCH_OBJECT_DATA_START,
  FETCH_OBJECT_DATA_SUCCESS,
  FETCH_OBJECT_DATA_FAIL,

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

};

export default createReducer(initialState, {
  [FETCH_OBJECT_DATA_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
  [FETCH_OBJECT_DATA_START](state) {
    return {
      ...state,
    };
  },
  [FETCH_OBJECT_DATA_FAIL](state, { payload }) {
    return {
      ...state,
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
    };
  },
  [FETCH_OBJECT_MISSIONS_FAIL](state, { payload }) {
    return {
      ...state,
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
    };
  },
  [FETCH_OBJECT_QUESTS_FAIL](state, { payload }) {
    return {
      ...state,
      errorBody: payload,
    };
  },

});
