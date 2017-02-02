import createReducer from '../utils/createReducer';
import * as missionSlots from './mission-slot-dates-actions';

const {
  FETCH_DATE_RANGE_START,
  FETCH_DATE_RANGE_SUCCESS,
  FETCH_DATE_RANGE_FAIL,
} = missionSlots;

const initialState = {
  dateRangeResponse: {},
  dateRangeFetchError: {},
  dateRangeIsError: false,
  dateRangeIsFetching: true,
};

export default createReducer(initialState, {
  [FETCH_DATE_RANGE_START](state) {
    return {
      ...state,
      dateRangeFetchError: {},
      dateRangeIsError: false,
      dateRangeIsFetching: false,
    };
  },
  [FETCH_DATE_RANGE_SUCCESS](state, { payload }) {
    return {
      ...state,
      dateRangeResponse: payload,
      dateRangeFetchError: {},
      dateRangeIsError: false,
      dateRangeIsFetching: false,
    };
  },
  [FETCH_DATE_RANGE_FAIL](state, { payload }) {
    return {
      ...state,
      dateRangeResponse: {},
      dateRangeFetchError: payload,
      dateRangeIsError: true,
      dateRangeIsFetching: false,
    };
  },
});
