import axios from 'axios';
import { toggleJoinGroup } from '../../services/community-groups/toggle-join-group';

export const FETCH_GROUPS_LIST_START = 'FETCH_GROUPS_LIST_START';
export const FETCH_GROUPS_LIST_SUCCESS = 'FETCH_GROUPS_LIST_SUCCESS';
export const FETCH_GROUPS_LIST_FAIL = 'FETCH_GROUPS_LIST_FAIL';
export const TOGGLE_JOIN_GROUP_START = 'TOGGLE_JOIN_GROUP_START';
export const TOGGLE_JOIN_GROUP_SUCCESS = 'TOGGLE_JOIN_GROUP_SUCCESS';
export const TOGGLE_JOIN_GROUP_FAIL = 'TOGGLE_JOIN_GROUP_FAIL';

const fetchGroupsListStart = payload => ({
  type: FETCH_GROUPS_LIST_START,
  payload,
});

const fetchGroupsListSuccess = payload => ({
  type: FETCH_GROUPS_LIST_SUCCESS,
  payload,
});

const fetchGroupsListFail = payload => ({
  type: FETCH_GROUPS_LIST_SUCCESS,
  payload,
});

export const fetchGroupsList = ({
  groupSet,
  lang,
  page,
  sortBy,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { count } = getState().communityGroups;
  dispatch(fetchGroupsListStart());
  return axios.post('/api/discussiongroups/getGroups', {
    at,
    cid,
    count,
    groupSet,
    lang,
    page,
    sortBy,
    token,
    ver,
  })
  .then(result => dispatch(fetchGroupsListSuccess(Object.assign({ page }, result.data))))
  .catch(error => dispatch(fetchGroupsListFail(error)));
};

const toggleJoinGroupSuccess = payload => ({
  type: TOGGLE_JOIN_GROUP_SUCCESS,
  payload,
});

const toggleJoinGroupFail = payload => ({
  type: TOGGLE_JOIN_GROUP_FAIL,
  payload,
});

export const joinOrLeaveGroup = ({
  discussionGroupId,
  lang,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  return toggleJoinGroup({
    at,
    cid,
    discussionGroupId,
    lang,
    token,
    ver,
  })
  .then(result => dispatch(toggleJoinGroupSuccess(Object.assign({ discussionGroupId }, result.data))))
  .catch(error => dispatch(toggleJoinGroupFail(error)));
};
