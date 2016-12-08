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
  lastKnownErrorMessage: {},
};

export default createReducer(initialState, {
  [FETCH_MISSION_SLOTS_START](state) {
    return {
      ...state,
      reservationListIsFetching: true,
      reservationListError: false,
    };
  },
  [FETCH_MISSION_SLOTS_SUCCESS](state, { payload }) {
    return {
      ...state,
      reservationListIsFetching: false,
      reservationListError: false,
      reservationList: payload,
    };
  },
  [FETCH_MISSION_SLOTS_FAIL](state, { payload }) {
    return {
      ...state,
      reservationListIsFetching: false,
      reservationListError: true,
      lastKnownErrorMessage: payload,
    };
  },
});
