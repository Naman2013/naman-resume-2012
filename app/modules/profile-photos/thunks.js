import { getFitsDataApi } from 'app/modules/profile-photos/api';
import { ACTION } from './reducer';

export const getFitsData = scheduledMissionId => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getFitsData());
  return getFitsDataApi({ at, token, cid, scheduledMissionId })
    .then(result => dispatch(ACTION.getFitsDataSuccess(result.data)))
    .catch(error => dispatch(ACTION.getFitsDataError(error)));
};
