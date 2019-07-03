import {
  getQuestOutputApi,
  getQuestStepApi,
  getDataCollectionApi,
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
// END: QUEST STEP PAGE
