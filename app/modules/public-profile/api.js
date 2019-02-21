import axios from 'axios';

export const getPublicProfileApi = data => axios.post('/api/page/getPublicProfile', data);
