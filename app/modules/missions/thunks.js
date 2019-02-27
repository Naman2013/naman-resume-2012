import {
  getCategoryListApi,
  getMissionsApi,
  getObservatoryListApi,
} from 'app/modules/missions/api';
import { ACTION } from './reducer';

export const getMissions = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissions());
  return getMissionsApi({ at, token, cid })
    .then(result => dispatch(ACTION.getMissionsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getMissionsError(error)));
};

export const getCategoryList = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getCategoryList());
  // todo is callSource hardcoded here?
  return getCategoryListApi({ at, token, cid, callSource: 'byPopularObjects' })
    .then(result => dispatch(ACTION.getCategoryListSuccess(result.data)))
    .catch(error => dispatch(ACTION.getCategoryListError(error)));
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
    .then(result => dispatch(ACTION.getObservatoryListSuccess(result.data)))
    .catch(error => dispatch(ACTION.getObservatoryListError(error)));
};
