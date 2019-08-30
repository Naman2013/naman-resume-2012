import { getFitsDataApi, deleteTagApi, getTagsApi, setTagApi, uploadToMyPicturesPageApi } from './api';
import { ACTION } from './reducer';

export const getFitsData = scheduledMissionId => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getFitsData());
  return getFitsDataApi({ at, token, cid, scheduledMissionId })
    .then(result => dispatch(ACTION.getFitsDataSuccess(result.data)))
    .catch(error => dispatch(ACTION.getFitsDataError(error)));
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

export const setTag = data => (dispatch, getState) => {
  const { customerImageId, text, tagClass = 'image', tagType = 'user' } = data;
  const { at, token, cid } = getState().user;
  dispatch(ACTION.setTag());
  return setTagApi({ at, token, cid, customerImageId, tagClass, tagType, text })
    .then(result => dispatch(ACTION.setTagSuccess(result.data)))
    .catch(error => dispatch(ACTION.setTagError(error)));
};

export const deleteTag = data => (dispatch, getState) => {
  const { customerImageId, text, tagClass = 'image', tagType = 'user' } = data;
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

export const uploadToMyPicturesPage = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.uploadToMyPicturesPage());
  return uploadToMyPicturesPageApi({
    at,
    token,
    cid,
  })
    .then(result => dispatch(ACTION.uploadToMyPicturesPageSuccess(result.data)))
    .catch(error => dispatch(ACTION.uploadToMyPicturesPageError(error)));
};
