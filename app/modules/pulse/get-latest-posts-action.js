import axios from 'axios';

export const FETCH_PAGE_META_START = 'FETCH_PAGE_META_START';
export const FETCH_PAGE_META_SUCCESS = 'FETCH_PAGE_META_SUCCESS';

export const FETCH_FEATURED_CONTENT_START = 'FETCH_FEATURED_CONTENT_START';
export const FETCH_FEATURED_CONTENT_SUCCESS = 'FETCH_FEATURED_CONTENT_SUCCESS';

export const FETCH_LATEST_POSTS_START = 'FETCH_LATEST_POSTS_START';
export const FETCH_LATEST_POSTS_SUCCESS = 'FETCH_LATEST_POSTS_SUCCESS';
export const FETCH_LATEST_POSTS_FAIL = 'FETCH_LATEST_POSTS_FAIL';

const fetchPageMetaStart = () => ({
  type: FETCH_PAGE_META_START,
});

const fetchPageMetaSuccess = payload => ({
  type: FETCH_PAGE_META_SUCCESS,
  payload,
});

const fetchPageMeta = () => (dispatch) => {
  dispatch(fetchPageMetaStart());
  return axios.post('/api/content/getPulsePostListPageLayout')
  .then(result => dispatch(fetchPageMetaSuccess(result.data)));
};

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

  const postsType = type ? { type } : '';

  dispatch(fetchLatestPostsStart());
  dispatch(fetchPageMeta());

  return axios.post('/api/content/getLatestContent', {
    cid,
    count: 10,
    page,
    ...postsType
  })
  .then(result => dispatch(fetchLatestPostsSuccess(result.data)))
  .catch(error => dispatch(fetchLatestPostsFail(error)));
};
