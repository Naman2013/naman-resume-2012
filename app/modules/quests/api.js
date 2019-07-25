import axios from 'axios';

// QUEST STEP PAGE
export const getQuestStepApi = data => axios.post('/api/quests/getStep', data);
export const getQuestOutputApi = data =>
  axios.post('/api/quests/getOutputPanel', data);
export const getDataCollectionApi = data =>
  axios.post('/api/quests/getDataCollection', data);
export const getDataCollectionSlotImagesApi = data =>
  axios.post('/api/quests/getDataCollectionSlotImages', data);
export const setDataCollectionSlotImageApi = data =>
  axios.post('/api/quests/setDataCollectionSlotImage', data);
export const getQaFreeFormApi = data =>
  axios.post('/api/quests/getQAFreeform', data);
// END: QUEST STEP PAGE
