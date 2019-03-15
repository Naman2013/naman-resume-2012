import { getAllSkyTimelapseApi } from './api';
import { ACTION } from './reducer';

export const getAllSkyTimelapse = obsId => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const data = {
    obsId: 'teide',
    widgetUniqueId: '6129d5bd-1e22-11e8-b25c-0ead66939e4e',
  };
  dispatch(ACTION.getAllSkyTimelapse());
  return getAllSkyTimelapseApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.getAllSkyTimelapseSuccess(result.data)))
    .catch(error => dispatch(ACTION.getAllSkyTimelapseError(error)));
};
