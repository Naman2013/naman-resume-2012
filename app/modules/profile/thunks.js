/* eslint-disable */
import { getPublicProfileApi } from 'app/modules/profile/api';
import { ACTION } from './reducer';

export const getPublicProfile = (customerUUID) => (dispatch, getState) => {
  console.log('getPublicProfile thunk');
  const { at, token, cid } = getState().user;
  // const { at, token, cid } = getState().user;
  dispatch(ACTION.getPublicProfile());
  // const customerUUID = 'e5c84952-296f-11e9-8906-0e38ff68ce36';
  return getPublicProfileApi({at, token, cid, customerUUID})
    .then(result => dispatch(ACTION.getPublicProfileSuccess(result.data)))
    .catch(error => dispatch(ACTION.getPublicProfileError(error)));
};
