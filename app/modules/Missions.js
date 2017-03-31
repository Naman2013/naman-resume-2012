import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import { push } from 'react-router-redux';
import createReducer from './utils/createReducer';

import { fetchUsersUpcomingMissions } from './Users-Upcoming-Missions';
import { grabPiggyback } from './Piggyback';
import { cancelAllReservations } from './grab-telescope-slot/actions';
import grabUpdatedSlot from '../services/reservations/grab-updated-slot';
import updateMissionSlot from '../services/reservations/update-mission-slot';

import RESERVATION_TYPES from '../constants/reservation-types';

const MISSION_CONFIRMATION_OPEN = 'MISSION_CONFIRMATION_OPEN';
const MISSION_CONFIRMATION_CLOSE = 'MISSION_CONFIRMATION_CLOSE';

const MISSION_ALL_CARD_START = 'MISSION_ALL_CARD_START';
const MISSION_ALL_CARDS_SUCCESS = 'MISSION_ALL_CARDS_SUCCESS';
const MISSION_ALL_CARDS_FAIL = 'MISSION_ALL_CARDS_FAIL';

const MISSION_GET_INFO_FAIL = 'MISSION_GET_INFO_FAIL';

const MISSION_GET_UPDATES_SUCCESS = 'MISSION_GET_UPDATES_SUCCESS';
const MISSION_GET_UPDATES_FAIL = 'MISSION_GET_UPDATES_FAIL';

const MISSION_GET_PIGGYBACKS_START = 'MISSION_GET_PIGGYBACKS_START';
const MISSION_GET_PIGGYBACKS_SUCCESS = 'MISSION_GET_PIGGYBACKS_SUCCESS';
const MISSION_GET_PIGGYBACKS_FAIL = 'MISSION_GET_PIGGYBACKS_FAIL';

const MISSION_GET_NEXT_RESERVATIONS_START = 'MISSION_GET_NEXT_RESERVATIONS_START';
const MISSION_GET_NEXT_RESERVATIONS_SUCCESS = 'MISSION_GET_NEXT_RESERVATIONS_SUCCESS';
const MISSION_GET_NEXT_RESERVATIONS_FAIL = 'MISSION_GET_NEXT_RESERVATIONS_FAIL';

const GRAB_MISSION_SLOT_START = 'GRAB_MISSION_SLOT_START';
const GRAB_MISSION_SLOT_SUCCESS = 'GRAB_MISSION_SLOT_SUCCESS';
const GRAB_MISSION_SLOT_FAIL = 'GRAB_MISSION_SLOT_FAIL';

const RESERVE_MISSION_SLOT_SUCCESS = 'RESERVE_MISSION_SLOT_SUCCESS';
const RESERVE_MISSION_SLOT_FAIL = 'RESERVE_MISSION_SLOT_FAIL';
const RESERVE_MISSION_SLOT_RESET = 'RESERVE_MISSION_SLOT_RESET';

const UPDATE_SINGLE_RESERVATION_SUCCESS = 'UPDATE_SINGLE_RESERVATION_SUCCESS';
const UPDATE_SINGLE_RESERVATION_FAIL = 'UPDATE_SINGLE_RESERVATION_FAIL';

const SET_CURRENT_CARD = 'SET_CURRENT_CARD';

const COMMIT_UPDATED_PIGGYBACKS = 'COMMIT_UPDATED_PIGGYBACKS';

const STORE_CARDS_RESPONSE = 'STORE_CARDS_RESPONSE';

const setCurrentCard = card => ({
  type: SET_CURRENT_CARD,
  payload: card,
});

export function missionConfirmOpen(type) {
  return {
    type: MISSION_CONFIRMATION_OPEN,
    confirmType: type,
  };
}

export const missionConfirmClose = () => ({
  type: MISSION_CONFIRMATION_CLOSE,
});

