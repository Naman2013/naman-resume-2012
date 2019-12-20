import {
  getAllSkyTimelapseApi,
  getUpcomingSlotsByTelescopeApi,
  getFeaturedObjectsByTelescopeApi,
  reserveCommunityMissionApi,
  getTelescopesApi,
  getObservatoryListApi,
} from './api';
import { ACTION } from './reducer';

export const getAllSkyTimelapse = (obsId, widgetUniqueId) => (
  dispatch,
  getState
) => {
  const { at, token, cid } = getState().user;
  const data = {
    obsId,
    widgetUniqueId,
  };
  dispatch(ACTION.getAllSkyTimelapse());
  return getAllSkyTimelapseApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.getAllSkyTimelapseSuccess(result.data)))
    .catch(error => dispatch(ACTION.getAllSkyTimelapseError(error)));
};

export const getUpcomingSlotsByTelescope = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getUpcomingSlotsByTelescope());
  return getUpcomingSlotsByTelescopeApi({ at, token, cid, ...data })
    .then(result =>
      dispatch(ACTION.getUpcomingSlotsByTelescopeSuccess(result.data))
    )
    .catch(error => dispatch(ACTION.getUpcomingSlotsByTelescopeError(error)));
};

export const getFeaturedObjectsByTelescope = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getFeaturedObjectsByTelescope());
  return getFeaturedObjectsByTelescopeApi({ at, token, cid, ...data })
    .then(result =>
      dispatch(ACTION.getFeaturedObjectsByTelescopeSuccess(result.data))
    )
    .catch(error => dispatch(ACTION.getFeaturedObjectsByTelescopeError(error)));
};

export const reserveCommunityMission = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.reserveCommunityMission());
  return reserveCommunityMissionApi({ at, token, cid, ...data })
    .then(result =>
      dispatch(ACTION.reserveCommunityMissionSuccess(result.data))
    )
    .catch(error => dispatch(ACTION.reserveCommunityMissionError(error)));
};

export const getTelescopes = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getTelescopes());
  return getTelescopesApi({ at, token, cid })
    .then(result => dispatch(ACTION.getTelescopesSuccess(result.data)))
    .catch(error => dispatch(ACTION.getTelescopesError(error)));
};

export const getObservatoryList = ({ callSource, listType }) => (
  dispatch,
  getState
) => {
  const { at, token, cid } = getState().user;

  dispatch(ACTION.getObservatoryList());
  return getObservatoryListApi({ at, token, cid, callSource, listType })
    .then(result => {
      return dispatch(ACTION.getObservatoryListSuccess(result.data));
    })
    .catch(error => dispatch(ACTION.getObservatoryListError(error)));
};
