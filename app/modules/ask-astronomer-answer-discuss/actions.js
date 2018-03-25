import { getReplies } from '../../services/discussions/get-replies';
import { submitReply } from '../../services/discussions/submit-reply';

export const FETCH_ASTRONOMER_ANSWER_REPLIES_START = 'FETCH_ASTRONOMER_ANSWER_REPLIES_START';
export const FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS = 'FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS';
export const FETCH_ASTRONOMER_ANSWER_REPLIES_FAIL = 'FETCH_ASTRONOMER_ANSWER_REPLIES_FAIL';
export const UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES_DISPLAY_LIST = 'UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES_DISPLAY_LIST';
export const TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES = 'TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES';
export const TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES = 'TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES';
export const REPLY_TO_ASTRONOMER_ANSWER_START = 'REPLY_TO_ASTRONOMER_ANSWER_START';
export const REPLY_TO_ASTRONOMER_ANSWER_SUCCESS = 'REPLY_TO_ASTRONOMER_ANSWER_SUCCESS';
export const REPLY_TO_ASTRONOMER_ANSWER_FAIL = 'REPLY_TO_ASTRONOMER_ANSWER_FAIL';

const fetchAstronomerAnswerRepliesStart = payload => ({
  type: FETCH_ASTRONOMER_ANSWER_REPLIES_START,
  payload,
});

const fetchAstronomerAnswerRepliesSuccess = payload => ({
  type: FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS,
  payload,
});

const fetchAstronomerAnswerRepliesFail = payload => ({
  type: FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS,
  payload,
});

export const fetchAstronomerAnswerReplies = ({
  at,
  cid,
  lang,
  token,
  threadId,
  ver,
  replyTo,
  showOnlyTopReply,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchAstronomerAnswerRepliesStart());
  return getReplies({
    at,
    callSource: 'qanda',
    cid,
    count: -1,
    lang,
    token,
    threadId,
    replyTo,
    ver,
  })
  .then(result => dispatch(fetchAstronomerAnswerRepliesSuccess(Object.assign({ replyTo, showOnlyTopReply }, result.data))))
  .catch(error => dispatch(fetchAstronomerAnswerRepliesFail(error)));
};

export const toggleAnswerReplies = payload => ({
  type: TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES,
  payload,
});

export const toggleAndDisplayReplies = payload => (dispatch, getState) => {
  const { showReplies } = payload;

  if (showReplies) {
    dispatch(fetchAstronomerAnswerReplies(Object.assign({ showOnlyTopReply: true }, payload)));
  }

  dispatch(toggleAnswerReplies(payload));
};

const replyToAnswerStart = payload => ({
  type: REPLY_TO_ASTRONOMER_ANSWER_START,
  payload,
});

const replyToAnswerSuccess = payload => ({
  type: REPLY_TO_ASTRONOMER_ANSWER_SUCCESS,
  payload,
});

const replyToAnswerFail = payload => ({
  type: REPLY_TO_ASTRONOMER_ANSWER_FAIL,
  payload,
});

export const replyToAnswer = ({
  lang,
  ver,
  topicId,
  threadId,
  replyTo,
  content,
  objectId,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;

  return submitReply({
    at,
    callSource: 'qanda',
    cid,
    content,
    lang,
    objectId,
    replyTo,
    threadId,
    token,
    topicId,
    ver,
  })
  .then(result => dispatch(replyToAnswerSuccess(Object.assign({ replyTo, threadId }, result.data))))
  .catch(error => dispatch(replyToAnswerFail(error)));
};

export const toggleAllAnswerReplies = payload => ({
  type: TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES,
  payload,
});

export const updateAnswerRepliesDisplayList = payload => ({
  type: UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES_DISPLAY_LIST,
  payload,
});

export const toggleAllAnswerRepliesAndDisplay = payload => (dispatch, getState) => {
  const { showAllReplies } = payload;

  if (showAllReplies) {
    dispatch(fetchAstronomerAnswerReplies(Object.assign({ showOnlyTopReply: false }, payload)));
  }

  dispatch(toggleAllAnswerReplies(payload));
};
