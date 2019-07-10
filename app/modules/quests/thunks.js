import {
  getQuestOutputApi,
  getQuestStepApi,
  getDataCollectionApi,
  getDataCollectionSlotImagesApi,
  setDataCollectionImageApi,
} from 'app/modules/quests/api';
import { ACTION } from './reducer';

// QUEST STEP PAGE
export const getQuestStep = (questId, stepModuleId) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getQuestStep());
  const opts = {
    at,
    cid,
    token,
    questId,
    stepModuleId,
  };
  return getQuestStepApi({ ...opts })
    .then(result => dispatch(ACTION.getQuestStepSuccess(result.data)))
    .catch(error => dispatch(ACTION.getQuestStepError(error)));
};

export const getQuestOutput = (questId, moduleId) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getQuestOutput());
  const opts = {
    at,
    cid,
    token,
    questId,
    moduleId,
  };
  return getQuestOutputApi({ ...opts })
    .then(result => dispatch(ACTION.getQuestOutputSuccess(result.data)))
    .catch(error => dispatch(ACTION.getQuestOutputError(error)));
};

export const getDataCollection = (questId, moduleId) => (
  dispatch,
  getState
) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getDataCollection());
  const opts = {
    at,
    cid,
    token,
    questId,
    moduleId,
  };
  return getDataCollectionApi({ ...opts })
    .then(result => dispatch(ACTION.getDataCollectionSuccess(result.data)))
    .catch(error => dispatch(ACTION.getDataCollectionError(error)));
};

export const getDataCollectionSlotImages = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getDataCollectionSlotImages());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return getDataCollectionSlotImagesApi({ ...opts })
    .then(result =>
      dispatch(ACTION.getDataCollectionSlotImagesSuccess(result.data))
    )
    .catch(error => dispatch(ACTION.getDataCollectionSlotImagesError(error)));
};

export const setDataCollectionImages = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.setDataCollectionImages());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return setDataCollectionImageApi({ ...opts })
    .then(result =>
      dispatch(ACTION.setDataCollectionImagesSuccess(result.data))
    )
    .catch(error => dispatch(ACTION.setDataCollectionImagesError(error)));
};
// END: QUEST STEP PAGE
