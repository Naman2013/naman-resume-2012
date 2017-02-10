import axios from 'axios';

export const FETCH_REPLIES_START = 'FETCH_REPLIES_START';
export const FETCH_REPLIES_SUCCESS = 'FETCH_REPLIES_SUCCESS';
export const FETCH_REPLIES_FAIL = 'FETCH_REPLIES_FAIL';

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
  parentId,
  page,
  count,
  replyTo,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchRepliesStart());

  return axios.post('/api/forum/getReplies', {
    cid,
    at,
    token,
    lang,
    ver,
    threadId,
    topicId,
    parentId,
    page,
    count,
    replyTo,
  })
  .then(result => {
    const { replies } = result.data;
    // Below will be implemented in the next iteration.
    /*
    replies.forEach(reply => {
      if (reply.replies.length > 0) {
        dispatch(fetchReplies({
          parentId,
          threadId: reply.threadId,
          topicId,
          replyTo: reply.threadId,
        }))
      }
    });
    */

    dispatch(fetchRepliesSuccess(Object.assign(result.data, { threadId })));
  })
  .catch(error => dispatch(fetchRepliesFail(error)));
};
