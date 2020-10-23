import { ACTION } from './reducer';
import {
  getGalleryDetailsApi,
  removeImageFromGalleryApi,
  deleteGalleryApi,
  renameGalleryApi,
} from './api';

export const getGalleryDetails = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getGalleryDetails());
  const body = {
    at,
    token,
    cid,
    ...data,
  };
  return getGalleryDetailsApi(body)
    .then(result => dispatch(ACTION.getGalleryDetailsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getGalleryDetailsError(error)));
};

export const renameGallery = ({ galleryId, title }) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const body = {
    at,
    token,
    cid,
    galleryId,
    title,
  };
  return renameGalleryApi(body)
    .then(result => dispatch(ACTION.renameGallerySuccess(result.data)))
    .catch(error => dispatch(ACTION.renameGalleryError(error)));
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

export const deleteGallery = ({ galleryId }) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.deleteGallery());
  const body = {
    at,
    token,
    cid,
    galleryId,
  };
  return deleteGalleryApi(body)
    .then(result => dispatch(ACTION.deleteGallerySuccess(result.data)))
    .then(() => getGalleryDetails(galleryId)(dispatch, getState))
    .catch(error => dispatch(ACTION.deleteGalleryError(error)));
};
