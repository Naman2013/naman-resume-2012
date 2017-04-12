import createReducer from '../utils/createReducer';
import {
    UPDATE_TELESCOPE_MISSION_FULL_START,
    UPDATE_TELESCOPE_MISSION_FULL_SUCCESS,
    UPDATE_TELESCOPE_MISSION_FULL_FAIL,
    UPDATE_TELESCOPE_MISSION_COMPACT_START,
    UPDATE_TELESCOPE_MISSION_COMPACT_SUCCESS,
    UPDATE_TELESCOPE_MISSION_COMPACT_FAIL,
    COMMIT_ACTIVE_MISSION_CHANGE,
    UPDATE_ACTIVE_TELESCOPE_MISSION_ID,
    RESET_ACTIVE_TELESCOPE_MISSION_ID,
   } from './active-telescope-missions-actions';

/**
example of state architecture

const initialState = {
  error: false,
  telescopes: [
    {
      telescopeId: number,
      activeMission: {
        full: {}
        fullError: {}
        fetchingFull: bool
        compact: {}
        compactError: {}
        fetchingCompact: bool
      }
    }
  ],
};

*/

const initialState = {
  activeTelescopeMissionID: null,
  error: false,
  telescopes: [],
};

export default createReducer(initialState, {
  [UPDATE_ACTIVE_TELESCOPE_MISSION_ID](state, { payload }) {
    return {
      ...state,
      activeTelescopeMissionID: payload,
    };
  },
  [RESET_ACTIVE_TELESCOPE_MISSION_ID](state) {
    return {
      ...state,
      activeTelescopeMissionID: null,
    };
  },
  [COMMIT_ACTIVE_MISSION_CHANGE](state, { payload }) {
    return {
      ...state,
      telescopes: payload,
    };
  },
  [UPDATE_TELESCOPE_MISSION_FULL_START](state) {
    return {
      ...state,
    };
  },
  [UPDATE_TELESCOPE_MISSION_FULL_SUCCESS](state, { payload }) {
    return {
      ...state,
      telescopes: payload,
    };
  },
  [UPDATE_TELESCOPE_MISSION_FULL_FAIL](state, { payload }) {
    return {
      ...state,
      telescopes: payload,
    };
  },
  [UPDATE_TELESCOPE_MISSION_COMPACT_START](state) {
    return {
      ...state,
    };
  },
  [UPDATE_TELESCOPE_MISSION_COMPACT_SUCCESS](state, { payload }) {
    return {
      ...state,
      telescopes: payload,
    };
  },
  [UPDATE_TELESCOPE_MISSION_COMPACT_FAIL](state, { payload }) {
    return {
      ...state,
      telescopes: payload,
    };
  },
});
