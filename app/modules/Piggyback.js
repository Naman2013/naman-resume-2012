import axios from 'axios';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';
import { missionConfirmOpen, missionConfirmClose } from './Missions';

const GRAB_PIGGYBACK_SUCCESS = 'GRAB_PIGGYBACK_SUCCESS';
const GRAB_PIGGYBACK_FAIL = 'GRAB_PIGGYBACK_FAIL';
const GRAB_PIGGYBACK_START = 'GRAB_PIGGYBACK_START';

const CANCEL_PIGGYBACK = 'CANCEL_PIGGYBACK';

const RESERVATION_SUCCESS = 'RESERVATION_SUCCESS';
const RESERVATION_START  = 'RESERVATION_START';
const RESERVATION_FAIL = 'RESERVATION_FAIL';
const RESERVATION_RESET = 'RESERVATION_RESET';

const MISSION_UNAVAILABLE = 'MISSION_UNAVAILABLE';
const RESET_MISSION_UNAVAILABLE = 'RESET_MISSION_UNAVAILABLE';

const CLOSE_CONFIRMATION_MODAL = 'CLOSE_CONFIRMATION_MODAL';



export const closeConfirmationModal = () => (dispatch) => {
  dispatch(resetReservation());
  dispatch(missionConfirmClose());
};



/**
  see documentation for reservePiggyback
  https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/edit#
*/
export const reservePiggyback = () => (dispatch, getState) => {
  const { token, at, cid } = getState().user;
  const { piggyback } = getState();
  const currentMission = piggyback.piggyback.missionList[0];

  dispatch(startPiggybackReservation());

  return axios.post('/api/reservation/reservePiggyback', {
    token,
    at,
    cid,
    ...currentMission
  })
  .then(result => dispatch(reservePiggybackSuccess(result.data)))
  .catch(error => dispatch(reservePiggybackFail(error)));
};

const startPiggybackReservation = () => ({
  type: RESERVATION_START,
});

const reservePiggybackSuccess = (payload) => ({
  type: RESERVATION_SUCCESS,
  payload,
});

const reservePiggybackFail = (payload) => ({
  type: RESERVATION_FAIL,
  payload,
});

const resetReservation = () => ({
  type: RESERVATION_RESET,
});

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
  fetchingReservation: false,
  reservationConfirmed: false,
  reservationFailed: false,
  reservationConfirmation: {},
  reservationError: {},

  piggyback: {},
  piggybackError: {},
  error: false,
  fetching: true,
  missionAvailable: true,
};

export default createReducer(initialState, {
  [RESERVATION_START](state) {
    return {
      ...state,
      fetchingReservation: true,
      reservationConfirmed: false,
      reservationFailed: false,
      reservationConfirmation: {},
      reservationError: {},
    };
  },
  [RESERVATION_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingReservation: false,
      reservationConfirmed: true,
      reservationFailed: false,
      reservationConfirmation: payload,
      reservationError: {},
    };
  },
  [RESERVATION_FAIL](state, { payload }) {
    return {
      ...state,
      fetchingReservation: false,
      reservationConfirmed: false,
      reservationFailed: true,
      reservationConfirmation: {},
      reservationError: payload,
    };
  },
  [RESERVATION_RESET](state, { payload }) {
    return {
      ...state,
      fetchingReservation: false,
      reservationConfirmed: false,
      reservationFailed: false,
      reservationConfirmation: {},
      reservationError: {},
    };
  },
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