const reserveMissionSuccess = payload => ({
  type: RESERVE_MISSION_SLOT_SUCCESS,
  payload,
});

const reserveMissionFail = error => ({
  type: RESERVE_MISSION_SLOT_FAIL,
  payload: error,
});

export const reserveMissionSlot = ({
  scheduledMissionId,
  callSource,
  missionType,
  missionStart,
  objectId,
  objectType,
  objectTitle,
  objectRA,
  objectDec,
  catalog,
  catName,
  designation,
  processingRecipe,
  obsId,
  domeId,
  telescopeId,
  obsName,
  telescopeName,
  objectIconURL,
  uniqueId,
  targetName,
  objective,
}) => (dispatch, getState) => {
  const { token, at, cid } = getState().user;
  return axios.post('/api/reservation/reserveMissionSlot', {
    token,
    at,
    cid,
    scheduledMissionId,
    callSource,
    missionType,
    missionStart,
    objectId,
    objectType,
    objectTitle,
    objectRA,
    objectDec,
    catalog,
    catName,
    designation,
    processingRecipe,
    obsId,
    domeId,
    telescopeId,
    obsName,
    telescopeName,
    objectIconURL,
    uniqueId,
    targetName,
    objective,
  })
  .then((result) => {
    dispatch(cancelAllReservations());
    dispatch(fetchUsersUpcomingMissions());
    dispatch(reserveMissionSuccess(result.data));
  })
  .catch(error => dispatch(reserveMissionFail(error)));
};

export const updateReservation = ({
  scheduledMissionId,
  callSource,
  missionType,
  missionStart,
  objectId,
  objectType,
  objectTitle,
  objectRA,
  objectDec,
  catalog,
  catName,
  designation,
  processingRecipe,
  obsId,
  domeId,
  telescopeId,
  obsName,
  telescopeName,
  objectIconURL,
  uniqueId,
  targetName,
  objective,
}) => (dispatch, getState) => {
  const { token, at, cid } = getState().user;
  return updateMissionSlot({
    token,
    at,
    cid,
    scheduledMissionId,
    callSource,
    missionType,
    missionStart,
    objectId,
    objectType,
    objectTitle,
    objectRA,
    objectDec,
    catalog,
    catName,
    designation,
    processingRecipe,
    obsId,
    domeId,
    telescopeId,
    obsName,
    telescopeName,
    objectIconURL,
    uniqueId,
    targetName,
    objective,
  })
  .then((result) => {
    dispatch(cancelAllReservations());
    dispatch(fetchUsersUpcomingMissions());
    dispatch(reserveMissionSuccess(result.data));
  })
  .catch(error => dispatch(reserveMissionFail(error)));
};


export const resetReserveMission = () => ({
  type: RESERVE_MISSION_SLOT_RESET,
});

export const cancelMissionSlot = mission => (dispatch, getState) => {
  const { token, at, cid } = getState().user;
  return axios.post('/api/reservation/cancelMissionSlot', {
    token,
    at,
    cid,
    ...mission,
  })
  .then(result => _.noop(result))
  .catch(error => _.noop(error));
};

const grabMissionSlotFail = error => ({
  type: GRAB_MISSION_SLOT_FAIL,
  payload: error,
});

const grabMissionSlotSuccess = result => ({
  type: GRAB_MISSION_SLOT_SUCCESS,
  payload: result,
});

const grabMissionSlotStart = () => ({
  type: GRAB_MISSION_SLOT_START,
});

