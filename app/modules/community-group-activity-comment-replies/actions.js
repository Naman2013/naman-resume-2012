import { getReplies } from '../../services/discussions/get-replies';
import { submitReply } from '../../services/discussions/submit-reply';

export const FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_FAIL = 'FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_FAIL';
export const FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_START = 'FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_START';
export const FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_SUCCESS = 'FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_SUCCESS';
export const REPLY_TO_GROUP_COMMENT_FAIL = 'REPLY_TO_GROUP_COMMENT_FAIL';
export const REPLY_TO_GROUP_COMMENT_START = 'REPLY_TO_GROUP_COMMENT_START';
export const REPLY_TO_GROUP_COMMENT_SUCCESS = 'REPLY_TO_GROUP_COMMENT_SUCCESS';
export const TOGGLE_ALL_GROUP_COMMENT_REPLIES = 'TOGGLE_ALL_GROUP_COMMENT_REPLIES';
export const TOGGLE_GROUP_COMMENT_REPLIES = 'TOGGLE_GROUP_COMMENT_REPLIES';
export const UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_REPLIES_DISPLAY_LIST = 'UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_REPLIES_DISPLAY_LIST';
export const COMMENT_REPLY_UPDATE_SUBMITTED = 'COMMENT_REPLY_UPDATE_SUBMITTED';

const fetchGroupCommentRepliesStart = payload => ({
  type: FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_START,
  payload,
});

const fetchGroupCommentRepliesSuccess = payload => ({
  type: FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_SUCCESS,
  payload,
});

const fetchGroupCommentRepliesFail = payload => ({
  type: FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_SUCCESS,
  payload,
});

export const fetchGroupCommentReplies = ({
  at,
  cid,
  lang,
  token,
  threadId,
  ver,
  replyTo,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchGroupCommentRepliesStart({ replyTo }));
  return getReplies({
    at,
    callSource: 'groups',
    cid,
    count: -1,
    lang,
    token,
    threadId,
    replyTo,
    ver,
  })
  .then(result => dispatch(fetchGroupCommentRepliesSuccess(Object.assign({ replyTo }, result.data))))
  .catch(error => dispatch(fetchGroupCommentRepliesFail(Object.assign({ replyTo }, error))));
};

export const toggleCommentReplies = payload => ({
  type: TOGGLE_GROUP_COMMENT_REPLIES,
  payload,
});

export const toggleAndDisplayReplies = payload => (dispatch, getState) => {
  const { showAllReplies } = payload;

  if (showAllReplies) {
    dispatch(fetchGroupCommentReplies(payload));
  } else {
    dispatch(toggleAllCommentReplies(payload));
  }
};

const replyToCommentStart = payload => ({
  type: REPLY_TO_GROUP_COMMENT_START,
  payload,
});

const replyToCommentSuccess = payload => ({
  type: REPLY_TO_GROUP_COMMENT_SUCCESS,
  payload,
});

const replyToCommentFail = payload => ({
  type: REPLY_TO_GROUP_COMMENT_FAIL,
  payload,
});

const updatedSubmittedReply = payload => ({
  type: COMMENT_REPLY_UPDATE_SUBMITTED,
  payload
});

export const replyToComment = ({
  lang,
  ver,
  topicId,
  threadId,
  replyTo,
  content,
  objectId,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(replyToCommentStart({ replyTo }))
  return submitReply({
    at,
    callSource: 'groups',
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
  .then((result) => {
    dispatch(updatedSubmittedReply({ replyTo, submitted: true }));
    setTimeout(() => dispatch(updatedSubmittedReply({ replyTo, submitted: false })), 3000)
    return dispatch(replyToCommentSuccess(Object.assign({ replyTo, threadId }, result.data)));
  })
  .catch(error => dispatch(replyToCommentFail(Object.assign({ replyTo }, error))));
};

export const toggleAllCommentReplies = payload => ({
  type: TOGGLE_ALL_GROUP_COMMENT_REPLIES,
  payload,
});

export const updateCommentRepliesDisplayList = payload => ({
  type: UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_REPLIES_DISPLAY_LIST,
  payload,
});

export const toggleAllCommentRepliesAndDisplay = payload => (dispatch, getState) => {
  const { showAllReplies } = payload;

  if (showAllReplies) {
    dispatch(fetchGroupCommentReplies(payload));
  }

  dispatch(toggleAllCommentReplies(payload));
};
