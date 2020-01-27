import { API } from 'app/api';

export const getTopThreadsListApi = data =>
  API.post('/api/forum/getThreadList', { ...data, topThreadsOnly: true });

export const getProfileGroupsApi = (data, callSource) => {
  return API.post('/api/profile/groups', { ...data, ...callSource });
};
