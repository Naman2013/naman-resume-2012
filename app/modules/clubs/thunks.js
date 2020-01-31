import {
  getTopThreadsListApi,
  getGroupDeleteInvitationApi,
  deleteInvitationApi,
} from './api';

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

export const getGroupDeleteInvitation = inviteDetails => (
  dispatch,
  getState
) => {
  const { cid, at, token } = getState().user;
  dispatch(ACTION.getGroupDeleteInvitation());
  return getGroupDeleteInvitationApi({
    at,
    cid,
    token,
    inviteDetails,
  })
    .then(result => {
      dispatch(ACTION.getGroupDeleteInvitationSuccess(result.data));
      return result.data;
    })
    .catch(error => dispatch(ACTION.getGroupDeleteInvitationError(error)));
};

export const deleteInvitation = inviteDetails => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(ACTION.deleteInvitation());
  return deleteInvitationApi({
    at,
    cid,
    token,
    inviteDetails,
  })
    .then(result => dispatch(ACTION.deleteInvitationSuccess(result.data)))
    .catch(error => {
      dispatch(ACTION.deleteInvitationError(error));
    });
};
