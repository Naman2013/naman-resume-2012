import axios from 'axios';
import { getThreadList } from '../../services/discussions/get-thread-list';
export const FETCH_GROUP_ACTIVITY_START = 'FETCH_GROUP_ACTIVITY_START';
export const FETCH_GROUP_ACTIVITY_SUCCESS = 'FETCH_GROUP_ACTIVITY_SUCCESS';
export const FETCH_GROUP_ACTIVITY_FAIL = 'FETCH_GROUP_ACTIVITY_FAIL';
export const TOGGLE_ACTIVITY_COMMENTS = 'TOGGLE_ACTIVITY_COMMENTS';

const fetchGroupActivityStart = payload => ({
  type: FETCH_GROUP_ACTIVITY_START,
  payload,
});

const fetchGroupActivitySuccess = payload => ({
  type: FETCH_GROUP_ACTIVITY_SUCCESS,
  payload,
});

const fetchGroupActivityFail = payload => ({
  type: FETCH_GROUP_ACTIVITY_SUCCESS,
  payload,
});

export const fetchGroupActivity = ({
  appendToList = false,
  lang,
  page,
  topicId,
  forumId,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { count } = getState().communityGroupOverview;
  dispatch(fetchGroupActivityStart({ appendToList }));
  return getThreadList({
    appendToList,
    at,
    callSource: null,
    cid,
    count,
    lang,
    page,
    token,
    forumId,
    topicId,
    ver,
  })
    .then(result => dispatch(fetchGroupActivitySuccess(Object.assign({
      page,
      appendToList,
    }, result.data))))
    .catch(error => dispatch(fetchGroupActivityFail(error)));
    };
