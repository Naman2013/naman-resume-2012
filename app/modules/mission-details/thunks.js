import {
  deleteTagApi,
  getTagsApi,
  setTagApi,
  getMissionDetailsApi,
} from 'app/modules/mission-details/api';
import { ACTION } from './reducer';

export const getMissionDetails = missionId => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getMissionDetails());
  const body = {
    at,
    token,
    cid,
    viewType: 'missions',
    scheduledMissionId: missionId,
  };
  return getMissionDetailsApi(body)
    .then(result => dispatch(ACTION.getMissionDetailsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getMissionDetailsError(error)));
};

// TAGS
export const getTags = data => (dispatch, getState) => {
  const {
    objectId: scheduledMissionId,
    tagClass = 'mission',
    tagType = 'user',
  } = data;
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getTags());
  return getTagsApi({ at, token, cid, scheduledMissionId, tagClass, tagType })
    .then(result => dispatch(ACTION.getTagsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getTagsError(error)));
};

export const setTag = data => (dispatch, getState) => {
  const {
    objectId: scheduledMissionId,
    text,
    tagClass = 'mission',
    tagType = 'user',
  } = data;
  const { at, token, cid } = getState().user;
  dispatch(ACTION.setTag());
  return setTagApi({
    at,
    token,
    cid,
    scheduledMissionId,
    tagClass,
    tagType,
    text,
  })
    .then(result => dispatch(ACTION.setTagSuccess(result.data)))
    .catch(error => dispatch(ACTION.setTagError(error)));
};

export const deleteTag = data => (dispatch, getState) => {
  const {
    objectId: scheduledMissionId,
    text,
    tagClass = 'mission',
    tagType = 'user',
  } = data;
  const { at, token, cid } = getState().user;
  dispatch(ACTION.deleteTag());
  return deleteTagApi({
    at,
    token,
    cid,
    scheduledMissionId,
    tagClass,
    tagType,
    text,
  })
    .then(result => dispatch(ACTION.deleteTagSuccess(result.data)))
    .catch(error => dispatch(ACTION.deleteTagError(error)));
};
