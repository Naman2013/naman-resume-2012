import createReducer from './utils/createReducer';
import createAction from './utils/createAction';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

// Mission action types
export const MISSION_CONFIRMATION_OPEN  = 'MISSION_CONFIRMATION_OPEN';
export const MISSION_CONFIRMATION_CLOSE = 'MISSION_CONFIRMATION_CLOSE';
export const MISSION_ALL_CARDS_SUCCESS  = 'MISSION_ALL_CARDS_SUCCESS';
export const MISSION_ALL_CARDS_FAIL     = 'MISSION_ALL_CARDS_FAIL';
export const MISSION_GET_INFO_SUCCESS   = 'MISSION_GET_INFO_SUCCESS';
export const MISSION_GET_INFO_FAIL      = 'MISSION_GET_INFO_FAIL';
export const MISSION_GET_UPDATES_SUCCESS= 'MISSION_GET_UPDATES_SUCCESS';
export const MISSION_GET_UPDATES_FAIL   = 'MISSION_GET_UPDATES_FAIL';
export const MISSION_GET_PIGGYBACKS     = 'MISSION_GET_PIGGYBACKS';
export const MISSION_GET_PIGGYBACKS_SUCCESS = 'MISSION_GET_PIGGYBACKS_SUCCESS';
export const MISSION_GET_PIGGYBACKS_FAIL= 'MISSION_GET_PIGGYBACKS_FAIL';
export const MISSION_GET_NEXT_RESERVATIONS_SUCCESS = 'MISSION_GET_NEXT_RESERVATIONS_SUCCESS';
export const MISSION_GET_NEXT_RESERVATIONS_FAIL = 'MISSION_GET_NEXT_RESERVATIONS_FAIL';

const GRAB_MISSION_SLOT_START = 'GRAB_MISSION_SLOT_START';
const GRAB_MISSION_SLOT_SUCCESS = 'GRAB_MISSION_SLOT_SUCCESS';
const GRAB_MISSION_SLOT_FAIL = 'GRAB_MISSION_SLOT_FAIL';

const CANCEL_MISSION_SLOT = 'CANCEL_MISSION_SLOT';

const UPDATE_SINGLE_RESERVATION_SUCCESS = 'UPDATE_SINGLE_RESERVATION_SUCCESS';
const UPDATE_SINGLE_RESERVATION_FAIL = 'UPDATE_SINGLE_RESERVATION_FAIL';



export function missionConfirmOpen(card, type) {
  return {
    type: MISSION_CONFIRMATION_OPEN,
    confirmType: type,
    currentCard: card,
  }
}

export function missionConfirmClose(mission) {
  return {
    type: MISSION_CONFIRMATION_CLOSE,
    mission: mission,
  }
}



export const cancelMissionSlot = ( mission ) => ( dispatch, getState ) => {
  const { token, at, cid } = getState().user;

  return axios.post('/api/reservation/cancelMissionSlot', {
    token,
    at,
    cid,
    ...mission,
  })
  .then( result => _.noop( result ) )
  .catch( error => _.noop( error ) );
};


/**
  see: /api/reservation/grabMissionSlot for providing the appropriate mission shape
  https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/edit#heading=h.tkagqs5w5vit
*/
export function grabMissionSlot(mission) {
  return (dispatch, getState) => {
    const { token, at, cid } = getState().user;

    // reset the state for loading the mission slot
    grabMissionSlotStart();

    return axios.post('/api/reservation/grabMissionSlot', {
      token,
      at,
      cid,
      ...mission,
    })
    .then(response => {
      dispatch( grabMissionSlotSuccess(response.data) );
    })
    .catch(error => dispatch(grabMissionSlotFail(error)));
  };
}

const grabMissionSlotFail = (error) => ({
  type: GRAB_MISSION_SLOT_FAIL,
  payload: error,
});

const grabMissionSlotSuccess = (result) => ({
  type: GRAB_MISSION_SLOT_SUCCESS,
  payload: result,
});

const grabMissionSlotStart = () => ({
  type: GRAB_MISSION_SLOT_START,
});



export function missionGetCards() {
  return (dispatch, getState) => {
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
      dispatch(allCards(response))
      dispatch(missionGetPiggybacks(response.data.objectList))
      dispatch(missionGetNextReservation(response.data.objectList))
    })
    .catch(error => dispatch(cardsFail(error)));
  }
}

