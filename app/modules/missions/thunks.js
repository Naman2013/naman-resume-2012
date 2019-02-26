/* eslint-disable */
import { getMissionsApi } from 'app/modules/missions/api';
import { ACTION } from './reducer';

export const getMissions = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  // const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissions());
  return getMissionsApi({at, token, cid})
    .then(result => dispatch(ACTION.getMissionsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getMissionsError(error)));
};
