import {
  getPublicProfileApi,
  getPrivateProfileApi,
} from 'app/modules/profile/api';
import { ACTION } from './reducer';

export const getPublicProfile = customerUUID => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getPublicProfile());
  return getPublicProfileApi({ at, token, cid, customerUUID })
    .then(result => dispatch(ACTION.getPublicProfileSuccess(result.data)))
    .catch(error => dispatch(ACTION.getPublicProfileError(error)));
};

export const getPrivateProfile = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getPrivateProfile());
  return getPrivateProfileApi({ at, token, cid })
    .then(result => dispatch(ACTION.getPrivateProfileSuccess(result.data)))
    .catch(error => dispatch(ACTION.getPrivateProfileError(error)));
};
