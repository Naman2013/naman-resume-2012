import axios from 'axios';
import { grabTelescopeSlotSuccess } from '../grab-telescope-slot/actions';
import fetchMissionSlot from '../../services/reservations/get-mission-slot';
import { AVAILABLE_SLOT_MISSION_USER_HAS_HOLD_DEFAULT_PROPS } from './constants';
import SUPPORTED_RESERVATION_TAB_FORM_TYPES from '../../constants/supported-reservation-tab-form-types';

export const FETCH_MISSION_SLOTS_START = 'FETCH_MISSION_SLOTS_START';
export const FETCH_MISSION_SLOTS_SUCCESS = 'FETCH_MISSIONS_SLOTS_SUCCESS';
export const FETCH_MISSION_SLOTS_FAIL = 'FETCH_MISSION_SLOTS_FAIL';

export const fetchReservationSuccess = payload => ({
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

// when a user opts to begin completing their reservation, we update the reservation list
// with a NEW object that has the properties needed to render the UI for continuing on
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
    Object.assign({}, reservationList, { missionList: updatedMissionList })),
  );
};

/**
  Starting to edit a coordinate mission requires us to have to manually change
  data we had originally received from the API with properties the API would
  have set if it had supported the functionality.

  Reason is that the API was designed in such a way that the bindings and display
  of certain page elements were determined by the API team, so by emulating the
  same model as close as possible ideally will reduce introducing additional
  patterns as to how state of the reservations is maintained.
  */
export const editCoordinateMission = missionIndex => (dispatch, getState) => {
  const { missionSlotsByTelescope, user, missionSlotDates } = getState();
  const {
    reservationList,
    reservationList: {
      missionList,
      obsId,
      domeId,
    },
  } = missionSlotsByTelescope;
  const reservationDate = missionSlotDates.dateRangeResponse.dateList[0].reservationDate;
  const { cid, at, token } = user;
  const editMission = missionList[missionIndex];

  // fetch the coordinate missions information
  return fetchMissionSlot({
    cid,
    at,
    token,
    obsId,
    domeId,
    reservationDate,
    scheduledMissionId: editMission.scheduledMissionId,
  }).then((result) => {
    /**
      - gather the information about the mission we need to update
      - patch the response from getMissionSlot into a new object that we will
        use to keep track of the mission
      - update the reservation list in memory with the new mission object so it
        will be reflected in the UI
      */
    const modifiedMissionResult = Object.assign({},
      result.data.missionList[0],
      {
        slotStatus: 'available',
        missionAvailable: true,
        missionIndex,
      });

    const patchedMission =
      Object.assign({}, result.data, { missionList: [modifiedMissionResult], defaultFormTab: SUPPORTED_RESERVATION_TAB_FORM_TYPES.BY_COORDINATE});

    /**
      create a new mission list that includes the modfied mission to render in the list
      we want to ensure to preserve the original state as much as possible as to not
      lose information we may need later
      */
    const updatedMissionList = missionList.map((mission) => {
      if (mission.missionIndex === missionIndex) {
        return Object.assign(mission, modifiedMissionResult);
      }
      return mission;
    });

    // this adds the mission to the list of missions that the user is considering
    dispatch(
      grabTelescopeSlotSuccess(patchedMission),
    );

    // this commits the updated list of missions to state
    dispatch(fetchReservationSuccess(
      Object.assign({}, reservationList, { missionList: updatedMissionList })),
    );
  });
};
