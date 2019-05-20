import { getReplies } from '../../../../services/discussions/get-replies';
import { submitReply } from '../../../../services/discussions/submit-reply';

export const FETCH_ASTRONOMER_ANSWER_REPLIES_FAIL = 'FETCH_ASTRONOMER_ANSWER_REPLIES_FAIL';
export const FETCH_ASTRONOMER_ANSWER_REPLIES_START = 'FETCH_ASTRONOMER_ANSWER_REPLIES_START';
export const FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS = 'FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS';
export const REPLY_TO_ASTRONOMER_ANSWER_FAIL = 'REPLY_TO_ASTRONOMER_ANSWER_FAIL';
export const REPLY_TO_ASTRONOMER_ANSWER_START = 'REPLY_TO_ASTRONOMER_ANSWER_START';
export const REPLY_TO_ASTRONOMER_ANSWER_SUCCESS = 'REPLY_TO_ASTRONOMER_ANSWER_SUCCESS';
export const TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES = 'TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES';
export const UPDATE_ASK_ASTRONOMER_ANSWER_REPLIES_DISPLAY_LIST = 'UPDATE_ASK_ASTRONOMER_ANSWER_REPLIES_DISPLAY_LIST';

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
  lang,
  threadId,
  ver,
  replyTo,
  showAllReplies,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { page } = getState().astronomerDiscuss;
  
  dispatch(fetchAstronomerAnswerRepliesStart({ replyTo }));
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
    page,
  })
  .then(result => dispatch(fetchAstronomerAnswerRepliesSuccess(Object.assign({ replyTo, showAllReplies }, result.data))))
  .catch(error => dispatch(fetchAstronomerAnswerRepliesFail(Object.assign({ replyTo }, error))));
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

export const replyToAnswer = payload => (dispatch, getState) => {
  const {
    lang,
    ver,
    topicId,
    threadId,
    replyTo,
    content,
    S3URLs,
    objectId,
  } = payload;
  const { cid, at, token } = getState().user;
  dispatch(replyToAnswerStart({ replyTo }))
  dispatch(toggleAllAnswerRepliesAndDisplay(Object.assign({ showAllReplies: true }, payload)));

  return submitReply({
    at,
    callSource: 'qanda',
    cid,
    content,
    lang,
    objectId,
    S3URLs,
    replyTo,
    threadId,
    token,
    topicId,
    ver,
  })
  .then(result => dispatch(replyToAnswerSuccess(Object.assign({ replyTo, threadId }, result.data))))
  .catch(error => dispatch(replyToAnswerFail(Object.assign({ replyTo }, error))));
};

export const toggleAllAnswerReplies = payload => ({
  type: TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES,
  payload,
});

export const updateAnswerRepliesDisplayList = payload => ({
  type: UPDATE_ASK_ASTRONOMER_ANSWER_REPLIES_DISPLAY_LIST,
  payload,
});

export const toggleAllAnswerRepliesAndDisplay = payload => (dispatch, getState) => {
  const { showAllReplies, replyId } = payload;
  const { allReplies } = getState().astronomerDiscuss;
  if (showAllReplies || !allReplies[replyId]) { // we haven't fetched the replies yet, so let's do so
    dispatch(fetchAstronomerAnswerReplies(Object.assign({ showAllReplies, replyTo: replyId }, payload)));
  } else {
    dispatch(toggleAllAnswerReplies(payload));
  }
};
