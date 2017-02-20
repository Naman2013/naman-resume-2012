import axios from 'axios';

export const FETCH_LATEST_POSTS_START = 'FETCH_LATEST_POSTS_START';
export const FETCH_LATEST_POSTS_SUCCESS = 'FETCH_LATEST_POSTS_SUCCESS';
export const FETCH_LATEST_POSTS_FAIL = 'FETCH_LATEST_POSTS_FAIL';

const fetchLatestPostsStart = () => ({
  type: FETCH_LATEST_POSTS_START,
});

const fetchLatestPostsSuccess = payload => ({
  type: FETCH_LATEST_POSTS_SUCCESS,
  payload,
});

const fetchLatestPostsFail = payload => ({
  type: FETCH_LATEST_POSTS_FAIL,
  payload,
});

export const fetchLatestPosts = (type, page) => (dispatch, getState) => {
  const { cid } = getState().user;

  const postsType = type ? { type: type } : '';

  dispatch(fetchLatestPostsStart());

  return axios.post('/api/content/getLatestContent', {
    cid,
    count: 10,
    page,
    ...postsType
  })
    .then(result => dispatch(fetchLatestPostsSuccess(result.data)))
    .catch(error => dispatch(fetchLatestPostsFail(error)));
};
