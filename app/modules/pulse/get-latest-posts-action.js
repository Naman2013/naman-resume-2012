import axios from 'axios';
import { getFeaturedContent } from '../../services/featured-content/get-featured-content';

export const FETCH_POPULAR_POSTS_START = 'FETCH_POPULAR_POSTS';
export const FETCH_POPULAR_POSTS_SUCCESS = 'FETCH_POPULAR_POSTS_SUCCESS';

export const FETCH_PAGE_META_START = 'FETCH_PAGE_META_START';
export const FETCH_PAGE_META_SUCCESS = 'FETCH_PAGE_META_SUCCESS';

export const FETCH_FEATURED_CONTENT_START = 'FETCH_FEATURED_CONTENT_START';
export const FETCH_FEATURED_CONTENT_SUCCESS = 'FETCH_FEATURED_CONTENT_SUCCESS';

export const FETCH_LATEST_POSTS_START = 'FETCH_LATEST_POSTS_START';
export const FETCH_LATEST_POSTS_SUCCESS = 'FETCH_LATEST_POSTS_SUCCESS';
export const FETCH_LATEST_POSTS_FAIL = 'FETCH_LATEST_POSTS_FAIL';

const fetchPopularPostsStart = () => ({
  type: FETCH_POPULAR_POSTS_START,
});

const fetchPopularPostsSuccess = payload => ({
  type: FETCH_POPULAR_POSTS_SUCCESS,
  payload,
});

const fetchPopularPosts = () => (dispatch) => {
  dispatch(fetchPopularPostsStart());
  return getFeaturedContent({
    featuredType: 'popularPosts',
  })
  .then(result => dispatch(fetchPopularPostsSuccess(result.data)));
};

const fetchPageMetaStart = () => ({
  type: FETCH_PAGE_META_START,
});

const fetchPageMetaSuccess = payload => ({
  type: FETCH_PAGE_META_SUCCESS,
  payload,
});

export const fetchPageMeta = () => (dispatch) => {
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

export const fetchLatestPosts = (path, type, page) => (dispatch, getState) => {
  const { cid } = getState().user;
  const { postsPerPage } = getState().latestPosts;
  const url = path === 'latest-posts' ? '/api/content/getLatestContent' : '/api/content/getHottestContent';

  const postsType = type ? { type: [type] } : '';

  dispatch(fetchLatestPostsStart());
  dispatch(fetchPopularPosts());

  return axios.post(url, {
    cid,
    count: postsPerPage,
    page,
    ...postsType
  })
  .then(result => dispatch(fetchLatestPostsSuccess(Object.assign({ page }, result.data))))
  .catch(error => dispatch(fetchLatestPostsFail(error)));
};
