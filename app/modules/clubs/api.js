import { API } from 'app/api';

export const getTopThreadsListApi = data =>
  API.post('/api/forum/getThreadList', { ...data, topThreadsOnly: true });
