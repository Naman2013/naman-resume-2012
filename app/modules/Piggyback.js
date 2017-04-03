import axios from 'axios';
import createReducer from './utils/createReducer';
import { missionConfirmOpen, missionConfirmClose, missionGetCards } from './Missions';
import { fetchReservationList } from './mission-slots-by-telescope/mission-slots-by-telescope-actions';

const GRAB_PIGGYBACK_SUCCESS = 'GRAB_PIGGYBACK_SUCCESS';
const GRAB_PIGGYBACK_FAIL = 'GRAB_PIGGYBACK_FAIL';
const GRAB_PIGGYBACK_START = 'GRAB_PIGGYBACK_START';

const RESERVATION_SUCCESS = 'RESERVATION_SUCCESS';
const RESERVATION_START = 'RESERVATION_START';
const RESERVATION_FAIL = 'RESERVATION_FAIL';
const RESERVATION_RESET = 'RESERVATION_RESET';

const MISSION_UNAVAILABLE = 'MISSION_UNAVAILABLE';
const RESET_MISSION_UNAVAILABLE = 'RESET_MISSION_UNAVAILABLE';

const startPiggybackReservation = () => ({
  type: RESERVATION_START,
});

const reservePiggybackSuccess = payload => ({
  type: RESERVATION_SUCCESS,
  payload,
});

const reservePiggybackFail = payload => ({
  type: RESERVATION_FAIL,
  payload,
});

const resetReservation = () => ({
  type: RESERVATION_RESET,
});

/**
  depending on the callSource, byTelescope or recommends
  run the appropriate actions
*/
export const closeConfirmationModal = () => (dispatch, getState) => {
  const { piggyback } = getState();
  const { callSource, missionList } = piggyback.piggyback;
  const { obsId, domeId, telescopeId } = missionList[0];
  const BY_TELESCOPE = 'byTelescope';
  const RECOMMENDS = 'recommends';

  dispatch(resetReservation()); // reset state props to show the appropriate fields in the future

  // work to be done when by telescope reservation only
  if (callSource === BY_TELESCOPE) {
    const { missionSlotDates } = getState();
    const { reservationDate } = missionSlotDates.dateRangeResponse.dateList[0];
    dispatch(fetchReservationList({
      obsId,
      domeId,
      telescopeId,
      reservationDate,
    })); // refresh telescope reservation list
  }

  if (callSource === RECOMMENDS) {
    dispatch(missionGetCards()); // refresh the missions displayed to the user
  }

  dispatch(missionConfirmClose()); // dismiss the modal
};

const startGrabPiggyback = () => ({
  type: GRAB_PIGGYBACK_START,
});

const grabPiggybackSuccess = payload => ({
  type: GRAB_PIGGYBACK_SUCCESS,
  payload,
});

const missionUnavailable = payload => ({
  type: MISSION_UNAVAILABLE,
  payload,
});

/**
  see documentation for reservePiggyback
  https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/edit#
*/
export const reservePiggyback = () => (dispatch, getState) => {
  const { token, at, cid } = getState().user;
  const { piggyback } = getState();
  const { callSource } = piggyback.piggyback;
  const currentMission = piggyback.piggyback.missionList[0];

  dispatch(startPiggybackReservation());

  return axios.post('/api/reservation/reservePiggyback', {
    token,
    at,
    cid,
    callSource,
    ...currentMission,
  })
  .then(result => dispatch(reservePiggybackSuccess(result.data)))
  .catch(error => dispatch(reservePiggybackFail(error)));
};

/**
  see https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/
  for /api/reservation/grabPiggyback documentation
*/
export const grabPiggyback = mission => (dispatch, getState) => {
  const { token, at, cid } = getState().user;
  const { currentCard } = getState().missions;
  const { missionAvailable } = mission;

  dispatch(startGrabPiggyback());

  if (!missionAvailable) {
    dispatch(missionUnavailable());
  }

  if (missionAvailable) {
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
    .catch(error => dispatch(missionUnavailable(error)));
  }
};

export const grabPiggybackByTelescope = ({ uniqueId, scheduledMissionId }) => (dispatch, getState) => {
  const { token, at, cid } = getState().user;

  dispatch(startGrabPiggyback());

  return axios.post('/api/reservation/grabPiggyback', {
    token,
    at,
    cid,
    uniqueId,
    scheduledMissionId,
    callSource: 'byTelescope',
  })
  .then((result) => {
    dispatch(grabPiggybackSuccess(result.data));
    dispatch(missionConfirmOpen('piggyback'));
  })
  .catch(error => dispatch(missionUnavailable(error)));
};

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
  [MISSION_UNAVAILABLE](state, { payload }) {
    return {
      ...state,
      missionAvailable: false,
    };
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
