import createReducer from './utils/createReducer';
import creatAction from './utils/creatAction';
import axios from 'axios';

// Mission action types
export const MISSION_CONFIRMATION_OPEN = 'MISSION_CONFIRMATION_OPEN';
export const MISSION_CONFIRMATION_CLOSE = 'MISSION_CONFIRMATION_CLOSE';
export const MISSION_ALL_CARDS_SUCCESS = 'MISSION_ALL_CARDS_SUCCESS';
export const MISSION_ALL_CARDS_FAIL = 'MISSION_ALL_CARDS_FAIL';

const initialState = {
  isConfirmationOpen: false,
  mission: {},
  cardList: []
};

// Mission action creator
export function missionConfirmOpen(mission, type) {
  return {
    type: MISSION_CONFIRMATION_OPEN,
    mission: mission,
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
  console.log('calling missionGetCards');
  return dispatch => {
    //dispatch( creatingOrder(cartObj) );
    return axios.post('/api/recommends/cards', {
      status: 'published',
      ver: 'v1',
      lang: 'en',
      type: 'curated'
    })
      .then(response => dispatch( allCards( response )))
      .catch(error => dispatch( cardsFail( error.data )));
  }
}

export function allCards({data}) {
  return {
    type: MISSION_ALL_CARDS_SUCCESS,
    cardList: data.cardList
  };
};

export function cardsFail({data}) {
  return {
    type: MISSION_ALL_CARDS_FAIL,
    error: data.error
  };
};


// this reducer changes missions object in store every time one of the actions is fired
export default createReducer(initialState, {
  [MISSION_CONFIRMATION_OPEN](state, { mission, confirmType }) {
    return {
      ...mission,
      isConfirmationOpen: true,
      confirmType
    };
  },
  [MISSION_CONFIRMATION_CLOSE]() {
    return {
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
});
