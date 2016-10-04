import createReducer from './utils/createReducer';
import createAction from './utils/createAction';
import axios from 'axios';
import moment from 'moment';

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

const initialState = {
  isConfirmationOpen: false,
  mission: {},
  cardList: [],
  announcements: [],
};

// Mission action creator
export function missionConfirmOpen(type) {
  return {
    type: MISSION_CONFIRMATION_OPEN,
    confirmType: type
  }
}

export function missionConfirmClose(mission) {
  return {
    type: MISSION_CONFIRMATION_CLOSE,
    mission: mission,
    confirmType: null
  }
}

export function missionGetCards() {
  return dispatch => {
    return axios.post('/api/recommends/cards', {
      status: 'published',
      ver: 'v1',
      lang: 'en',
      type: 'curated'
    })
    .then(response => {
      dispatch(allCards(response))
      dispatch(missionGetPiggybacks(response.data.objectList))
    })
    .catch(error => dispatch(cardsFail(error)));
  }
}

export function missionGetInfo(card, type) {
  return dispatch => {
    return axios.post('/api/recommends/getNextPiggyback', {
      uniqueId              : card.uniqueId,
      objectId              : card.astroObjectId,
      lookaheadReservation  : card.lookaheadDaysReservation,
      lookaheadPiggyback    : card.lookaheadDaysPiggyback,
      start                 : card.start,
      ver                   : 'v1',
      lang                  : 'en'
    })
    .then(response => {
      dispatch( getMissionSuccess(response) );
      dispatch( missionConfirmOpen(type) );
    })
    .catch(error => dispatch( getMissionFail( response )));
  }
}

export function getMissionSuccess({data}) {
  return {
    type: MISSION_GET_INFO_SUCCESS,
    mission: data
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



export function missionGetUpdates() {
  return dispatch => {
    return axios.post('/api/info/getAnnouncements', {
      type: 'all',
      category: 'missionControl',
      status: 'published',
      token: '8d02b976e146cb5e5bfe15a10bb96b2365826dca', //hard coded, TODO: change to logged in user
      timestamp: moment().unix(),
      cid: 198267, //hard coded, TODO: change to logged in user
      level: 'all',
      at: 3
    })
    .then(response => {
      dispatch(missionUpdatesSuccess(response));
    })
    .catch(error => dispatch(missionUpdatesFail(error)));
  }
}

export function missionUpdatesSuccess({data}) {
  return {
    type: MISSION_GET_UPDATES_SUCCESS,
    announcements: data.announcementList
  };
};

export function missionUpdatesFail(error) {
  return {
    type: MISSION_GET_UPDATES_FAIL,
    error: error
  };
};



export function missionGetPiggybacks(objectList) {
  return dispatch => {
    return axios.post('/api/recommends/getNextPiggyback', {
      cid: "",
      token: "",
      requestType: "multiple",
      uniqueId: "",
      objectId: "",
      start: "",
      objectList: objectList
    })
    .then(response => {
      dispatch( missionGetPiggybackSuccess(response) );
    })
    .catch(error => dispatch( missionGetPiggybackFail( response )));
  }
}

export function missionGetPiggybackSuccess({data}) {
  return {
    type: MISSION_GET_PIGGYBACKS_SUCCESS,
    result: data.missionList
  };
};

export function missionGetPiggybackFail({data}) {
  return {
    type: MISSION_GET_PIGGYBACKS_FAIL,
    result: data.error
  };
};


// this reducer changes missions object in store every time one of the actions is fired
export default createReducer(initialState, {
  [MISSION_CONFIRMATION_OPEN](state, { mission, confirmType }) {
    return {
      ...state,
      isConfirmationOpen: true,
      confirmType
    };
  },
  [MISSION_CONFIRMATION_CLOSE](state) {
    return {
      ...state,
      isConfirmationOpen: false,
      confirmType: null
    };
  },
  [MISSION_ALL_CARDS_SUCCESS](state, {cardList}) {
    return {
      ...state,
      cardList
    };
  },
  [MISSION_GET_INFO_SUCCESS](state, {mission}) {
    return {
      ...state,
      mission
    }
  },
  [MISSION_GET_UPDATES_SUCCESS](state, {announcements}) {
    return {
      ...state,
      announcements
    }
  },
  [MISSION_GET_UPDATES_FAIL](state, {announcements}) {
    return {
      ...state,
      announcements: []
    }
  },
  [MISSION_GET_PIGGYBACKS_SUCCESS](state, { result }) {
    let cardList = state.cardList;

    if (Array.isArray(cardList) && Array.isArray(result)) {
      cardList = cardList.map((card, idx) => {
        const item = result[idx] || {};
        item.missionAvailable = item.missionAvailable === 'true';

        return { ...card, ...item };
      });
    }

    return { ...state, cardList };
  }
});
