import axios from 'axios';
import moment from 'moment';
import { fetchReservationList } from './mission-slots-by-telescope-actions';
import { cancelAllReservations } from '../grab-telescope-slot/actions';

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

  // cancel all active reservations...
  dispatch(cancelAllReservations());

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
    const { reservationDate } = result.data.dateList[0];
    dispatch(fetchDateRangesSuccess(result.data));
    dispatch(fetchReservationList({
      obsId,
      domeId,
      telescopeId,
      reservationDate,
    }));
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
