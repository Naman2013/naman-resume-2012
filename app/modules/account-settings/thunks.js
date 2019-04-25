import { ACTION } from './reducer';
import { getAccountSettingsApi } from './api';

export const fetchAccountSettingsAction = () => (dispatch, getState) => {
  dispatch(ACTION.fetchAccountSettings());

  const { token, at, cid } = getState().user;

  return getAccountSettingsApi({
    token,
    at,
    cid,
  })
    .then(result => {
      dispatch(ACTION.fetchAccountSettingsSuccess(result.data));
    })
    .catch(error => ACTION.fetchAccountSettingsError(error));
};
