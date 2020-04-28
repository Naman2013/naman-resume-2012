import {
  getCategoryListApi,
  getMissionsApi,
  getObservatoryListApi,
  getObjectListApi,
  getBySlooh1000Api,
  grabMissionSlotApi,
  reserveMissionSlotApi,
  getCatalogListApi,
  checkCatalogVisibilityApi,
  getPresetOptionsApi,
  cancelMissionSlotApi,
  getConstellationListApi,
  getConstellationObjectListApi,
  getMissionListApi,
  getMissionSlotDatesApi,
  getMissionSlotsByTelescopeApi,
  getTelescopeSlotApi,
  checkTargetVisibilityApi,
  getCoordinatesCategoryListApi,
  grabPiggybackApi,
  reservePiggybackApi,
  getMissionSlotApi,
  grabUpdatedSlotApi,
  updateMissionSlotApi,
  cancelReservationApi,
  cancelPiggybackApi,
} from 'app/modules/missions/api';
import { ACTION } from './reducer';
import {
  makeTelescopeSelectedTelescopeSelector,
  makeTelescopeSelectedDateSelector,
} from './selectors';

// by telescope
export const getMissionSlotsByTelescope = (
  { obsId, telescopeId, domeId },
  { reservationDate }
) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissionSlotsByTelescope());
  return getMissionSlotsByTelescopeApi({
    at,
    token,
    cid,
    domeId,
    obsId,
    telescopeId,
    reservationDate,
  })
    .then(result =>
      dispatch(ACTION.getMissionSlotsByTelescopeSuccess(result.data))
    )
    .catch(error => dispatch(ACTION.getMissionSlotsByTelescopeError(error)));
};

export const getMissionSlotDates = (
  { obsId, telescopeId, domeId },
  requestedDate = '', callSource
) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissionSlotDates());
  return getMissionSlotDatesApi({
    at,
    token,
    cid,
    domeId,
    obsId,
    telescopeId,
    requestedDate,
    callSource,
  })
    .then(result => {
      dispatch(ACTION.getMissionSlotDatesSuccess(result.data));

      const selectedTelescope = makeTelescopeSelectedTelescopeSelector()(
        getState()
      );
      const selectedDate = makeTelescopeSelectedDateSelector()(getState());
      dispatch(getMissionSlotsByTelescope(selectedTelescope, selectedDate));
    })
    .catch(error => dispatch(ACTION.getMissionSlotDatesError(error)));
};

export const getObservatoryList = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getObservatoryList());
  return getObservatoryListApi({
    at,
    token,
    cid,
    callSource: 'byTelescope',
    listType: 'full',
    status: 'live',
  })
    .then(result => {
      dispatch(ACTION.getObservatoryListSuccess(result.data));

      const selectedTelescope = makeTelescopeSelectedTelescopeSelector()(
        getState()
      );
      dispatch(getMissionSlotDates(selectedTelescope));
    })
    .catch(error => dispatch(ACTION.getObservatoryListError(error)));
};

export const getMissionList = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissionList());
  return getMissionListApi({
    at,
    token,
    cid,
    ...data,
  })
    .then(result => dispatch(ACTION.getMissionListSuccess(result.data)))
    .catch(error => dispatch(ACTION.getMissionListError(error)));
};

export const setTelescope = (telescope, getMissions) => (
  dispatch,
  getState
) => {
  dispatch(ACTION.setTelescope(telescope));
  const selectedDate = makeTelescopeSelectedDateSelector()(getState());
  if (getMissions) {
    dispatch(getMissionSlotDates(telescope, selectedDate.reservationDate));
  }
};

export const setTelescopeDate = ({
  teleUniqueId,
  startTimestamp,
  endTimestamp,
}) => dispatch => {
  dispatch(ACTION.setTelescopeDate(startTimestamp));
  dispatch(
    getMissionList({
      teleUniqueId,
      startTimestamp,
      endTimestamp,
      requestType: 'byFullDay',
    })
  );
};

export const getTelescopeSlot = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissionSlot());
  return getTelescopeSlotApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.getTelescopeSlotSuccess(result.data)))
    .catch(error => dispatch(ACTION.getTelescopeSlotError(error)));
};

// missions
export const getMissions = (callSource) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissions());
  return getMissionsApi({ at, token, cid, callSource })
    .then(result => dispatch(ACTION.getMissionsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getMissionsError(error)));
};

export const getMissionSlot = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissionSlot());
  return grabMissionSlotApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.getMissionSlotSuccess(result.data)))
    .catch(error => dispatch(ACTION.getMissionSlotError(error)));
};

export const reserveMissionSlot = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.reserveMissionSlot());
  return reserveMissionSlotApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.reserveMissionSlotSuccess(result.data)))
    .catch(error => dispatch(ACTION.reserveMissionSlotError(error)));
};

export const cancelMissionSlot = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.cancelMissionSlot());
  return cancelMissionSlotApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.cancelMissionSlotSuccess(result.data)))
    .catch(error => dispatch(ACTION.cancelMissionSlotError(error)));
};

export const cancelReservation = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.cancelReservation());
  return cancelReservationApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.cancelReservationSuccess(result.data)))
    .catch(error => dispatch(ACTION.cancelReservationError(error)));
};

