import { getImageDetailsApi } from 'app/modules/image-details/api';
import { ACTION } from './reducer';

export const getImageDetails = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getImageDetails());
  return getImageDetailsApi({ at, token, cid })
    .then(result => dispatch(ACTION.getImageDetailsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getImageDetailsError(error)));
};
