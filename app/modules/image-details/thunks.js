import {
  deleteImageApi,
  getImageDetailsApi,
  getTagsApi,
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

// TAGS
export const getTags = data => (dispatch, getState) => {
  const { customerImageId, tagClass = 'image', tagType = 'user' } = data;
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getTags());
  return getTagsApi({ at, token, cid, customerImageId, tagClass, tagType })
    .then(result => dispatch(ACTION.getTagsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getTagsError(error)));
};
