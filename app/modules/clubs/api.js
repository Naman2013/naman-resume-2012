import axios from 'axios';

export const getTopThreadsListApi = data =>
  axios.post('/api/forum/getThreadList', { ...data, topThreadsOnly: true });
