import { ACTION } from './reducer';
import { getGalleryDetailsApi, removeImageFromGalleryApi } from './api';

export const getGalleryDetails = galleryId => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getGalleryDetails());
  const body = {
    at,
    token,
    cid,
    galleryId,
  };
  return getGalleryDetailsApi(body)
    .then(result => dispatch(ACTION.getGalleryDetailsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getGalleryDetailsError(error)));
};

export const removeImageFromGallery = ({ galleryId, customerImageId }) => (
  dispatch,
  getState
) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.removeImageFromGallery());
  const body = {
    at,
    token,
    cid,
    galleryId,
    customerImageId,
  };
  return removeImageFromGalleryApi(body)
    .then(result => dispatch(ACTION.removeImageFromGallerySuccess(result.data)))
    .then(() => getGalleryDetails(galleryId)(dispatch, getState))
    .catch(error => dispatch(ACTION.removeImageFromGalleryError(error)));
};
