import {
  getQuestOutputApi,
  getQuestStepApi,
  getDataCollectionApi,
  getDataCollectionSlotImagesApi,
  setDataCollectionSlotImageApi,
  getQaFreeFormApi,
  setQaFreeFormApi,
  getQaFillBlanksApi,
  setQaFillBlanksApi,
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

export const setDataCollectionSlotImages = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.setDataCollectionSlotImages());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return setDataCollectionSlotImageApi({ ...opts })
    .then(result =>
      dispatch(ACTION.setDataCollectionSlotImagesSuccess(result.data))
    )
    .catch(error => dispatch(ACTION.setDataCollectionSlotImagesError(error)));
};
// END: QUEST STEP PAGE


// QUEST QA MODULES
export const getQaFreeForm = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getQaFreeForm());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return getQaFreeFormApi({ ...opts })
    .then(result => dispatch(ACTION.getQaFreeFormSuccess(result.data)))
    .catch(error => dispatch(ACTION.getQaFreeFormError(error)));
};

export const setQaFreeForm = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.setQaFreeForm());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return setQaFreeFormApi({ ...opts })
    .then(result => dispatch(ACTION.setQaFreeFormSuccess(result.data)))
    .catch(error => dispatch(ACTION.setQaFreeFormError(error)));
};

export const getQaFillBlanks = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getQaFillBlanks());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return getQaFillBlanksApi({ ...opts })
    .then(result => dispatch(ACTION.getQaFillBlanksSuccess(result.data)))
    .catch(error => dispatch(ACTION.getQaFillBlanksError(error)));
};

export const setQaFillBlanks = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.setQaFillBlanks());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return setQaFillBlanksApi({ ...opts })
    .then(result => dispatch(ACTION.setQaFillBlanksSuccess(result.data)))
    .catch(error => dispatch(ACTION.setQaFillBlanksError(error)));
};
// END: QUEST QA MODULES