import {
  getPublicProfileApi,
  getPrivateProfileApi,
  getProfileListsApi,
  getPublicProfileMissionsApi,
  getPrivateProfileMissionsApi,
} from 'app/modules/profile/api';
import { ACTION } from './reducer';

export const getPublicProfile = customerUUID => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getPublicProfile());
  return getPublicProfileApi({ at, token, cid, customerUUID })
    .then(result => dispatch(ACTION.getPublicProfileSuccess(result.data)))
    .catch(error => dispatch(ACTION.getPublicProfileError(error)));
};

export const getPrivateProfile = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getPrivateProfile());
  return getPrivateProfileApi({ at, token, cid })
    .then(result => dispatch(ACTION.getPrivateProfileSuccess(result.data)))
    .catch(error => dispatch(ACTION.getPrivateProfileError(error)));
};

export const getProfile = customerUUID => (dispatch, getState) => {
  if (customerUUID) {
    return getPublicProfile(customerUUID)(dispatch, getState);
  }
  return getPrivateProfile()(dispatch, getState);
};

export const getProfileLists = (readingListType, customerUUID) => (
  dispatch,
  getState
) => {
  const { at, token, cid } = getState().user;
  const body = { at, token, cid, readingListType };
  if (customerUUID) {
    body.customerUUID = customerUUID;
  }
  dispatch(ACTION.getProfileLists());
  return getProfileListsApi(body)
    .then(result => dispatch(ACTION.getProfileListsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getProfileListsError(error)));
};

export const getPublicProfileMissions = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getPublicProfileMissions());
  return getPublicProfileMissionsApi({ at, token, cid, ...data })
    .then(result =>
      dispatch(ACTION.getPublicProfileMissionsSuccess(result.data))
    )
    .catch(error => dispatch(ACTION.getPublicProfileMissionsError(error)));
};

export const getPrivateProfileMissions = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getPrivateProfileMissions());
  return getPrivateProfileMissionsApi({ at, token, cid })
    .then(result =>
      dispatch(ACTION.getPrivateProfileMissionsSuccess(result.data))
    )
    .catch(error => dispatch(ACTION.getPrivateProfileMissionsError(error)));
};