/**
  see: /api/reservation/grabMissionSlot for providing the appropriate mission shape
  https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/edit#heading=h.tkagqs5w5vit
*/
export const grabMissionSlot = ({
    scheduledMissionId,
    callSource,
    missionType,
    missionStart,
    obsId,
    domeId,
    telescopeId,
    objectId,
    objectType,
    objectTitle,
    objectRA,
    objectDec,
    catalog,
    catName,
    designation,
    processingRecipe,
    uniqueId,
    targetName,
  }) => (dispatch, getState) => {
    const { token, at, cid } = getState().user;

    grabMissionSlotStart();

    return axios.post('/api/reservation/grabMissionSlot', {
      token,
      at,
      cid,
      scheduledMissionId,
      callSource,
      missionType,
      missionStart,
      obsId,
      domeId,
      telescopeId,
      objectId,
      objectType,
      objectTitle,
      objectRA,
      objectDec,
      catalog,
      catName,
      designation,
      processingRecipe,
      uniqueId,
      targetName,
    })
    .then((response) => {
      /**
        patching the callsource to ensure that it is always included for
        future requests
      */
      dispatch(grabMissionSlotSuccess(Object.assign(response.data, {
        callSource,
        reservationType: RESERVATION_TYPES.NEW_RESERVATION,
      })));
    })
    .catch(error => dispatch(grabMissionSlotFail(error)));
  };

export const grabUpdateMissionSlot = ({
    scheduledMissionId,
    callSource,
    missionType,
    missionStart,
    obsId,
    domeId,
    telescopeId,
    objectId,
    objectType,
    objectTitle,
    objectRA,
    objectDec,
    catalog,
    catName,
    designation,
    processingRecipe,
    uniqueId,
    targetName,
  }) => (dispatch, getState) => {
    const { token, at, cid } = getState().user;

    grabMissionSlotStart();

    return grabUpdatedSlot({
      token,
      at,
      cid,
      scheduledMissionId,
      callSource,
      missionType,
      missionStart,
      obsId,
      domeId,
      telescopeId,
      objectId,
      objectType,
      objectTitle,
      objectRA,
      objectDec,
      catalog,
      catName,
      designation,
      processingRecipe,
      uniqueId,
      targetName,
    })
    .then((response) => {
      /**
        patching the callsource to ensure that it is always included for
        future requests

        patching reservationType to allow future calls to know what type
        of reservation this is.  In particular, whether or not this is
        simply updating an existing reservation
      */
      dispatch(grabMissionSlotSuccess(Object.assign(response.data, {
        callSource,
        reservationType: RESERVATION_TYPES.UPDATE,
      })));
    })
    .catch(error => dispatch(grabMissionSlotFail(error)));
  };

/**
  if data from the fetch cards API has already been called use that source
  instead of going all the way back to the API.

  the cards call is good for about a week and does not require to be called
  for each request to for new missions.
*/
export function missionGetCards() {
  return (dispatch, getState) => {
    const { cardAPIResponse } = getState().missions;

    dispatch(fetchAllCardsStart());

    if (cardAPIResponse) {
      dispatch(allCards(cardAPIResponse));
      dispatch(missionGetPiggybacks(cardAPIResponse.data.objectList));
      dispatch(missionGetNextReservation(cardAPIResponse.data.objectList));
    } else {
      const { token, at, cid } = getState().user;
      return axios.post('/api/recommends/cards', {
        status: 'published',
        ver: 'v1',
        lang: 'en',
        type: 'curated',
        token,
        at,
        cid,
      })
      .then(response => {
        dispatch(storeCardsResponse(response));
        dispatch(allCards(response));
        dispatch(missionGetPiggybacks(response.data.objectList));
        dispatch(missionGetNextReservation(response.data.objectList));
      })
      .catch(error => dispatch(cardsFail(error)));
    }
  }
}

export function getNextPiggybackSingle(card) {
  return (dispatch, getState) => {
    const { token, at, cid } = getState().user;

    dispatch(setCurrentCard(card));

    return axios.post('/api/recommends/getNextPiggyback', {
      token,
      at,
      cid,
      uniqueId: card.uniqueId,
      objectId: card.astroObjectId,
      lookaheadReservation: card.lookaheadDaysReservation,
      lookaheadPiggyback: card.lookaheadDaysPiggyback,
      requestType: 'single',
    })
    .then(response => dispatch(getNextPiggybackSingleSuccess(response.data)))
    .catch(error => dispatch(getNextPiggybackSingleFail(error)));
  }
}

