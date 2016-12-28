import createReducer from '../utils/createReducer';
import {
  GRAB_TELESCOPE_SUCCESS,
  COMMIT_UPDATED_RESERVATIONS,
  CANCEL_REMAINING_MISSIONS
} from './actions';

/**
  missions: [
  {
    uniqueId, => WARNING, not to be confused with scheduledMissionId
    mission: {} // api response
  }
]
*/

const generateInitialState = () => ({
  missions: [],
});

export default createReducer(generateInitialState(), {
  [GRAB_TELESCOPE_SUCCESS](state) {
    return {
      ...state,
    };
  },
  [CANCEL_REMAINING_MISSIONS](state) {
    return {
      ...state,
      ...generateInitialState(),
    };
  },
  [COMMIT_UPDATED_RESERVATIONS](state, { payload }) {
    return {
      ...state,
      missions: payload,
    };
  },
});
