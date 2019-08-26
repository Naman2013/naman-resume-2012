import {
  addImageToGalleryApi,
  createGalleryApi,
  deleteImageApi,
  deleteTagApi,
  getGalleriesApi,
  getImageDetailsApi,
  getTagsApi,
  setTagApi,
  setObservationTagsApi,
} from 'app/modules/image-details/api';
import { ACTION } from './reducer';

export const getImageDetails = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getImageDetails());
  return getImageDetailsApi({ at, token, cid, ...data })
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
  const {
    objectId: customerImageId,
    tagClass = 'image',
    tagType = 'user',
  } = data;
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getTags());
  return getTagsApi({ at, token, cid, customerImageId, tagClass, tagType })
    .then(result => dispatch(ACTION.getTagsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getTagsError(error)));
};

export const setTag = data => (dispatch, getState) => {
  const {
    objectId: customerImageId,
    text,
    tagClass = 'image',
    tagType = 'user',
  } = data;
  const { at, token, cid } = getState().user;
  dispatch(ACTION.setTag());
  return setTagApi({ at, token, cid, customerImageId, tagClass, tagType, text })
    .then(result => dispatch(ACTION.setTagSuccess(result.data)))
    .catch(error => dispatch(ACTION.setTagError(error)));
};

export const deleteTag = data => (dispatch, getState) => {
  const {
    objectId: customerImageId,
    text,
    tagClass = 'image',
    tagType = 'user',
  } = data;
  const { at, token, cid } = getState().user;
  dispatch(ACTION.deleteTag());
  return deleteTagApi({
    at,
    token,
    cid,
    customerImageId,
    tagClass,
    tagType,
    text,
  })
    .then(result => dispatch(ACTION.deleteTagSuccess(result.data)))
    .catch(error => dispatch(ACTION.deleteTagError(error)));
};

// GALLERIES
export const getGalleries = data => (dispatch, getState) => {
  const {
    firstGalleryNumber = 1,
    maxGalleryCount = 6,
    pagingMode = 'app',
  } = data;

  const { at, token, cid } = getState().user;
  dispatch(ACTION.getGalleries());
  return getGalleriesApi({
    at,
    token,
    cid,
    firstGalleryNumber,
    maxGalleryCount,
    pagingMode,
  })
    .then(result => dispatch(ACTION.getGalleriesSuccess(result.data)))
    .catch(error => dispatch(ACTION.getGalleriesError(error)));
};

export const addImageToGallery = (customerImageId, galleryId) => (
  dispatch,
  getState
) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.addImageToGallery());
  return addImageToGalleryApi({
    at,
    token,
    cid,
    customerImageId,
    galleryId,
  })
    .then(result => dispatch(ACTION.addImageToGallerySuccess(result.data)))
    .catch(error => dispatch(ACTION.addImageToGalleryError(error)));
};

export const createGallery = title => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.createGallery());
  return createGalleryApi({
    at,
    token,
    cid,
    title,
  })
    .then(result => dispatch(ACTION.createGallerySuccess(result.data)))
    .catch(error => dispatch(ACTION.createGalleryError(error)));
};

export const setObservationTags = (
  customerImageId,
  scheduledMissionId,
  title,
  text
) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.setObservationTags());
  return setObservationTagsApi({
    at,
    token,
    cid,
    customerImageId,
    scheduledMissionId,
    title,
    text,
  })
    .then(result => dispatch(ACTION.setObservationTagsSuccess(result.data)))
    .catch(error => dispatch(ACTION.setServerError(error)));
};
