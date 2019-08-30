import axios from 'axios';

// QUEST STEP PAGE
export const getQuestStepApi = data => axios.post('/api/quests/getStep', data);
export const getQuestOutputApi = data =>
  axios.post('/api/quests/getOutputPanel', data);
export const getDataCollectionApi = data =>
  axios.post('/api/quests/getDataCollection', data);
export const getQuestCompletedApi = data =>
  axios.post('/api/quests/getQuestCompleted', data);
export const getDataCollectionSlotImagesApi = data =>
  axios.post('/api/quests/getDataCollectionSlotImages', data);
export const setDataCollectionSlotImageApi = data =>
  axios.post('/api/quests/setDataCollectionSlotImage', data);
// END: QUEST STEP PAGE

// QUEST QA MODULES
export const getQaFreeFormApi = data =>
  axios.post('/api/quests/getQAFreeform', data);
export const setQaFreeFormApi = data =>
  axios.post('/api/quests/setQAFreeform', data);
export const getQaFillBlanksApi = data =>
  axios.post('/api/quests/getQAFillBlanks', data);
export const setQaFillBlanksApi = data =>
  axios.post('/api/quests/setQAFillBlanks', data);
export const getQaMultipleChoiceApi = data =>
  axios.post('/api/quests/getQAMultipleChoice', data);
export const setQaMultipleChoiceApi = data =>
  axios.post('/api/quests/setQAMultipleChoice', data);
// END: QUEST QA MODULES

export const getQuestGuidePanelApi = data =>
  axios.post('/api/quests/getQuestGuidePanel', data);
export const getCustomerQuestsApi = data =>
  axios.post('/api/profiles/getCustomerQuests', data);
