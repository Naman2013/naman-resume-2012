import { getReplies } from '../../services/discussions/get-replies';

export const FETCH_ASTRONOMER_ANSWER_REPLIES_START = 'FETCH_ASTRONOMER_ANSWER_REPLIES_START';
export const FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS = 'FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS';
export const FETCH_ASTRONOMER_ANSWER_REPLIES_FAIL = 'FETCH_ASTRONOMER_ANSWER_REPLIES_FAIL';
export const UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES_DISPLAY_LIST = 'UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST';
export const TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES = 'TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES';
export const TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES = 'TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES';
export const REPLY_TO_ASTRONOMER_ANSWER = 'REPLY_TO_ASTRONOMER_ANSWER';

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
    replyTo: threadId,
    ver,
  })
  .then(result => dispatch(fetchAstronomerAnswerRepliesSuccess(Object.assign({ threadId, showOnlyTopReply }, result.data))))
  .catch(error => dispatch(fetchAstronomerAnswerRepliesFail(error)));
};

const toggleAnswerReplies = payload => dispatch => (dispatch({
  type: TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES,
  payload,
}));

export const toggleAndDisplayReplies = payload => (dispatch, getState) => {
  const { showReplies } = payload;

  if (showReplies) {
    dispatch(fetchAstronomerAnswerReplies(Object.assign({ showOnlyTopReply: true }, payload)));
  }

  dispatch(toggleAnswerReplies(payload));
};

export const replyToAnswer = payload => dispatch => (dispatch({
  type: REPLY_TO_ASTRONOMER_ANSWER,
  payload,
}));

const toggleAllAnswerReplies = payload => dispatch => (dispatch({
  type: TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES,
  payload,
}));

export const updateAnswerRepliesDisplayList = payload => dispatch => (dispatch({
  type: UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST,
  payload,
}));

export const toggleAllAnswerRepliesAndDisplay = payload => (dispatch, getState) => {
  const { showAllReplies } = payload;

  if (showAllReplies) {
    dispatch(fetchAstronomerAnswerReplies(Object.assign({ showOnlyTopReply: false }, payload)));
  }

  dispatch(toggleAllAnswerReplies(payload));
};
