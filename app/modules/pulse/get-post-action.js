import axios from 'axios';

export const FETCH_POST_START = 'FETCH_POST_START';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAIL = 'FETCH_POST_FAIL';

export const FETCH_PAGE_META_START = 'FETCH_PAGE_META_START';
export const FETCH_PAGE_META_SUCCESS = 'FETCH_PAGE_META_SUCCESS';

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

  return axios.post('/api/content/getPost', {
    cid,
    postId: id,
  })
  .then(result => {
    dispatch(fetchMeta(result.data.posts[0].slugLookupId));
    dispatch(fetchPostSuccess(result.data));
  })
  .catch(error => dispatch(fetchPostFail(error)));
};
