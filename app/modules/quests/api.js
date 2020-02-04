import { API } from 'app/api';

// QUEST STEP PAGE
export const getQuestStepApi = data => API.post('/api/quests/getStep', data);
export const getQuestOutputApi = data =>
  API.post('/api/quests/getOutputPanel', data);
export const getDataCollectionApi = data =>
  API.post('/api/quests/getDataCollection', data);
export const getQuestCompletedApi = data =>
  API.post('/api/quests/getQuestCompleted', data);
export const setQuestCompletedApi = data =>
  API.post('/api/quests/setQuestCompleted', data);
export const getDataCollectionSlotImagesApi = data =>
  API.post('/api/quests/getDataCollectionSlotImages', data);
export const setDataCollectionSlotImageApi = data =>
  API.post('/api/quests/setDataCollectionSlotImage', data);
// END: QUEST STEP PAGE

// QUEST QA MODULES
export const getQaFreeFormApi = data =>
  API.post('/api/quests/getQAFreeform', data);
export const setQaFreeFormApi = data =>
  API.post('/api/quests/setQAFreeform', data);
export const getQaFillBlanksApi = data =>
  API.post('/api/quests/getQAFillBlanks', data);
export const setQaFillBlanksApi = data =>
  API.post('/api/quests/setQAFillBlanks', data);
export const getQaMultipleChoiceApi = data =>
  API.post('/api/quests/getQAMultipleChoice', data);
export const setQaMultipleChoiceApi = data =>
  API.post('/api/quests/setQAMultipleChoice', data);
// END: QUEST QA MODULES

export const getQuestGuidePanelApi = data =>
  API.post('/api/quests/getQuestGuidePanel', data);
export const getCustomerQuestsApi = data =>
  API.post('/api/profiles/getCustomerQuests', data);

// QUEST ANIMATION MODULE
export const getAnimationApi = data =>
  API.post('/api/quests/getAnimation', data);
export const getAnimationFramesApi = data =>
  API.post('/api/quests/getAnimationFrames', data);
export const setAnimationApi = data =>
  API.post('/api/quests/setAnimation', data);
// END: QUEST ANIMATION MODULE

// RICH TEXT INPUT MODULE
export const getRichTextInputModuleApi = data =>
  API.post('/api/quests/getTextInput', data);
export const setRichTextInputModuleApi = data =>
  API.post('/api/quests/setTextInput', data);

// IMAGEORDERING (MONTAGE) MODULE
export const getImageorderingModuleApi = data =>
  API.post('/api/quests/getMontage', data);

export const setImageorderingModuleApi = data =>
  API.post('/api/quests/setMontage', data);
