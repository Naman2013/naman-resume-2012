import {
  deleteImageApi,
  getImageDetailsApi,
} from 'app/modules/image-details/api';
import { ACTION } from './reducer';

export const getImageDetails = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getImageDetails());
  return getImageDetailsApi({ at, token, cid })
    .then(result => dispatch(ACTION.getImageDetailsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getImageDetailsError(error)));
};

export const deleteImage = customerImageId => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.deleteImage());
  return deleteImageApi({ at, token, cid, customerImageId })
    .then(result => dispatch(ACTION.deleteImageSuccess(result.data)))
    .catch(error => dispatch(ACTION.deleteImageError(error)));
};
