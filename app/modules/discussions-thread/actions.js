import axios from 'axios';
import { fetchReplies } from '../discussions-replies/actions';

export const FETCH_THREAD_LIST_START = 'FETCH_THREAD_LIST_START';
export const FETCH_THREAD_LIST_SUCCESS = 'FETCH_THREAD_LIST_SUCCESS';
export const FETCH_THREAD_LIST_FAIL = 'FETCH_THREAD_LIST_FAIL';

export const FETCH_THREAD_START = 'FETCH_THREAD_START';
export const FETCH_THREAD_SUCCESS = 'FETCH_THREAD_SUCCESS';
export const FETCH_THREAD_FAIL = 'FETCH_THREAD_FAIL';

const fetchThreadListStart = () => ({
  type: FETCH_THREAD_LIST_START,
});

const fetchThreadListSuccess = payload => ({
  type: FETCH_THREAD_LIST_SUCCESS,
  payload,
});

const fetchThreadListFail = payload => ({
  type: FETCH_THREAD_LIST_FAIL,
  payload,
});

export const fetchThreadList = ({
  lang,
  ver,
  topicId,
  page,
  count = 10,
  sortBy,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const processedSortBy = sortBy && sortBy.replace('-', '');
  dispatch(fetchThreadListStart());
  return axios.post('/api/forum/getThreadList', {
    cid,
    at,
    token,
    lang,
    ver,
    topicId,
    page,
    count,
    sortBy: processedSortBy,
  })
  .then(result => dispatch(fetchThreadListSuccess(Object.assign(
    { page },
    result.data,
  ))))
  .catch(error => dispatch(fetchThreadListFail(error)));
};

const fetchThreadStart = () => ({
  type: FETCH_THREAD_START,
});

const fetchThreadSuccess = payload => ({
  type: FETCH_THREAD_SUCCESS,
  payload,
});

const fetchThreadFail = payload => ({
  type: FETCH_THREAD_FAIL,
  payload,
});

export const fetchThread = ({
  lang,
  ver,
  threadId,
  topicId,
}) => (dispatch, getState) => {
  dispatch(fetchThreadStart());

  return axios.post('/api/forum/getThread', {
    threadId,
    lang,
    ver,

  })
  .then(result => {
    const { thread } = result.data;
    dispatch(fetchThreadSuccess(result.data));
    dispatch(fetchReplies({
      parentId: thread.threadId,
      topicId,
      threadId: thread.threadId,
      replyTo: thread.threadId,
    }))
  })
  .catch(error => dispatch(fetchThreadFail(error)));
};
