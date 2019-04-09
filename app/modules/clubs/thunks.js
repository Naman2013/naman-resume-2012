import { getTopThreadsListApi } from './api';

import { ACTION } from './reducer';

export const getTopThreadList = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getTopThreads());
  return getTopThreadsListApi({ at, token, cid, ...data })
    .then(result => dispatch(ACTION.getTopThreadsSuccess(result.data.threads)))
    .catch(error => dispatch(ACTION.getTopThreadsError(error)));
};
