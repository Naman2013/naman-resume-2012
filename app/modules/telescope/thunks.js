import { getXXApi } from 'app/modules/profile/api';
import { ACTION } from './reducer';

export const getXX = customerUUID => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getXX());
  return getXXApi({ at, token, cid, customerUUID })
    .then(result => dispatch(ACTION.getXXSuccess(result.data)))
    .catch(error => dispatch(ACTION.getXXError(error)));
};
