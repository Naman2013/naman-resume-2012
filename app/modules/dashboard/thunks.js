import { getGuestDashboardApi } from 'app/modules/dashboard/api';
import { ACTION } from './reducer';

export const getGuestDashboard = abTestCallSource => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getGuestDashboard());
  return getGuestDashboardApi({ at, token, cid, abTestCallSource })
    .then(result => dispatch(ACTION.getGuestDashboardSuccess(result.data)))
    .catch(error => dispatch(ACTION.getGuestDashboardError(error)));
};
