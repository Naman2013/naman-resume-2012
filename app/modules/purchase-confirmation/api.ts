import { API } from 'app/api';
import { AxiosPromise } from 'axios';

export const getPurchaseConfirmationApi = (data: any): AxiosPromise =>
  API.post('/api/page/purchaseConfirmation', data);
