import axios from 'axios';
import { toggleJoinGroup } from '../../services/community-groups/toggle-join-group';
import { askToJoin } from '../../services/community-groups/ask-to-join';
import { requestGroup } from '../../services/community-groups/request-group';

export const FETCH_GROUPS_LIST_START = 'FETCH_GROUPS_LIST_START';
export const FETCH_GROUPS_LIST_SUCCESS = 'FETCH_GROUPS_LIST_SUCCESS';
export const FETCH_GROUPS_LIST_FAIL = 'FETCH_GROUPS_LIST_FAIL';
export const TOGGLE_JOIN_GROUP_START = 'TOGGLE_JOIN_GROUP_START';
export const TOGGLE_JOIN_GROUP_SUCCESS = 'TOGGLE_JOIN_GROUP_SUCCESS';
export const TOGGLE_JOIN_GROUP_FAIL = 'TOGGLE_JOIN_GROUP_FAIL';
export const ASK_TO_JOIN_SUCCESS = 'ASK_TO_JOIN_SUCCESS';
export const ASK_TO_JOIN_FAIL = 'ASK_TO_JOIN_FAIL';
export const ASK_TO_JOIN_START = 'ASK_TO_JOIN_START';
export const REQUEST_GROUP_SUCCESS = 'REQUEST_GROUP_SUCCESS';
export const REQUEST_GROUP_FAIL = 'REQUEST_GROUP_FAIL';
export const REQUEST_GROUP_START = 'REQUEST_GROUP_START';

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

const askToJoinGroupStart = payload => ({
  type: ASK_TO_JOIN_START,
  payload,
});

const askToJoinGroupSuccess = payload => ({
  type: ASK_TO_JOIN_SUCCESS,
  payload,
});

const askToJoinGroupFail = payload => ({
  type: ASK_TO_JOIN_SUCCESS,
  payload,
});

export const askToJoinGroup = ({
  discussionGroupId,
  ver,
  lang,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(askToJoinGroupStart());
  return askToJoin({
    cid,
    at,
    token,
    discussionGroupId,
    ver,
    lang,
  })
  .then(result => dispatch(askToJoinGroupSuccess(result.data)))
  .catch(error => dispatch(askToJoinGroupFail(error)));
};

const requestNewGroupStart = payload => ({
  type: REQUEST_GROUP_START,
  payload,
});

const requestNewGroupSuccess = payload => ({
  type: REQUEST_GROUP_SUCCESS,
  payload,
});

const requestNewGroupFail = payload => ({
  type: REQUEST_GROUP_SUCCESS,
  payload,
});

export const requestNewGroup = ({
  access,
  definition,
  ver,
  lang,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(requestNewGroupStart());
  return requestGroup({
    cid,
    at,
    token,
    access,
    definition,
    ver,
    lang,
  })
  .then(result => dispatch(requestNewGroupSuccess(result.data)))
  .catch(error => dispatch(requestNewGroupFail(error)));
};
