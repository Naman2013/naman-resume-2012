import axios from 'axios';

export const getApi = data => axios.post('/api/', data);

export const getAccountSettingsApi = data =>
  axios.post('/api/page/accountSettings', data);

export const saveAccountFormFieldApi = data =>
  axios.post('/api/registration/saveAccountFormField', data);

export const getSubscriptionPlansApi = data =>
  axios.post('/api/registration/getSubscriptionPlans', data);

export const resetPasswordApi = data =>
  axios.post('/api/registration/forgotPasswordRequest', data);
