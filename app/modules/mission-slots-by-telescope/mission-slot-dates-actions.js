import axios from 'axios';
import moment from 'moment';
import { fetchReservationList } from './mission-slots-by-telescope-actions';

export const FETCH_DATE_RANGE_START = 'FETCH_DATE_RANGE_START';
export const FETCH_DATE_RANGE_SUCCESS = 'FETCH_DATE_RANGE_SUCCESS';
export const FETCH_DATE_RANGE_FAIL = 'FETCH_DATE_RANGE_FAIL';

export const fetchDateRanges = ({
  obsId,
  domeId,
  telescopeId,
  requestedDate }) => (dispatch, getState) => {
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
  .then((result) => {
    const { data } = result;
    if (!data.apiError) {
      const { reservationDate } = data.dateList[0];
      dispatch(fetchReservationList({
        obsId,
        domeId,
        telescopeId,
        reservationDate,
      }));
    }
    dispatch(fetchDateRangesSuccess(data));
  })
  .catch(error => {
    dispatch(fetchDateRangesFail(error));
    throw(error);
  });
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
