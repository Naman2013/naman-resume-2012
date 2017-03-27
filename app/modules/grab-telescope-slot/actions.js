import axios from 'axios';
import { cancelMissionSlot } from '../Missions';
import { fetchDateRanges } from '../mission-slots-by-telescope/mission-slot-dates-actions';

export const GRAB_TELESCOPE_START = 'GRAB_TELESCOPE_START';
export const GRAB_TELESCOPE_SUCCESS = 'GRAB_TELESCOPE_SUCCESS';
export const GRAB_TELESCOPE_FAIL = 'GRAB_TELESCOPE_FAIL';

export const CANCEL_REMAINING_MISSIONS = 'CANCEL_REMAINING_MISSIONS';
export const CANCEL_MISSION = 'CANCEL_MISSION';
export const COMMIT_UPDATED_RESERVATIONS = 'COMMIT_UPDATED_RESERVATIONS';

/**
  see documentation:
  https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/edit#
  /api/reservation/grabTelescopeSlot
  @finalizeReservation: optional | bool
  @uniqueId: required
  @scheduledMissionId: required
*/
export const grabTelescopeSlot = ({ scheduledMissionId, uniqueId, grabType, finalizeReservation }) => (dispatch, getState) => {
  const { at, cid, token } = getState().user;

  return axios.post('/api/reservation/grabTelescopeSlot', {
    at,
    cid,
    token,
    scheduledMissionId,
    uniqueId,
    grabType,
    finalizeReservation,
  })
  .then(result => dispatch(grabTelescopeSlotSuccess(result.data)))
  .catch(error => dispatch(grabTelescopeSlotFail(error)));
};

const commitUpdatedReservations = updatedMissions => ({
  type: COMMIT_UPDATED_RESERVATIONS,
  payload: updatedMissions,
});

export const grabTelescopeSlotSuccess = result => (dispatch, getState) => {
  const { apiError, missionList } = result;
  const { missionAvailable } = missionList[0];
  const currentMissions = getState().telescopeSlots;
  let updatedMissions = [];

  if (apiError) {
    console.warn('API returned error... check call to grabTelescopeSlot');
    return;
  }

  // if the mission slot is not available, refresh the list of missions
  // but do not add the mission to the state
  if (!missionAvailable) {
    dispatch(refreshListings());
    return;
  }

  if (!hasReserverationOnHold(missionList[0].uniqueId, currentMissions.missions)) {
    updatedMissions = [
      ...currentMissions.missions,
      {
        uniqueId: missionList[0].uniqueId,
        mission: result,
      }
    ];
  } else {
    updatedMissions = [...currentMissions.missions];
  }

  dispatch(commitUpdatedReservations(updatedMissions));
};

const grabTelescopeSlotFail = (error) => {
  throw error;
};

export const refreshListings = () => (dispatch, getState) => {
  const { obsId, telescopeId, domeId } = getState().missionSlotsByTelescope.reservationList;
  const { reservationDate } = getState().missionSlotDates.dateRangeResponse.dateList[0];
  if (!obsId || !telescopeId || !domeId) { return; }

  dispatch(fetchDateRanges({
    obsId,
    telescopeId,
    domeId,
    requestedDate: reservationDate,
  }));
};

export const cancelReservation = ({ uniqueId, scheduledMissionId }) => (dispatch, getState) => {
  const { telescopeSlots } = getState();
  const updatedMissions = telescopeSlots.missions.filter(missionSlot => {
    return missionSlot.mission.missionList[0].uniqueId != uniqueId;
  });

  dispatch(commitUpdatedReservations(updatedMissions));

  dispatch(cancelMissionSlot({
    uniqueId,
    scheduledMissionId,
    grabType: 'notarget',
    callSource: 'byTelescope',
  }));
};

/**
  @cancelReservationAndRefresh
  cancels a specific mission slot hold - then refreshes the list of time slots
*/
export const cancelReservationAndRefresh = ({ uniqueId, scheduledMissionId }) => (dispatch) => {
  dispatch(cancelReservation({ uniqueId, scheduledMissionId }));
  dispatch(refreshListings());
};

export const cancelAllReservations = () => (dispatch, getState) => {
  const { telescopeSlots } = getState();
  telescopeSlots.missions.forEach((heldMission) => {
    const cancelMission = heldMission.mission.missionList[0];
    const { uniqueId, scheduledMissionId } = cancelMission;
    dispatch(cancelMissionSlot({
      uniqueId,
      scheduledMissionId,
      grabType: 'notarget',
      callSource: 'byTelescope',
    }));
  });

  dispatch(commitUpdatedReservations([]));
};

export const placeOneHourHold = ({scheduledMissionId, uniqueId}) => (dispatch, getState) => {
  dispatch(grabTelescopeSlot({
    scheduledMissionId,
    uniqueId,
    grabType: 'placeholder',
  }));

  dispatch(refreshListings());
};


// helpers
export const getReservationOnHold = (uniqueId, missions) => {
  return missions.find(mission => mission.uniqueId === uniqueId);
};

const hasReserverationOnHold = (uniqueId, missions) => {
  return missions.some(mission => mission.mission.missionList[0].uniqueId === uniqueId);
};
