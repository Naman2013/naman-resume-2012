import {
  getCategoryListApi,
  getMissionsApi,
  getObservatoryListApi,
  getObjectListApi,
  getBySlooh1000Api,
  getMissionSlotApi,
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
  requestedDate = ''
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

export const setTelescope = telescope => dispatch => {
  dispatch(ACTION.setTelescope(telescope));
  dispatch(getMissionSlotDates(telescope));
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
export const getMissions = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissions());
  return getMissionsApi({ at, token, cid })
    .then(result => dispatch(ACTION.getMissionsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getMissionsError(error)));
};

export const getMissionSlot = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissionSlot());
  return getMissionSlotApi({ at, token, cid, ...data })
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
    .then(result => dispatch(ACTION.getObjectListSuccess(result.data)))
    .catch(error => dispatch(ACTION.getObjectListError(error)));
};

// by Constellation
export const getConstellationList = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getConstellationList());
  return getConstellationListApi({
    at,
    token,
    cid,
    callSource: 'byConstellationV4',
  })
    .then(result => dispatch(ACTION.getConstellationListSuccess(result.data)))
    .catch(error => dispatch(ACTION.getConstellationListError(error)));
};

export const getConstellationObjectList = constellationName => (
  dispatch,
  getState
) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getConstellationObjectList());
  return getConstellationObjectListApi({
    at,
    token,
    cid,
    callSource: 'byConstellationV4',
    constellationName,
  })
    .then(result =>
      dispatch(ACTION.getConstellationObjectListSuccess(result.data))
    )
    .catch(error => dispatch(ACTION.getConstellationObjectListError(error)));
};

export const setConstellation = constellationName => dispatch => {
  dispatch(ACTION.setConstellation(constellationName));
  dispatch(getConstellationObjectList(constellationName));
};

// by Catalog
export const getCatalogList = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getCatalogList());
  return getCatalogListApi({ at, token, cid, callSource: 'byPopularObjects' })
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
