import { API } from 'app/api';

export const FETCH_REPLIES_START = 'FETCH_REPLIES_START';
export const FETCH_REPLIES_SUCCESS = 'FETCH_REPLIES_SUCCESS';
export const FETCH_REPLIES_FAIL = 'FETCH_REPLIES_FAIL';
export const PREPARE_REPLY_START = 'PREPARE_REPLY_START';
export const PREPARE_REPLY_SUCCESS = 'PREPARE_REPLY_SUCCESS';
export const PREPARE_REPLY_FAIL = 'PREPARE_REPLY_FAIL';
export const SUBMIT_REPLY_START = 'SUBMIT_REPLY_START';
export const SUBMIT_REPLY_SUCCESS = 'SUBMIT_REPLY_SUCCESS';
export const SUBMIT_REPLY_FAIL = 'SUBMIT_REPLY_FAIL';
export const RESET_REPLY_STATE = 'RESET_REPLY_STATE';

const fetchRepliesStart = () => ({
  type: FETCH_REPLIES_START,
});

const fetchRepliesSuccess = payload => ({
  type: FETCH_REPLIES_SUCCESS,
  payload,
});

const fetchRepliesFail = payload => ({
  type: FETCH_REPLIES_FAIL,
  payload,
});

export const fetchReplies = ({
  lang,
  type,
  ver,
  topicId,
  threadId,
  page = 1,
  count = 10,
  appendToList, // for pagination
  replyTo,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;

  if (!appendToList) {
    dispatch(fetchRepliesStart());
  }

  return API.post('/api/forum/getReplies', {
    cid,
    at,
    token,
    lang,
    ver,
    threadId,
    topicId,
    page,
    count,
    replyTo,
  })
  .then((result) => {
    dispatch(fetchRepliesSuccess(Object.assign(result.data, { threadId, page, appendToList })));
  })
  .catch(error => dispatch(fetchRepliesFail(error)));
};

const prepareReplyStart = () => ({
  type: PREPARE_REPLY_START,
});

const prepareReplySuccess = payload => ({
  type: PREPARE_REPLY_SUCCESS,
  payload,
});

const prepareReplyFail = payload => ({
  type: PREPARE_REPLY_FAIL,
  payload,
});

export const prepareReply = ({ lang, ver, status }) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(prepareReplyStart());

  return API.post('/api/forum/prepareReply', {
    cid,
    at,
    token,
    lang,
    ver,
    status,
  })
  .then(result => dispatch(prepareReplySuccess(result.data)))
  .catch(error => dispatch(prepareReplyFail(error)));
};

const submitReplyStart = () => ({
  type: SUBMIT_REPLY_START,
});

const submitReplySuccess = payload => ({
  type: SUBMIT_REPLY_SUCCESS,
  payload,
});

const submitReplyFail = payload => ({
  type: SUBMIT_REPLY_FAIL,
  payload,
});

export const submitReply = ({
  lang,
  ver,
  status,
  topicId,
  threadId,
  replyTo,
  title,
  content,
  S3URLs,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(submitReplyStart());

  return API.post('/api/forum/submitReply', {
    cid,
    at,
    token,
    lang,
    ver,
    status,
    topicId,
    threadId,
    replyTo,
    title,
    content,
    S3URLs,
  })
  .then(result => dispatch(submitReplySuccess(result.data)))
  .catch(error => dispatch(submitReplyFail(error)));
};

export const resetReplyState = () => ({
  type: RESET_REPLY_STATE,
});
