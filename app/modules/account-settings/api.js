import axios from 'axios';

export const getApi = data => axios.post('/api/', data);

export const getAccountSettingsApi = data =>
  axios.post('/api/page/accountSettings', data);

export const saveAccountFormFieldApi = data =>
  axios.post('/api/registration/saveAccountFormField', data);
