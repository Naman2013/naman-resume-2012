import axios from 'axios';
import { getFeaturedContent } from '../../services/featured-content/get-featured-content';

export const FETCH_POST_START = 'FETCH_POST_START';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAIL = 'FETCH_POST_FAIL';

export const FETCH_PAGE_META_START = 'FETCH_PAGE_META_START';
export const FETCH_PAGE_META_SUCCESS = 'FETCH_PAGE_META_SUCCESS';

export const FETCH_POPULAR_POSTS_START = 'FETCH_POPULAR_POSTS_START';
export const FETCH_POPULAR_POSTS_SUCCESS = 'FETCH_POPULAR_POSTS_SUCCESS';

export const FETCH_MORE_ABOUT_OBJECT_START = 'FETCH_MORE_ABOUT_OBJECT_START';
export const FETCH_MORE_ABOUT_OBJECT_SUCCESS = 'FETCH_MORE_ABOUT_OBJECT_SUCCESS';

export const FETCH_CONTENT_START = 'FETCH_CONTENT_START';
export const FETCH_CONTENT_SUCCESS = 'FETCH_CONTENT_SUCCESS';
export const FETCH_CONTENT_FAIL = 'FETCH_CONTENT_FAIL';

const fetchMoreAboutObjectStart = () => ({
  type: FETCH_MORE_ABOUT_OBJECT_START,
});

const fetchMoreAboutObjectSuccess = payload => ({
  type: FETCH_MORE_ABOUT_OBJECT_SUCCESS,
  payload,
});

export const fetchMoreAboutObject = ({ slugLookupId, ignorePostId = 1 }) => (dispatch) => {
  dispatch(fetchMoreAboutObjectStart());
  return getFeaturedContent({
    featuredType: 'moreAbout',
    slugLookupId,
    ignorePostId,
  })
  .then(result => dispatch(fetchMoreAboutObjectSuccess(result.data)));
};

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

const fetchMetaStart = () => ({
  type: FETCH_PAGE_META_START,
});

const fetchMetaSuccess = payload => ({
  type: FETCH_PAGE_META_SUCCESS,
  payload,
});

const fetchMeta = slugLookupId => (dispatch) => {
  dispatch(fetchMetaStart());
  return axios.post(' /api/content/getPulsePostContentPageLayout', {
    slugLookupId,
  })
  .then(result => dispatch(fetchMetaSuccess(result.data)));
};

const fetchContentStart = () => ({
  type: FETCH_CONTENT_START,
});

const fetchContentSuccess = payload => ({
  type: FETCH_CONTENT_SUCCESS,
  payload,
});

const fetchContentFail = payload => ({
  type: FETCH_CONTENT_SUCCESS,
  payload,
});

export const fetchContent = ({
  page = 1,
  ignorePostId,
  authorId,
  slug,
  slugLookupId,
  callSource = 'community',
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { content } = getState().post;
  dispatch(fetchContentStart());
  return axios.post(' /api/content/getContent', {
    cid,
    at,
    token,
    callSource,
    excludePosts: ignorePostId ? [ignorePostId] : null,
    authorId,
    page,
    slug,
    slugLookupId,
    count: content.count,
  })
  .then(result => dispatch(fetchContentSuccess(Object.assign({ page }, result.data))))
  .catch(error => dispatch(fetchContentFail(error)));
};


const fetchPostStart = () => ({
  type: FETCH_POST_START,
});

const fetchPostSuccess = payload => ({
  type: FETCH_POST_SUCCESS,
  payload,
});

const fetchPostFail = payload => ({
  type: FETCH_POST_FAIL,
  payload,
});

export const fetchPost = id => (dispatch, getState) => {
  const { cid } = getState().user;

  dispatch(fetchPostStart());
  dispatch(fetchPopularPosts());

  return axios.post('/api/content/getPost', {
    cid,
    postId: id,
  })
  .then(result => {
    /**
      only attempt to fetch the remaining bits of content when there
      is no apiError detected

      if there is an API error, place that content into the state to allow
      others to know there was an APIError and they can handle it
      */
    if (!result.data.apiError) {
      dispatch(fetchMeta(result.data.posts[0].slugLookupId));
      dispatch(fetchPostSuccess(result.data));
      dispatch(fetchMoreAboutObject({
        slugLookupId: result.data.posts[0].slugLookupId,
        ignorePostId: id,
      }));
      dispatch(fetchContent({
        authorId: result.data.posts[0].customerId,
        ignorePostId: id,
      }));
    } else {
      dispatch(fetchPostSuccess(result.data));
    }
  })
  .catch(error => dispatch(fetchPostFail(error)));
};
