import { API } from 'app/api';

export const getTopThreadsListApi = data =>
  API.post('/api/forum/getThreadList', { ...data, topThreadsOnly: true });

export const getGroupDeleteInvitationApi = data =>
  API.post('/api/page/classroomDeleteInvitation', { ...data });

export const deleteInvitationApi = data =>
  API.post('/api/classroom/deleteInvitation', { ...data });