const getNextPiggybackSingleFail = payload => ({
  type: MISSION_GET_INFO_FAIL,
  error: payload,
});

const getNextPiggybackSingleSuccess = getNextPiggybackData => (dispatch, getState) => {
  const { apiError, missionList } = getNextPiggybackData;

  if (apiError) {
    dispatch(getNextPiggybackSingleFail(getNextPiggybackData));
  }

  if (!apiError) {
    dispatch(grabPiggyback(missionList[0]));
  }
};

const fetchAllCardsStart = () => ({
  type: MISSION_ALL_CARD_START,
});

export const allCards = ({ data }) => ({
  type: MISSION_ALL_CARDS_SUCCESS,
  cardList: data.cardList,
});

const storeCardsResponse = payload => ({
  type: STORE_CARDS_RESPONSE,
  payload,
});

export function cardsFail(error) {
  return {
    type: MISSION_ALL_CARDS_FAIL,
    error,
  };
};

export const missionGetUpdates = () => (dispatch, getState) => {
  const { token, at, cid } = getState().user;

  return axios.post('/api/info/getAnnouncements', {
    token,
    at,
    cid,
    type: 'all',
    category: 'missionControl',
    status: 'published',
    timestamp: moment().unix(),
    level: 'all',
  })
  .then(response => dispatch(missionUpdatesSuccess(response.data)))
  .catch(error => dispatch(missionUpdatesFail(error)));
};

export function missionUpdatesSuccess(announcementList) {
  return {
    type: MISSION_GET_UPDATES_SUCCESS,
    payload: announcementList,
  };
};

export function missionUpdatesFail(error) {
  return {
    type: MISSION_GET_UPDATES_FAIL,
    error: error
  };
};


export const missionGetPiggybacks = objectList => (dispatch, getState) => {
  const { token, at, cid } = getState().user;

  if (!token || !cid || !at) {
    dispatch(push('/registration/sign-in'));
    return;
  }

  dispatch(fetchPiggybacksStart());

  return axios.post('/api/recommends/getNextPiggyback', {
    cid,
    at,
    token,
    objectList,
    uniqueId: '',
    objectId: '',
    start: '',
    requestType: 'multiple',
  })
  .then(response => {
    dispatch(missionGetPiggybackSuccess(response));
  })
  .catch(error => dispatch(missionGetPiggybackFail(error)));
};

const fetchPiggybacksStart = () => ({
  type: MISSION_GET_PIGGYBACKS_START,
});

export function missionGetPiggybackSuccess({ data }) {
  return {
    type: MISSION_GET_PIGGYBACKS_SUCCESS,
    result: data.missionList,
  };
};

export function missionGetPiggybackFail(error) {
  return {
    type: MISSION_GET_PIGGYBACKS_FAIL,
    payload: error
  };
};


export function missionGetNextReservation(objectList) {
  return (dispatch, getState) => {
    const { token, at, cid } = getState().user;

    dispatch(fetchMissionsStart());

    return axios.post('/api/recommends/getNextReservation', {
      requestType: 'multiple',
      uniqueId: '',
      objectId: '',
      start: '',
      objectList,
      cid,
      at,
      token
    })
    .then(response => dispatch(missionGetNextReservationSuccess(response)))
    .catch(error => dispatch(missionGetNextReservationFail(error)));
  }
}

export const updatePiggyback = ({ uniqueId, objectId }) => (dispatch, getState) => {
  const { at, cid, token } = getState().user;
  return axios.post('/api/recommends/getNextPiggyback', {
    at,
    token,
    cid,
    uniqueId,
    objectId,
  })
  .then(result => dispatch(updateSinglePiggyback(result.data)))
  .catch(error => dispatch(updateSinglePiggybackError(error)));
};

