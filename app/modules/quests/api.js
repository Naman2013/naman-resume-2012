import axios from 'axios';

// QUEST STEP PAGE
export const getQuestStepApi = data => axios.post('/api/quests/getStep', data);
export const getQuestOutputApi = data =>
  axios.post('/api/quests/getOutputPanel', data);
export const getDataCollectionApi = data =>
  axios.post('/api/quests/getDataCollection', data);
// END: QUEST STEP PAGE
