import axios from 'axios';

export const getApi = data => axios.post('/api/', data);
