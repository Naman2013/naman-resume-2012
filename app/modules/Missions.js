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
    mission: mission
  }
}


// this reducer changes missions object in store every time one of the actions is fired
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
