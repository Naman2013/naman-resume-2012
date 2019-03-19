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
} from 'app/modules/missions/api';
import { ACTION } from './reducer';

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

export const getCategoryList = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getCategoryList());
  // todo is callSource hardcoded here?
  return getCategoryListApi({ at, token, cid, callSource: 'byPopularObjects' })
    .then(result => dispatch(ACTION.getCategoryListSuccess(result.data)))
    .catch(error => dispatch(ACTION.getCategoryListError(error)));
};

export const getObjectList = ({ categorySlug, includeDescription = true }) => (
  dispatch,
  getState
) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getObjectList());
  return getObjectListApi({
    at,
    token,
    cid,
    callSource: 'byPopularObjects',
    includeDescription,
    categorySlug,
  })
    .then(result => dispatch(ACTION.getObjectListSuccess(result.data)))
    .catch(error => dispatch(ACTION.getObjectListError(error)));
};

export const setCategory = category => dispatch => {
  dispatch(ACTION.setCategory(category));
  dispatch(getObjectList({ categorySlug: category }));
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

// by telescope
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
    .then(result => dispatch(ACTION.getObservatoryListSuccess(result.data)))
    .catch(error => dispatch(ACTION.getObservatoryListError(error)));
};

export const setTelescope = telescope => dispatch => {
  dispatch(ACTION.setTelescope(telescope));
  //get something here
};
