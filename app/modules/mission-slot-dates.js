import axios from 'axios';
import moment from 'moment';
import createReducer from './utils/createReducer';
import { fetchReservationList } from './mission-slots-by-telescope/mission-slots-by-telescope-actions';

const FETCH_DATE_RANGE_START = 'FETCH_DATE_RANGE_START';
const FETCH_DATE_RANGE_SUCCESS = 'FETCH_DATE_RANGE_SUCCESS';
const FETCH_DATE_RANGE_FAIL = 'FETCH_DATE_RANGE_FAIL';

export const fetchDateRanges = ({ obsId, domeId, telescopeId, requestedDate }) => (dispatch, getState) => {
  const { token, at, cid } = getState().user;

  dispatch(fetchDateRangeStart());

  return axios.post('/api/reservation/getMissionSlotDates', {
    token,
    at,
    cid,
    obsId,
    domeId,
    telescopeId,
    requestedDate,
  })
  .then(result => {
    dispatch(fetchDateRangesSuccess(result.data));
    const { reservationDate } = result.data.dateList[0];
    dispatch(fetchReservationList({
      obsId,
      domeId,
      telescopeId,
      reservationDate,
    }));
  })
  .catch(error => dispatch(fetchDateRangesFail(error)));
};

const fetchDateRangesSuccess = (payload) => ({
  type: FETCH_DATE_RANGE_SUCCESS,
  payload,
});

const fetchDateRangesFail = (payload) => ({
  type: FETCH_DATE_RANGE_FAIL,
  payload,
});

const fetchDateRangeStart = () => ({
  type: FETCH_DATE_RANGE_START,
});

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
