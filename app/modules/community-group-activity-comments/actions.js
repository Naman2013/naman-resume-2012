import { getReplies } from '../../services/discussions/get-replies';

export const FETCH_GROUP_ACTIVITY_COMMENTS_START = 'FETCH_GROUP_ACTIVITY_COMMENTS_START';
export const FETCH_GROUP_ACTIVITY_COMMENTS_SUCCESS = 'FETCH_GROUP_ACTIVITY_COMMENTS_SUCCESS';
export const FETCH_GROUP_ACTIVITY_COMMENTS_FAIL = 'FETCH_GROUP_ACTIVITY_COMMENTS_FAIL';
export const UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_DISPLAY_LIST = 'UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_DISPLAY_LIST';
export const TOGGLE_ALL_GROUP_ACTIVITY_COMMENTS = 'TOGGLE_ALL_GROUP_ACTIVITY_COMMENTS';

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
