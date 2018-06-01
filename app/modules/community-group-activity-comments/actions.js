import { getReplies } from '../../services/discussions/get-replies';
import { submitReply } from '../../services/discussions/submit-reply';

export const FETCH_GROUP_ACTIVITY_COMMENTS_START = 'FETCH_GROUP_ACTIVITY_COMMENTS_START';
export const FETCH_GROUP_ACTIVITY_COMMENTS_SUCCESS = 'FETCH_GROUP_ACTIVITY_COMMENTS_SUCCESS';
export const FETCH_GROUP_ACTIVITY_COMMENTS_FAIL = 'FETCH_GROUP_ACTIVITY_COMMENTS_FAIL';
export const UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_DISPLAY_LIST = 'UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_DISPLAY_LIST';
export const TOGGLE_ALL_GROUP_ACTIVITY_COMMENTS = 'TOGGLE_ALL_GROUP_ACTIVITY_COMMENTS';
export const REPLY_TO_ACTIVITY_START = 'REPLY_TO_ACTIVITY_START';
export const REPLY_TO_ACTIVITY_SUCCESS = 'REPLY_TO_ACTIVITY_SUCCESS';
export const REPLY_TO_ACTIVITY_FAIL = 'REPLY_TO_ACTIVITY_FAIL';
export const ACTIVITY_REPLY_UPDATE_SUBMITTED = 'ACTIVITY_REPLY_UPDATE_SUBMITTED';

const fetchGroupActivityCommentsStart = payload => ({
  type: FETCH_GROUP_ACTIVITY_COMMENTS_START,
  payload,
});

const fetchGroupActivityCommentsSuccess = payload => ({
  type: FETCH_GROUP_ACTIVITY_COMMENTS_SUCCESS,
  payload,
});

const fetchGroupActivityCommentsFail = payload => ({
  type: FETCH_GROUP_ACTIVITY_COMMENTS_SUCCESS,
  payload,
});

export const fetchGroupActivityComments = ({
  lang,
  threadId,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchGroupActivityCommentsStart({ threadId }));
  return getReplies({
    at,
    callSource: 'groups',
    cid,
    count: -1,
    lang,
    token,
    threadId,
    replyTo: threadId,
    ver,
  })
  .then(result => dispatch(fetchGroupActivityCommentsSuccess(Object.assign({ threadId }, result.data))))
  .catch(error => dispatch(fetchGroupActivityCommentsFail(Object.assign({ threadId }, error))));
};

const toggleAllActivityComments = payload => ({
    type: TOGGLE_ALL_GROUP_ACTIVITY_COMMENTS,
    payload,
});

export const toggleAllCommentsAndDisplay = payload => (dispatch, getState) => {
  const { showAllComments } = payload;

  if (showAllComments) {
    dispatch(fetchGroupActivityComments(payload));
  } else {
    dispatch(toggleAllActivityComments(payload));
  }
};

export const updateCommentsDisplayList = payload => dispatch => (dispatch({
  type: UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_DISPLAY_LIST,
  payload,
}));

const updatedSubmittedReply = payload => ({
  type: ACTIVITY_REPLY_UPDATE_SUBMITTED,
  payload
});
const replyToActivityStart = payload => ({
  type: REPLY_TO_ACTIVITY_START,
  payload,
});

const replyToActivitySuccess = payload => ({
  type: REPLY_TO_ACTIVITY_SUCCESS,
  payload,
});

const replyToActivityFail = payload => ({
  type: REPLY_TO_ACTIVITY_FAIL,
  payload,
});

export const replyToActivity = ({
  lang,
  ver,
  topicId,
  threadId,
  replyTo,
  content,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(replyToActivityStart({ replyTo }))
  return submitReply({
    at,
    callSource: 'groups',
    cid,
    content,
    lang,
    replyTo: threadId,
    threadId,
    token,
    topicId,
    ver,
  })
  .then(result => {
    dispatch(updatedSubmittedReply({ threadId, submitted: true }));
    setTimeout(() => dispatch(updatedSubmittedReply({ threadId, submitted: false })), 3000)
    return dispatch(replyToActivitySuccess(Object.assign({ threadId }, result.data)));
  })
  .catch(error => dispatch(replyToActivityFail(Object.assign({ replyTo }, error))));
};
