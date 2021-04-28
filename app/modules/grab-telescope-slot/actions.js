// todo remove me

import { API } from 'app/api';
import { cancelMissionSlot } from '../missions-old';
import { fetchDateRanges } from '../mission-slots-by-telescope/mission-slot-dates-actions';
import { fetchReservationSuccess } from '../mission-slots-by-telescope/mission-slots-by-telescope-actions';
import { validateResponseAccess } from '../authorization/actions';
import grabTelescopeSlotService from '../../services/reservations/grab-telescope-slot';

// accessing the supported form tab types so we may set them accordingly
import SUPPORTED_RESERVATION_TAB_FORM_TYPES from '../../constants/supported-reservation-tab-form-types';

export const GRAB_TELESCOPE_START = 'GRAB_TELESCOPE_START';
export const GRAB_TELESCOPE_SUCCESS = 'GRAB_TELESCOPE_SUCCESS';
export const GRAB_TELESCOPE_FAIL = 'GRAB_TELESCOPE_FAIL';

export const CANCEL_REMAINING_MISSIONS = 'CANCEL_REMAINING_MISSIONS';
export const CANCEL_MISSION = 'CANCEL_MISSION';
export const COMMIT_UPDATED_RESERVATIONS = 'COMMIT_UPDATED_RESERVATIONS';

// helpers
export const getReservationOnHold = (uniqueId, missions) =>
  missions.find(mission => mission.uniqueId === uniqueId);

const hasReserverationOnHold = (uniqueId, missions) =>
  missions.some(
    mission => mission.mission.missionList[0].uniqueId === uniqueId
  );

// TODO: based on some details of the grabMissionResult - we set a default supported for tab type
const setDefaultFormView = grabTelescopeSuccessResult => {
  const { defaultFormTab } = grabTelescopeSuccessResult;
  return defaultFormTab;
};

export const commitUpdatedReservations = updatedMissions => ({
  type: COMMIT_UPDATED_RESERVATIONS,
  payload: updatedMissions,
});

// TODO: do we need to create actions to change this internally or can we assign it to internal state for now?

// TODO: run the logic that will provide the default form tab field into the
// new state object as to set the default form as it is open
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

  // if the grab was successful and the mission is not already on hold then
  // add the mission to the collection of missions the user is reviewing
  // otherwise simply return the list of missions we are tracking
  // if defaultFormTab does not exist - then add the default as BY_OBJECT
  // TODO: deprecate defaultFormTab OR how we are patching the mission
  if (
    !hasReserverationOnHold(missionList[0].uniqueId, currentMissions.missions)
  ) {
    updatedMissions = [
      ...currentMissions.missions,
      {
        uniqueId: missionList[0].uniqueId,
        defaultFormTab: setDefaultFormView(result),
        mission: Object.assign(
          {
            defaultFormType: SUPPORTED_RESERVATION_TAB_FORM_TYPES.DEFAULT_FORM,
          },
          result
        ),
      },
    ];
  } else {
    updatedMissions = [...currentMissions.missions];
  }

  dispatch(commitUpdatedReservations(updatedMissions));
};

const grabTelescopeSlotFail = error => {
  throw error;
};

/**
  see documentation:
  https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/edit#
  /api/reservation/grabTelescopeSlot
  @finalizeReservation: optional | bool
  @uniqueId: required
  @scheduledMissionId: required
*/
export const grabTelescopeSlot = ({
  defaultFormType,
  scheduledMissionId,
  uniqueId,
  grabType,
  finalizeReservation,
}) => (dispatch, getState) => {
  const { at, cid, token } = getState().user;

  return API
      .post('/api/reservation/grabTelescopeSlot', {
      at,
      cid,
      token,
      scheduledMissionId,
      uniqueId,
      grabType,
      finalizeReservation,
      buttonType: defaultFormType,
    })
    .then(result => {
      const { data } = result;
      if (data.apiError) {
        dispatch(validateResponseAccess(data));
      } else {
        dispatch(
          grabTelescopeSlotSuccess(
            Object.assign({}, result.data, { defaultFormType })
          )
        );
      }
    })
    .catch(error => dispatch(grabTelescopeSlotFail(error)));
};

