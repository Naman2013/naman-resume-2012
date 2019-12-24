import { getGuestDashboardApi } from 'app/modules/dashboard/api';
import { ACTION } from './reducer';

export const getGuestDashboard = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getGuestDashboard());
  return getGuestDashboardApi({ at, token, cid })
    .then(result => dispatch(ACTION.getGuestDashboardSuccess(result.data)))
    .catch(error => dispatch(ACTION.getGuestDashboardError(error)));
};
