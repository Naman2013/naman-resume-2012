import createReducer from './utils/createReducer';
import creatAction from './utils/creatAction';

// Mission action types
export const MISSION_CONFIRMATION_OPEN = 'MISSION_CONFIRMATION_OPEN';
export const MISSION_CONFIRMATION_CLOSE = 'MISSION_CONFIRMATION_CLOSE';

const initialState = {
  isConfirmationOpen: false,
  mission: {}
};

// Mission action creator
export function missionConfirmOpen(mission) {
  return {
    type: types.MISSION_CONFIRMATION_OPEN,
    meal: meal
  }
}

export function missionConfirmClose(mission) {
  return {
    type: types.MISSION_CONFIRMATION_CLOSE,
    meal: meal
  }
}


// this reducer changes food object in store every time one of the actions is fired
export function missionReducer(state = initialState.isOpen, action) {
  switch (action.type) {
    case types.MISSION_CONFIRMATION_OPEN:
      return Object.assign({}, state.mission, action.mission);
    default:
      return state;
  }
}


export default createReducer(initialState, {
  [MISSION_CONFIRMATION_OPEN](state, { mission }) {
    return {
      ...mission,
      isConfirmationOpen: true,
    };
  },
  [MISSION_CONFIRMATION_CLOSE]() {
    return {
      isConfirmationOpen: false,
    };
  },
});
