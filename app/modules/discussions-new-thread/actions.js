import { getForumTopicList } from '../../services/discussions/get-forum-topic-list';
import { createThread } from '../../services/discussions/create-thread';

export const FETCH_FORUM_TOPIC_LIST_START = 'FETCH_FORUM_TOPIC_LIST_START';
export const FETCH_FORUM_TOPIC_LIST_SUCCESS = 'FETCH_FORUM_TOPIC_LIST_SUCCESS';
export const FETCH_FORUM_TOPIC_LIST_FAIL = 'FETCH_FORUM_TOPIC_LIST_FAIL';
export const NEW_THREAD_START = 'NEW_THREAD_START';
export const NEW_THREAD_SUCCESS = 'NEW_THREAD_SUCCESS';
export const NEW_THREAD_FAIL = 'NEW_THREAD_FAIL';
export const RESET_NEW_THEAD_STATE = 'RESET_NEW_THEAD_STATE';

const fetchForumTopicListStart = () => ({
  type: FETCH_FORUM_TOPIC_LIST_START,
});

const fetchForumTopicListSuccess = payload => ({
  type: FETCH_FORUM_TOPIC_LIST_SUCCESS,
  payload,
});

const fetchForumTopicListFail = payload => ({
  type: FETCH_FORUM_TOPIC_LIST_FAIL,
  payload,
});

export const fetchForumTopicList = ({
  lang,
  ver,
  status,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchForumTopicListStart());
  return getForumTopicList({
    cid,
    at,
    token,
    lang,
    ver,
    status,
  })
  .then(result => dispatch(fetchForumTopicListSuccess(result.data)))
  .catch(error => dispatch(fetchForumTopicListFail(error)));
};

const createNewThreadStart = () => ({
  type: NEW_THREAD_START,
});

const createNewThreadSuccess = payload => ({
  type: NEW_THREAD_SUCCESS,
  payload,
});

const createNewThreadFail = payload => ({
  type: NEW_THREAD_FAIL,
  payload,
});

export const createNewThread = ({
  lang,
  ver,
  status,
  forumId,
  title,
  content,
  S3URLs,
  topicId,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(createNewThreadStart());
  return createThread({
    cid,
    at,
    token,
    lang,
    ver,
    status,
    forumId,
    title,
    content,
    S3URLs,
    topicId,
  })
  .then(result => dispatch(createNewThreadSuccess(result.data)))
  .catch(error => dispatch(createNewThreadFail(error)));
};

export const resetNewThreadState = () => ({
  type: RESET_NEW_THEAD_STATE,
});
