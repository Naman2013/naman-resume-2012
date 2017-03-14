import axios from 'axios';
import { grabTelescopeSlotSuccess } from '../grab-telescope-slot/actions';
import { AVAILABLE_SLOT_MISSION_USER_HAS_HOLD_DEFAULT_PROPS } from './constants';

export const FETCH_MISSION_SLOTS_START = 'FETCH_MISSION_SLOTS_START';
export const FETCH_MISSION_SLOTS_SUCCESS = 'FETCH_MISSIONS_SLOTS_SUCCESS';
export const FETCH_MISSION_SLOTS_FAIL = 'FETCH_MISSION_SLOTS_FAIL';

const fetchReservationSuccess = payload => ({
  type: FETCH_MISSION_SLOTS_SUCCESS,
  payload,
});

const fetchReservationError = payload => ({
  type: FETCH_MISSION_SLOTS_FAIL,
  payload,
});

const fetchReservationStart = () => ({
  type: FETCH_MISSION_SLOTS_START,
});

export const fetchReservationList = ({
  obsId,
  domeId,
  telescopeId,
  reservationDate,
  }) => (dispatch, getState) => {
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
  };

// TODO: add the reservation into the list of missions being considered
export const startCompleteReservation = missionIndex => (dispatch, getState) => {
  const { missionSlotsByTelescope } = getState();
  const { reservationList } = missionSlotsByTelescope;
  const activatedMission = {};

  const updatedMissionList = reservationList.missionList.map((mission) => {
    if (mission.missionIndex === missionIndex) {
      return Object
        .assign(activatedMission, mission, AVAILABLE_SLOT_MISSION_USER_HAS_HOLD_DEFAULT_PROPS);
    }
    return mission;
  });

  dispatch(grabTelescopeSlotSuccess({
    apiError: false,
    missionList: [activatedMission],
  }));

  dispatch(fetchReservationSuccess(
    Object.assign({}, reservationList, { missionList: updatedMissionList }))
  );
};
