import { ACTION } from './reducer';
import { getMissionDetailsApi } from './api';

export const getMissionDetails = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissionDetails());
  const body = { at, token, cid, viewType: 'missions' };
  return getMissionDetailsApi(body)
    .then(result => dispatch(ACTION.getMissionDetailsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getMissionDetailsError(error)));
};
