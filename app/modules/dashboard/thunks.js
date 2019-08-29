import { getDashboardPageApi } from 'app/modules/dashboard/api';
import { ACTION } from './reducer';

export const getDashboardPage = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getDashboardPage());
  return getDashboardPageApi({ at, token, cid })
    .then(result => dispatch(ACTION.getDashboardPageSuccess(result.data)))
    .catch(error => dispatch(ACTION.getDashboardPageError(error)));
};
