/* eslint-disable */
import { getPublicProfileApi } from 'app/modules/public-profile/api';
import { ACTION } from './reducer';

export const getPublicProfile = () => (dispatch, getState) => {
  console.log('getPublicProfile thunk');
  // const { at, token, cid } = getState().user;
  dispatch(ACTION.getPublicProfile());
  return getPublicProfileApi()
    .then(result => dispatch(ACTION.getPublicProfileSuccess(result.data)))
    .catch(error => dispatch(ACTION.getPublicProfileError(error)));
};
