import { API } from 'app/api';

export const getApi = data => API.post('/api/', data);

export const getAccountSettingsApi = data =>
  API.post('/api/page/accountSettings', data);

export const saveAccountFormFieldApi = data =>
  API.post('/api/registration/saveAccountFormField', data);

export const getSubscriptionPlansApi = data =>
  API.post('/api/registration/getSubscriptionPlans', data);

export const resetPasswordApi = data =>
  API.post('/api/registration/forgotPasswordRequest', data);

export const getDashboardPopupInfoApi = data =>
  API.post('/api/app/dashboardPopupInfo', data);
