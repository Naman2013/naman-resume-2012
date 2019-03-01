import {
  getCategoryListApi,
  getMissionsApi,
  getObservatoryListApi,
  getObjectListApi,
  getBySlooh1000Api,
  getMissionSlotApi,
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
  dispatch(ACTION.getCategoryList());
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
