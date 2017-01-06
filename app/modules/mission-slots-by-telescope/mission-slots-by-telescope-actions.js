import axios from 'axios';
import { AVAILABLE_SLOT_MISSION_USER_HAS_HOLD_DEFAULT_PROPS } from './constants';

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
  .catch(error => dispatch(fetchReservationError(error)));
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

export const startCompleteReservation = (missionIndex) => (dispatch, getState) => {
  const { missionSlotsByTelescope } = getState();
  const { reservationList } = missionSlotsByTelescope;

  const updatedMissionList = reservationList.missionList.map(mission => {
    if(mission.missionIndex === missionIndex) {
      return Object.assign({}, mission, AVAILABLE_SLOT_MISSION_USER_HAS_HOLD_DEFAULT_PROPS);
    }
    return mission;
  });

  dispatch(fetchReservationSuccess(
    Object.assign({}, reservationList, { missionList: updatedMissionList }))
  );
};