/**
  @finalizeTelescopeSlot
  dealing with updating a mission with a one hour hold and converting
  it into a mission slot needing reservation
*/
export const finalizeTelescopeSlot = ({
  scheduledMissionId,
  uniqueId,
  grabType,
  finalizeReservation,
}) => (dispatch, getState) => {
  const { at, cid, token } = getState().user;
  return grabTelescopeSlotService({
    at,
    cid,
    token,
    scheduledMissionId,
    uniqueId,
    grabType: 'notarget',
    finalizeReservation: true,
  })
    .then(result => {
    
    })
    .catch(error => {
      // console.log(error)
    });
};

export const refreshListings = () => (dispatch, getState) => {
  const {
    obsId,
    telescopeId,
    domeId,
  } = getState().missionSlotsByTelescope.reservationList;
  const {
    reservationDate,
  } = getState().missionSlotDates.dateRangeResponse.dateList[0];
  if (!obsId || !telescopeId || !domeId) {
    return;
  }

  dispatch(
    fetchDateRanges({
      obsId,
      telescopeId,
      domeId,
      requestedDate: reservationDate,
    })
  );
};

export const removeMissionFromConsideration = ({ uniqueId }) => (
  dispatch,
  getState
) => {
  const { telescopeSlots } = getState();
  const updatedMissions = telescopeSlots.missions.filter(
    missionSlot => missionSlot.uniqueId !== uniqueId
  );

  dispatch(commitUpdatedReservations(updatedMissions));
};

/**
  @changeFormType: responsible for changing the selected form type in state
  associated with a specific mission
  */
export const changeFormType = ({ formType, uniqueId }) => (
  dispatch,
  getState
) => {
  const { telescopeSlots } = getState();

  const updatedMissions = telescopeSlots.missions.map(missionSlot => {
    if (missionSlot.uniqueId === uniqueId) {
      return Object.assign({}, missionSlot, {
        mission: Object.assign({}, missionSlot.mission, {
          defaultFormType: formType,
        }),
      });
    }
    return missionSlot;
  });
  dispatch(commitUpdatedReservations(updatedMissions));
};

export const cancelReservation = ({
  uniqueId,
  scheduledMissionId,
}) => dispatch => {
  dispatch(removeMissionFromConsideration({ uniqueId }));

  dispatch(
    cancelMissionSlot({
      uniqueId,
      scheduledMissionId,
      grabType: 'notarget',
      callSource: 'byTelescope',
    })
  );
};

export const cancelEditCoordinateMission = ({ uniqueId }) => dispatch => {
  dispatch(removeMissionFromConsideration({ uniqueId }));
  dispatch(refreshListings());
};

export const cancelEditMission = ({ uniqueId, missionIndex }) => (
  dispatch,
  getState
) => {
  dispatch(removeMissionFromConsideration({ uniqueId }));

  // revert the mission slot back to its state before we started editing it...
  const {
    reservationList,
    reservationList: { missionList },
  } = getState().missionSlotsByTelescope;
  const updatedMission = Object.assign(missionList[missionIndex], {
    slotStatus: 'reserved',
  });

  // if we have the mission, lets create a new object with the reversed props to convert it
  const updatedMissionList = missionList.map(mission => {
    if (mission.missionIndex === missionIndex) {
      return updatedMission;
    }
    return mission;
  });

  // this commits the updated list of missions to state
  dispatch(
    fetchReservationSuccess(
      Object.assign({}, reservationList, { missionList: updatedMissionList })
    )
  );
};

/**
  @cancelReservationAndRefresh
  cancels a specific mission slot hold - then refreshes the list of time slots
*/
export const cancelReservationAndRefresh = ({
  uniqueId,
  scheduledMissionId,
}) => dispatch => {
  dispatch(cancelReservation({ uniqueId, scheduledMissionId }));
  dispatch(refreshListings());
};

export const cancelAllReservations = () => (dispatch, getState) => {
  const { telescopeSlots } = getState();
  telescopeSlots.missions.forEach(heldMission => {
    const cancelMission = heldMission.mission.missionList[0];
    const { uniqueId, scheduledMissionId } = cancelMission;
    dispatch(
      cancelMissionSlot({
        uniqueId,
        scheduledMissionId,
        grabType: 'notarget',
        callSource: 'byTelescope',
      })
    );
  });

  dispatch(commitUpdatedReservations([]));
};

export const placeOneHourHold = ({ scheduledMissionId, uniqueId }) => (
  dispatch,
  getState
) => {
  dispatch(
    grabTelescopeSlot({
      scheduledMissionId,
      uniqueId,
      grabType: 'placeholder',
    })
  );

  dispatch(refreshListings());
};
