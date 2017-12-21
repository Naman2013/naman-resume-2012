import axios from 'axios';
import { getFeaturedContent } from '../../services/featured-content/get-featured-content';

export const FETCH_POPULAR_POSTS_START = 'FETCH_POPULAR_POSTS';
export const FETCH_POPULAR_POSTS_SUCCESS = 'FETCH_POPULAR_POSTS_SUCCESS';

export const FETCH_PAGE_META_START = 'FETCH_PAGE_META_START';
export const FETCH_PAGE_META_SUCCESS = 'FETCH_PAGE_META_SUCCESS';

export const FETCH_FEATURED_CONTENT_START = 'FETCH_FEATURED_CONTENT_START';
export const FETCH_FEATURED_CONTENT_SUCCESS = 'FETCH_FEATURED_CONTENT_SUCCESS';

export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL';

export const SEARCH_POSTS_START = 'SEARCH_POSTS_START';
export const SEARCH_POSTS_SUCCESS = 'SEARCH_POSTS_SUCCESS';
export const SEARCH_POSTS_FAIL = 'SEARCH_POSTS_FAIL';

export const RESET_ILLUMINATIONS_POSTS = 'RESET_ILLUMINATIONS_POSTS';

const fetchPopularPostsStart = () => ({
  type: FETCH_POPULAR_POSTS_START,
});

const fetchPopularPostsSuccess = payload => ({
  type: FETCH_POPULAR_POSTS_SUCCESS,
  payload,
});

export const fetchPopularPosts = () => (dispatch) => {
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

const fetchPostsStart = () => ({
  type: FETCH_POSTS_START,
});

const fetchPostsSuccess = payload => ({
  type: FETCH_POSTS_SUCCESS,
  payload,
});

const fetchPostsFail = payload => ({
  type: FETCH_POSTS_FAIL,
  payload,
});

export const fetchPosts = (path, type, page) => (dispatch, getState) => {
  const { cid } = getState().user;
  const { postsPerPage } = getState().illuminationsPosts;
  const url = path === 'latest-posts' ? '/api/content/getLatestContent' : '/api/content/getHottestContent';

  const postsType = type ? { type: [type] } : '';

  dispatch(fetchPostsStart());
  dispatch(fetchPopularPosts());

  return axios.post(url, {
    cid,
    count: postsPerPage,
    page,
    ...postsType
  })
  .then(result => dispatch(fetchPostsSuccess(Object.assign({ page }, result.data))))
  .catch(error => dispatch(fetchPostsFail(error)));
};

export const resetIlluminationsPosts = () => ({
  type: RESET_ILLUMINATIONS_POSTS,
});

const searchPostsStart = () => ({
  type: SEARCH_POSTS_START,
});

const searchPostsSuccess = payload => ({
  type: SEARCH_POSTS_SUCCESS,
  payload,
});

const searchPostsFail = payload => ({
  type: SEARCH_POSTS_FAIL,
  payload,
});

export const searchPosts = ({ searchterm, page }) => (dispatch, getState) => {
  const { cid } = getState().user;
  const { postsPerPage } = getState().illuminationsPosts;

  dispatch(searchPostsStart());

  return axios.post('/api/content/searchContent', {
    cid,
    count: postsPerPage,
    page,
    searchterm,
  })
  .then(result => dispatch(searchPostsSuccess(Object.assign({ page }, result.data))))
  .catch(error => dispatch(searchPostsFail(error)));
};
