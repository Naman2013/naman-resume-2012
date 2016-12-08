import createReducer from '../utils/createReducer';
import * as missionSlotActions from './mission-slots-by-telescope-actions'

const {
  FETCH_MISSION_SLOTS_START,
  FETCH_MISSION_SLOTS_SUCCESS,
  FETCH_MISSION_SLOTS_FAIL } = missionSlotActions;

const initialState = {
  reservationListIsFetching: true,
  reservationListError: false,
  reservationList: {},
};

export default createReducer(initialState, {
  [FETCH_MISSION_SLOTS_START](state) {
    return {
      ...state,
    };
  },
  [FETCH_MISSION_SLOTS_SUCCESS](state) {
    return {
      ...state,
    };
  },
  [FETCH_MISSION_SLOTS_FAIL](state) {
    return {
      ...state,
    };
  },
});
