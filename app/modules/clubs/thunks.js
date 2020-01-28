import { getTopThreadsListApi, getProfileGroupsApi } from './api';

import { ACTION } from './reducer';

export const getTopThreadList = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getTopThreads());
  return getTopThreadsListApi({ at, token, cid, ...data })
    .then(result => {
      dispatch(ACTION.getTopThreadsSuccess(result.data.threads));
      return result.data;
    })
    .catch(error => dispatch(ACTION.getTopThreadsError(error)));
};

export const getProfileGroupList = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  return getProfileGroupsApi({ at, token, cid, ...data })
    .then(result =>
      dispatch(ACTION.getProfileGroupSuccess(result.data.groupsList))
    )
    .catch(error => dispatch(ACTION.getProfileGroupError(error)));
};
