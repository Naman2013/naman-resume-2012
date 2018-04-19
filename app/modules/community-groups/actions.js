import axios from 'axios';

export const FETCH_GROUPS_LIST_START = 'FETCH_GROUPS_LIST_START';
export const FETCH_GROUPS_LIST_SUCCESS = 'FETCH_GROUPS_LIST_SUCCESS';
export const FETCH_GROUPS_LIST_FAIL = 'FETCH_GROUPS_LIST_FAIL';

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
  .then(result => dispatch(fetchGroupsListSuccess(result.data)))
  .catch(error => dispatch(fetchGroupsListFail(error)));
};