const updateSinglePiggyback = (data) => (dispatch, getState) => {
  const { piggybacks } = getState().missions;
  const newMission = data.missionList[0];
  const newMissionUniqueId = newMission.uniqueId;
  const updatedPiggybacks = piggybacks.map(piggyback => {
    if(piggyback.uniqueId === newMissionUniqueId) {
      return newMission;
    }
    return piggyback;
  });

  dispatch(commitPiggybackUpdate(updatedPiggybacks));
};

const updateSinglePiggybackError = (error) => {
  throw error;
};

const commitPiggybackUpdate = (updatedPiggybacks) => ({
  type: COMMIT_UPDATED_PIGGYBACKS,
  payload: updatedPiggybacks,
});

export function updateSingleReservations(uniqueId, objectId) {
  return (dispatch, getState) => {
    const { token, at, cid } = getState().user;

    return axios.post('/api/recommends/getNextReservation', {
      cid,
      at,
      token,
      uniqueId,
      objectId,
      requestType: 'single',
    })
    .then(response => dispatch( updateReservationsSuccess( response.data ) ))
    .catch(error => dispatch( updateReservationsFail( error )));
  }
};

function updateReservationsSuccess(getNextReservationResponse) {
  return {
    type: UPDATE_SINGLE_RESERVATION_SUCCESS,
    payload: getNextReservationResponse,
  }
}

function updateReservationsFail(error) {
  return {
    type: UPDATE_SINGLE_RESERVATION_FAIL,
    payload: error,
  }
}

const fetchMissionsStart = () => ({
  type: MISSION_GET_NEXT_RESERVATIONS_START,
});

export function missionGetNextReservationSuccess({ data }) {
  return {
    type: MISSION_GET_NEXT_RESERVATIONS_SUCCESS,
    result: data.missionList,
  }
}

export function missionGetNextReservationFail({ data }) {
  return {
    type: MISSION_GET_NEXT_RESERVATIONS_FAIL,
    result: data,
  };
}


const initialState = {
  announcements: [],

  isConfirmationOpen: false,

  fetchingCards: false,
  fetchingPiggybacks: false,
  fetchingMissions: false,

  cardAPIResponse: null, // original list, if we have it in memory we continue to use it
  cardList: [], // all available cards ( featured and non )
  piggybacks: [], // all available piggybacks
  reservations: [], // all available active missions
  currentCard: {}, // selected card DEPRECATE - current dependency is on piggyback on mission

  selectedMissionSlot: {}, // the next available mission slot - called at the time of mission selection
  currentMissionSlot: {}, // response from grabMission, should use selectedMissionSlot for source data
  currentMissionSlotError: {},
  fetchingCurrentMissionSlot: false,
  grabMissionSlotError: false,

  missionSlotJustReserved: false,
  missionSlotReservationError: false,
  previousMissionSlotReservation: {}, // stores a reference to the previous mission after successful reservation
  previousMissionSlotReservationError: {}, // stores an error for an attempted mission reservation
};


