import axios from 'axios';

// QUEST STEP PAGE
export const getQuestStepApi = data => axios.post('/api/quests/getStep', data);
export const getQuestOutputApi = data =>
  axios.post('/api/quests/getOutputPanel', data);
export const getDataCollectionApi = data =>
  axios.post('/api/quests/getDataCollection', data);
export const getDataCollectionSlotImagesApi = data =>
  axios.post('/api/quests/getDataCollectionSlotImages', data);
export const setDataCollectionImageApi = data =>
  axios.post('/api/quests/setDataCollectionImage', data);
// END: QUEST STEP PAGE
