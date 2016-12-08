import axios from 'axios';

export const FETCH_MISSION_SLOTS_START = 'FETCH_MISSION_SLOTS_START';
export const FETCH_MISSION_SLOTS_SUCCESS = 'FETCH_MISSIONS_SLOTS_SUCCESS';
export const FETCH_MISSION_SLOTS_FAIL = 'FETCH_MISSION_SLOTS_FAIL';

export const fetchReservationList = ({
  obsId,
  domeId,
  telescopeId,
  reservationDate }) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;

  dispatch(fetchReservationStart());

  return axios.post('/api/reservation/getMissionSlotsByTelescope', {
    cid,
    at,
    token,
    obsId,
    domeId,
    telescopeId,
    reservationDate,
  })
  .then(result => dispatch(fetchReservationSuccess(result.data)))
  .error(error => dispatch(fetchReservationError(error)));
}

const fetchReservationSuccess = (payload) => ({
  type: FETCH_MISSION_SLOTS_SUCCESS,
  payload,
});

const fetchReservationError = (payload) => ({
  type: FETCH_MISSION_SLOTS_FAIL,
  payload,
});

const fetchReservationStart = () => ({
  type: FETCH_MISSION_SLOTS_START,
});
