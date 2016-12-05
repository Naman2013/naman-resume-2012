import axios from 'axios';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';
import { missionConfirmOpen } from './Missions';

const GRAB_PIGGYBACK_SUCCESS = 'GRAB_PIGGYBACK_SUCCESS';
const GRAB_PIGGYBACK_FAIL = 'GRAB_PIGGYBACK_FAIL';
const GRAB_PIGGYBACK_START = 'GRAB_PIGGYBACK_START';

const MISSION_UNAVAILABLE = 'MISSION_UNAVAILABLE';
const RESET_MISSION_UNAVAILABLE = 'RESET_MISSION_UNAVAILABLE';

/**
  see https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/
  for /api/reservation/grabPiggyback documentation
*/
export const grabPiggyback = (mission) => (dispatch, getState) => {
  const { token, at, cid } = getState().user;
  const { currentCard } = getState().missions;
  const { missionAvailable } = mission;

  if(!missionAvailable) {
    dispatch(missionUnavailable());
  }

  if(missionAvailable) {
    return axios.post('/api/reservation/grabPiggyback', {
      token,
      at,
      cid,
      scheduledMissionId: mission.scheduledMissionId,
      uniqueId: currentCard.uniqueId,
      callSource: 'recommends',
      objectTitle: currentCard.title,
      lookaheadPiggyback: currentCard.lookaheadDaysPiggyback,
    })
    .then(result => {
      dispatch(grabPiggybackSuccess(result.data));
      dispatch(missionConfirmOpen('piggyback'));
    })
    .catch(error => dispatch(missionUnavailable()));
  }
};

const grabPiggybackSuccess = (payload) => ({
  type: GRAB_PIGGYBACK_SUCCESS,
  payload: payload,
});

const missionUnavailable = () => ({
  type: MISSION_UNAVAILABLE,
});

export const resetMissionAvailability = () => ({
  type: RESET_MISSION_UNAVAILABLE,
});

const initialState = {
  piggyback: {},
  piggybackError: {},
  error: false,
  fetching: true,
  missionAvailable: true,
};

export default createReducer(initialState, {
  [MISSION_UNAVAILABLE](state) {
    return {
      ...state,
      missionAvailable: false,
    }
  },
  [RESET_MISSION_UNAVAILABLE](state) {
    return {
      ...state,
      missionAvailable: true,
    }
  },
  [GRAB_PIGGYBACK_SUCCESS](state, { payload }) {
    return {
      ...state,
      piggyback: payload,
      piggybackError: {},
      error: false,
      fetching: false,
    };
  },
  [GRAB_PIGGYBACK_FAIL](state, error) {
    return {
      ...state,
      piggyback: {},
      piggybackError: error,
      error: true,
      fetching: false,
    }
  },
  [GRAB_PIGGYBACK_START](state) {
    return {
      ...state,
      piggyback: {},
      piggybackError: {},
      error: false,
      fetching: true,
    }
  },
});
