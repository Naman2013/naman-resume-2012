import { getAllSkyTimelapseApi } from './api';
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
