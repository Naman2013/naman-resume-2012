import { ACTION } from './reducer';
import {
  getCustomerAdminToolsApi,
} from './api';

export const fetchCustomerAdminToolsAction = () => (dispatch, getState) => {
  dispatch(ACTION.fetchCustomerAdminTools());

  const { token, at, cid } = getState().user;

  return getCustomerAdminToolsApi({
    token,
    at,
    cid,
  })
    .then(result => {
      dispatch(ACTION.fetchCustomerAdminToolsSuccess(result.data));
    })
    .catch(error => ACTION.fetchCustomerAdminToolsError(error));
};