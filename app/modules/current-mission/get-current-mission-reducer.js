import createReducer from '../utils/createReducer';

import {
  FETCH_CURRENT_MISSION_START,
  FETCH_CURRENT_MISSION_SUCCESS,
  FETCH_CURRENT_MISSION_FAIL } from './get-current-mission-actions';

const initialState = {
  currentMission: {},
  error: {},
  failed: false,
  fetchingMission: true,
};

export default createReducer(initialState, {
  [FETCH_CURRENT_MISSION_START](state) {
    return {
      ...state,
      currentMission: {},
      error: {},
      failed: false,
      fetchingMission: true,
    };
  },
  [FETCH_CURRENT_MISSION_SUCCESS](state, { payload }) {
    return {
      ...state,
      currentMission: payload,
      error: {},
      failed: false,
      fetchingMission: false,
    };
  },
  [FETCH_CURRENT_MISSION_FAIL](state, { payload }) {
    return {
      ...state,
      currentMission: {},
      error: payload,
      failed: true,
      fetchingMission: false,
    };
  },
});
