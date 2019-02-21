import axios from 'axios';

export const getPublicProfileApi = () => axios.post('/api/page/getPublicProfile');