// by Slooh 1000
export const getBySlooh1000 = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getBySlooh1000());
  return getBySlooh1000Api({ at, token, cid })
    .then(result => dispatch(ACTION.getBySlooh1000Success(result.data)))
    .catch(error => dispatch(ACTION.getBySlooh1000Error(error)));
};

export const getCategoryList = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getCategoryList());
  return getCategoryListApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.getCategoryListSuccess(result.data)))
    .catch(error => dispatch(ACTION.getCategoryListError(error)));
};

export const getObjectList = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getObjectList());
  return getObjectListApi({
    at,
    token,
    cid,
    ...data,
  })
    .then(result => {
      if (!result.data.apiError) {
        return dispatch(ACTION.getObjectListSuccess(result.data));
      }
      return dispatch(ACTION.getObjectListError(error));
    })
    .catch(error => dispatch(ACTION.getObjectListError(error)));
};

// by Constellation
export const getConstellationList = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getConstellationList());
  return getConstellationListApi({
    at,
    token,
    cid,
    ...data,
  })
    .then(result => dispatch(ACTION.getConstellationListSuccess(result.data)))
    .catch(error => dispatch(ACTION.getConstellationListError(error)));
};

export const getConstellationObjectList = (constellationName, data) => (
  dispatch,
  getState
) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getConstellationObjectList());
  return getConstellationObjectListApi({
    at,
    token,
    cid,
    ...data,
    constellationName,
  })
    .then(result =>
      dispatch(ACTION.getConstellationObjectListSuccess(result.data))
    )
    .catch(error => dispatch(ACTION.getConstellationObjectListError(error)));
};

export const setConstellation = (constellationName, data) => dispatch => {
  dispatch(ACTION.setConstellation(constellationName));
  dispatch(getConstellationObjectList(constellationName, data));
};

// by Catalog
export const getCatalogList = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getCatalogList());
  return getCatalogListApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.getCatalogListSuccess(result.data)))
    .catch(error => dispatch(ACTION.getCatalogListError(error)));
};

export const getPresetOptions = telescopeId => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getPresetOptions());
  return getPresetOptionsApi({ at, token, cid, telescopeId })
    .then(result => dispatch(ACTION.getPresetOptionsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getPresetOptionsError(error)));
};

export const checkCatalogVisibility = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.checkCatalogVisibility());
  return checkCatalogVisibilityApi({ at, token, cid, ...data })
    .then(result => {
      dispatch(ACTION.checkCatalogVisibilitySuccess(result.data));
      if (result.data.objectIsVisible) {
        dispatch(getPresetOptions(result.data.telescopeId));
      }
    })
    .catch(error => dispatch(ACTION.checkCatalogVisibilityError(error)));
};

//coordinates
export const checkTargetVisibility = (data, telescopeId, getPresetOptionsFlag = true) => (
  dispatch,
  getState
) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.checkTargetVisibility());
  return checkTargetVisibilityApi({ at, token, cid, ...data })
    .then(result => {
      dispatch(ACTION.checkTargetVisibilitySuccess(result.data));
      if (result.data.objectIsVisible && getPresetOptionsFlag) {
        dispatch(getPresetOptions(telescopeId));
      }
      return result;
    })
    .catch(error => dispatch(ACTION.checkTargetVisibilityError(error)));
};

export const getCoordinatesCategoryList = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { byCoordinates, byTelescope, } = getState().missions;
  dispatch(ACTION.getCoordinatesCategoryList());
  return getCoordinatesCategoryListApi({ at, token, cid })
    .then(result => {
        dispatch(ACTION.getCoordinatesCategoryListSuccess(result.data));
        if (byCoordinates?.objectType) {
          dispatch(getPresetOptions(byTelescope?.selectedTelescope?.telescopeId));
        }
      }
    )
    .catch(error => dispatch(ACTION.getCoordinatesCategoryListError(error)));
};

// Piggyback missions

export const grabPiggyback = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.grabPiggyback());
  return grabPiggybackApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.grabPiggybackSuccess(result.data)))
    .catch(error => dispatch(ACTION.grabPiggybackError(error)));
};

export const reservePiggyback = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.reservePiggyback());
  return reservePiggybackApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.reservePiggybackSuccess(result.data)))
    .catch(error => dispatch(ACTION.reservePiggybackError(error)));
};

export const cancelPiggyback = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.cancelPiggyback());
  return cancelPiggybackApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.cancelPiggybackSuccess(result.data)))
    .catch(error => dispatch(ACTION.cancelPiggybackError(error)));
};

// Edit coordinates
export const getMissionSlotEdit = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissionSlotEdit());
  return getMissionSlotApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.getMissionSlotEditSuccess(result.data)))
    .catch(error => dispatch(ACTION.getMissionSlotEditError(error)));
};

export const grabUpdatedSlot = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.grabUpdatedSlot());
  return grabUpdatedSlotApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.grabUpdatedSlotSuccess(result.data)))
    .catch(error => dispatch(ACTION.grabUpdatedSlotError(error)));
};

export const updateMissionSlot = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.updateMissionSlot());
  return updateMissionSlotApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.updateMissionSlotSuccess(result.data)))
    .catch(error => dispatch(ACTION.updateMissionSlotError(error)));
};