export default createReducer(initialState, {
  [STORE_CARDS_RESPONSE](state, { payload }) {
    return  {
      ...state,
      cardAPIResponse: payload,
    };
  },
  [RESERVE_MISSION_SLOT_SUCCESS](state, { payload }) {
    return {
      ...state,
      missionSlotJustReserved: true,
      missionSlotReservationError: false,
      previousMissionSlotReservation: payload,
      previousMissionSlotReservationError: {},
    };
  },
  [RESERVE_MISSION_SLOT_FAIL](state, { payload }) {
    return {
      ...state,
      missionSlotJustReserved: false,
      missionSlotReservationError: true,
      previousMissionSlotReservation: {},
      previousMissionSlotReservationError: payload,
    };
  },
  [RESERVE_MISSION_SLOT_RESET](state) {
    return {
      ...state,
      missionSlotJustReserved: false,
      missionSlotReservationError: false,
      previousMissionSlotReservation: {},
      previousMissionSlotReservationError: {},
    };
  },

  [MISSION_CONFIRMATION_OPEN](state, { confirmType }) {
    return {
      ...state,
      isConfirmationOpen: true,
      confirmType,
    };
  },
  [MISSION_CONFIRMATION_CLOSE](state) {
    return {
      ...state,
      isConfirmationOpen: false,
      confirmType: null,
      currentCard: null,
      missionSlotJustReserved: false,
    };
  },
  [MISSION_ALL_CARD_START](state) {
    return {
      ...state,
      fetchingCards: true,
      fetchingPiggybacks: true,
      fetchingMissions: true,
    };
  },
  [MISSION_ALL_CARDS_SUCCESS](state, { cardList } ) {
    return {
      ...state,
      cardList,
      fetchingCards: false,
    };
  },
  [SET_CURRENT_CARD](state, { payload }) {
    return {
      ...state,
      currentCard: payload,
    };
  },

  [MISSION_GET_UPDATES_SUCCESS](state, { payload }) {
    return {
      ...state,
      announcements: payload.announcementList,
    }
  },
  [MISSION_GET_UPDATES_FAIL](state, { announcements }) {
    return {
      ...state,
      announcements: [],
    }
  },
  [MISSION_GET_PIGGYBACKS_START](state) {
    return {
      ...state,
      fetchingPiggybacks: true,
    };
  },
  [MISSION_GET_PIGGYBACKS_SUCCESS](state, { result }) {
    return {
      ...state,
      piggybacks: result,
      fetchingPiggybacks: false,
    };
  },
  [MISSION_GET_PIGGYBACKS_FAIL](state, { payload }) {
    return {
      ...state,
      piggybacks: payload,
    };
  },
  [MISSION_GET_NEXT_RESERVATIONS_START](state) {
    return {
      ...state,
      fetchingMissions: true,
    };
  },
  [MISSION_GET_NEXT_RESERVATIONS_SUCCESS](state, { result }) {
    return {
      ...state,
      reservations: result,
      fetchingMissions: false,
    };
  },
  [MISSION_GET_NEXT_RESERVATIONS_FAIL](state, { result }) {
    return {
      ...state,
      reservations: [],
    };
  },
  [UPDATE_SINGLE_RESERVATION_SUCCESS](state, { type, payload }) {
    /**
      Takes a single reservation from payload, if a match is determined
      will update the reservations in state to the updated version of the
      reservations based on the new data
    */
    const { reservations } = state;
    const { uniqueId } = payload.missionList;

    const updatedReservations = reservations.map((reservation) => {
      if(reservation.uniqueId === uniqueId) {
        return payload.missionList;
      }
      return reservation;
    });

    return {
      ...state,
      reservations: updatedReservations,
    };
  },
  [UPDATE_SINGLE_RESERVATION_FAIL](state) {
    return {
      ...state,
    };
  },

  [GRAB_MISSION_SLOT_START](state) {
    return {
      ...state,
      fetchingCurrentMissionSlot: true,
      currentMissionSlotError: {},
      currentMissionSlot: {},
      grabMissionSlotError: false,
    };
  },
  [GRAB_MISSION_SLOT_SUCCESS](state, { payload }) {
    return {
      ...state,
      currentMissionSlotError: {},
      currentMissionSlot: payload,
      fetchingCurrentMissionSlot: false,
      grabMissionSlotError: false,
    };
  },
  [GRAB_MISSION_SLOT_FAIL](state, { payload }) {
    return {
      ...state,
      currentMissionSlotError: payload,
      currentMissionSlot: {},
      fetchingCurrentMissionSlot: false,
      grabMissionSlotError: true,
    };
  },

  [COMMIT_UPDATED_PIGGYBACKS](state, { payload }) {
    return {
      ...state,
      piggybacks: payload,
    };
  },
});
