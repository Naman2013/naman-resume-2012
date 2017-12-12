import axios from 'axios';
import { getFeaturedContent } from '../../services/featured-content/get-featured-content';
import { getSharedMemberPhotos } from '../get-shared-member-photos/actions';
import { setPageTitle, setStandardMeta, setOpenGraphMeta } from '../pageLevelMetaContent/seo-actions';


export const FETCH_POST_START = 'FETCH_POST_START';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAIL = 'FETCH_POST_FAIL';

export const RESET_POST_PAGE_META = 'RESET_POST_PAGE_META';

export const FETCH_POST_PAGE_META_START = 'FETCH_POST_PAGE_META_START';
export const FETCH_POST_PAGE_META_SUCCESS = 'FETCH_POST_PAGE_META_SUCCESS';

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

const resetPageMeta = payload => ({
  type: RESET_POST_PAGE_META,
  payload,
});

const fetchMetaStart = () => ({
  type: FETCH_POST_PAGE_META_START,
});

const fetchMetaSuccess = payload => ({
  type: FETCH_POST_PAGE_META_SUCCESS,
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
  dispatch(resetPageMeta());
  dispatch(fetchPostStart());
  dispatch(fetchPopularPosts());

  return axios.post('/api/content/getPost', {
    cid,
    postId: id,
  })
  .then((result) => {
    if (!result.data.apiError) {
      // destructure and set page meta data for the post
      const { title, typeIconURL, excerpt } = result.data.posts[0];
      dispatch(setPageTitle(title));
      dispatch(setStandardMeta({ description: excerpt }));
      dispatch(setOpenGraphMeta({ title, description: excerpt, image: typeIconURL }));

      // fetch additional information with what we received from getPost
      dispatch(fetchMeta(result.data.posts[0].slugLookupId));
      dispatch(fetchMoreAboutObject({
        slugLookupId: result.data.posts[0].slugLookupId,
        ignorePostId: id,
      }));
      if (result.data.posts[0].showMemberPicturesFlag){
        dispatch(getSharedMemberPhotos({
          objectId: result.data.posts[0].objectId
        }))
      }
    } else {
      dispatch(fetchPostSuccess(result.data));
    }

    dispatch(fetchPostSuccess(result.data));
  })
  .catch(error => dispatch(fetchPostFail(error)));
};