export function missionGetInfo(card, type) {
  return (dispatch, getState) => {
    const { token, at, cid } = getState().user;

    return axios.post('/api/recommends/getNextPiggyback', {
      uniqueId: card.uniqueId,
      objectId: card.astroObjectId,
      lookaheadReservation: card.lookaheadDaysReservation,
      lookaheadPiggyback: card.lookaheadDaysPiggyback,
      start: card.start,
      ver: 'v1',
      lang: 'en',
      requestType: 'single',
      token,
      at,
      cid,
    })
    .then(response => {
      dispatch( getMissionSuccess( response, card ) );
      dispatch( missionConfirmOpen( type ) );
    })
    .catch(error => dispatch( getMissionFail( error )));
  }
}

export function getMissionSuccess({ data }, card) {
  return {
    type: MISSION_GET_INFO_SUCCESS,
    mission: data,
    currentCard: card,
  };
};

export function getMissionFail({data}) {
  return {
    type: MISSION_GET_INFO_FAIL,
    error: data.error
  };
};

export function allCards({data}) {
  return {
    type: MISSION_ALL_CARDS_SUCCESS,
    cardList: data.cardList
  };
};

export function cardsFail(error) {
  return {
    type: MISSION_ALL_CARDS_FAIL,
    error,
  };
};

export const missionGetUpdates = () => ( dispatch, getState ) => {
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
  .then( response => dispatch( missionUpdatesSuccess( response.data ) ) )
  .catch( error => dispatch( missionUpdatesFail( error ) ) );
};

export function missionUpdatesSuccess( announcementList ) {
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


export const missionGetPiggybacks = ( objectList ) => ( dispatch, getState ) => {
  const { token, at, cid } = getState().user;

  return axios.post('/api/recommends/getNextPiggyback', {
    cid,
    at,
    token,
    requestType: 'multiple',
    objectList: objectList,
    uniqueId: '',
    objectId: '',
    start: '',
  })
  .then(response => {
    dispatch( missionGetPiggybackSuccess( response ) );
  })
  .catch(error => dispatch( missionGetPiggybackFail( error )));
};

export function missionGetPiggybackSuccess({data}) {
  return {
    type: MISSION_GET_PIGGYBACKS_SUCCESS,
    result: data.missionList
  };
};

export function missionGetPiggybackFail({data}) {
  return {
    type: MISSION_GET_PIGGYBACKS_FAIL,
    result: data
  };
};


export function missionGetNextReservation(objectList) {
  return (dispatch, getState) => {
    let { token, at, cid } = getState().user;
    return axios.post('/api/recommends/getNextReservation', {
      requestType: 'multiple',
      uniqueId: '',
      objectId: '',
      start: '',
      objectList: objectList,
      cid,
      at,
      token
    })
    .then(response => dispatch( missionGetNextReservationSuccess(response) ))
    .catch(error => dispatch( missionGetNextReservationFail( error )));
  }
}

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
  }
}


const initialState = {
  isConfirmationOpen: false,
  mission: {},
  cardList: [],
  announcements: [],
  piggybacks: [],
  currentCard: null,
  currentMissionSlot: null,
  currentMissionSlotError: null,
  fetchingCurrentMissionSlot: false,
};


export default createReducer(initialState, {
  [MISSION_CONFIRMATION_OPEN](state, { confirmType, currentCard }) {
    return {
      ...state,
      isConfirmationOpen: true,
      confirmType,
      currentCard,
    };
  },
  [MISSION_CONFIRMATION_CLOSE](state) {
    return {
      ...state,
      isConfirmationOpen: false,
      confirmType: null,
      currentCard: null,
    };
  },
  [MISSION_ALL_CARDS_SUCCESS](state, {cardList}) {
    return {
      ...state,
      cardList
    };
  },
  [MISSION_GET_INFO_SUCCESS](state, { mission, currentCard }) {
    return {
      ...state,
      mission,
      currentCard,
    }
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
  [MISSION_GET_PIGGYBACKS_SUCCESS](state, { result }) {
    return {
      ...state,
      piggybacks: result,
    };
  },
  [MISSION_GET_PIGGYBACKS_FAIL](state, { result }) {
    return {
      ...state,
      piggybacks: result,
    };
  },
  [MISSION_GET_NEXT_RESERVATIONS_SUCCESS](state, { result }) {
    return {
      ...state,
      reservations: result,
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
      currentMissionSlotError: null,
      currentMissionSlot: null,
    };
  },
  [GRAB_MISSION_SLOT_SUCCESS](state, { payload }) {
    return {
      ...state,
      currentMissionSlotError: null,
      currentMissionSlot: payload,
      fetchingCurrentMissionSlot: false,
    };
  },
  [GRAB_MISSION_SLOT_FAIL](state, { payload }) {
    return {
      ...state,
      currentMissionSlotError: payload,
      currentMissionSlot: null,
      fetchingCurrentMissionSlot: false,
    };
  }
});
