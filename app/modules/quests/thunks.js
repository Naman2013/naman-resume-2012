import {
  getQuestOutputApi,
  getQuestStepApi,
  getQuestCompletedApi,
  getDataCollectionApi,
  getDataCollectionSlotImagesApi,
  setDataCollectionSlotImageApi,
  getQaFreeFormApi,
  setQaFreeFormApi,
  getQaFillBlanksApi,
  setQaFillBlanksApi,
  getQaMultipleChoiceApi,
  setQaMultipleChoiceApi,
  getQuestGuidePanelApi,
  getCustomerQuestsApi,
  setQuestCompletedApi,
  getAnimationApi,
  getAnimationFramesApi,
  getRichTextInputModuleApi,
  setRichTextInputModuleApi,
} from 'app/modules/quests/api';
import { browserHistory } from 'react-router';
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

export const getQuestCompleted = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getQuestCompleted());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return getQuestCompletedApi({ ...opts })
    .then(result => dispatch(ACTION.getQuestCompletedSuccess(result.data)))
    .catch(error => dispatch(ACTION.getQuestCompletedError(error)));
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

export const setQuestCompleted = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.setQuestCompleted());
  const { questId, moduleId, callSetQuestCompleted } = data;
  const opts = {
    at,
    cid,
    token,
    questId,
    moduleId,
  };

  const navigateToCompletedPage = () => {
    browserHistory.push(`/quest-completion/${questId}/${moduleId}`);
  };

  if (callSetQuestCompleted) {
    return setQuestCompletedApi(opts)
      .then(result => {
        dispatch(ACTION.setQuestCompletedSuccess(result.data));
        navigateToCompletedPage();
      })
      .catch(error => dispatch(ACTION.setQuestCompletedError(error)));
  }
  navigateToCompletedPage();
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

export const getQaMultipleChoice = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getQaMultipleChoice());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return getQaMultipleChoiceApi({ ...opts })
    .then(result => dispatch(ACTION.getQaMultipleChoiceSuccess(result.data)))
    .catch(error => dispatch(ACTION.getQaMultipleChoiceError(error)));
};

export const setQaMultipleChoice = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.setQaMultipleChoice());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return setQaMultipleChoiceApi({ ...opts })
    .then(result => dispatch(ACTION.setQaMultipleChoiceSuccess(result.data)))
    .catch(error => dispatch(ACTION.setQaMultipleChoiceError(error)));
};
// END: QUEST QA MODULES

// QUEST GUIDES MODULES
export const getQuestGuidePanel = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getQuestGuidePanel());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return getQuestGuidePanelApi({ ...opts })
    .then(result => dispatch(ACTION.getQuestGuidePanelSuccess(result.data)))
    .catch(error => dispatch(ACTION.getQuestGuidePanelError(error)));
};

// END: QUEST GUIDES MODULES

export const getCustomerQuests = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getCustomerQuests());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return getCustomerQuestsApi({ ...opts })
    .then(result => dispatch(ACTION.getCustomerQuestsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getCustomerQuestsError(error)));
};

// QUEST ANIMATION MODULE
export const getAnimation = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getAnimation());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return getAnimationApi({ ...opts })
    .then(result => dispatch(ACTION.getAnimationSuccess(result.data)))
    .catch(error => dispatch(ACTION.getAnimationError(error)));
};

export const getAnimationFrames = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getAnimationFrames());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return getAnimationFramesApi({ ...opts })
    .then(result => dispatch(ACTION.getAnimationFramesSuccess(result.data)))
    .catch(error => dispatch(ACTION.getAnimationFramesError(error)));
};

// END: QUEST ANIMATION MODULE

// Rich Text MODULE
export const getRichTextInputModule = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getRichTextInputModule());
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return getRichTextInputModuleApi({ ...opts })
    .then(result => dispatch(ACTION.getRichTextInputModuleSuccess(result.data)))
    .catch(error => dispatch(ACTION.getRichTextInputModuleError(error)));
};
export const setRichTextInputModule = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.setRichTextInputModule(data));
  const opts = {
    at,
    cid,
    token,
    ...data,
  };
  return setRichTextInputModuleApi({ ...opts })
    .then(result => dispatch(ACTION.setRichTextInputModuleSuccess(result.data)))
    .catch(error => dispatch(ACTION.setRichTextInputModuleError(error)));
};
