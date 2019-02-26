import axios from 'axios';

export const getMissionsApi = data => axios.post('/api/page/getMissions', data);
