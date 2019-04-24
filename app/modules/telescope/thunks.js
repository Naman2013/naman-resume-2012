import {
  getAllSkyTimelapseApi,
  getUpcomingSlotsByTelescopeApi,
  getFeaturedObjectsByTelescopeApi,
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
