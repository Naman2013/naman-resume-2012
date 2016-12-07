import axios from 'axios';
import createReducer from './utils/createReducer';

const FETCH_DATE_RANGE_START = 'FETCH_DATE_RANGE_START';
const FETCH_DATE_RANGE_SUCCESS = 'FETCH_DATE_RANGE_SUCCESS';
const FETCH_DATE_RANGE_FAIL = 'FETCH_DATE_RANGE_FAIL';

export const fetchDateRanges = ({ obsId, domeId, telescopeId }) => (dispatch, getState) => {
  const { token, at, cid } = getState().user;

  return axios.post('/api/reservation/getMissionSlotDates', {
    token,
    at,
    cid,
    obsId,
    domeId,
    telescopeId,
  })
  .then(result => fetchDateRangesSuccess(result.data))
  .catch(error => fetchDateRangesFail(error));
};

const fetchDateRangesSuccess = (payload) => ({
  type: FETCH_DATE_RANGE_SUCCESS,
  payload,
});

const fetchDateRangesError = (payload) => ({
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
  dateRangeIsFetching: false,

};

export default createReducer(initialState, {
  [FETCH_DATE_RANGE_START](state) {
    return {
      ...state,
      dateRangeResponse: {},
      dateRangeFetchError: {},
      dateRangeIsError: false,
      dateRangeIsFetching: true,
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
