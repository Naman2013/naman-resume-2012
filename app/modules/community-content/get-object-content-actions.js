import axios from 'axios';

export const FETCH_OBJECT_CONTENT_RESET = 'FETCH_OBJECT_CONTENT_START';
export const FETCH_OBJECT_CONTENT_SUCCESS = 'FETCH_OBJECT_CONTENT_SUCCESS';
export const FETCH_OBJECT_CONTENT_FAIL = 'FETCH_OBJECT_CONTENT_FAIL';

export const FETCH_COMMUNITY_CONTENT = 'FETCH_COMMUNITY_CONTENT_START';
export const FETCH_COMMUNITY_CONTENT_SUCCESS = 'FETCH_COMMUNITY_CONTENT_SUCCESS';
export const FETCH_COMMUNITY_CONTENT_FAIL = 'FETCH_COMMUNITY_CONTENT_FAIL';

const fetchCommunityContentStart = () => ({
  type: FETCH_COMMUNITY_CONTENT,
  payload: {},
});

const fetchCommunityContentSuccess = (data) => ({
  type: FETCH_COMMUNITY_CONTENT_SUCCESS,
  payload: data,
});

const fetchCommunityContentError = (error) => ({
  type: FETCH_COMMUNITY_CONTENT_FAIL,
  payload: error,
});

export const fetchContentReset = () => ({
  type: FETCH_OBJECT_CONTENT_RESET,
});

const fetchContentSuccess = (data) => ({
  type: FETCH_OBJECT_CONTENT_SUCCESS,
  payload: data,
});

const fetchContentError = (error) => ({
  type: FETCH_OBJECT_CONTENT_FAIL,
  payload: error,
});

export const fetchObjectContent = ({
  objectId,
  callSource,
  scope,
  count,
  page,
  customKey,
  customValue,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;

  dispatch(fetchContentReset());

  return axios.post('/api/content/getObjectContent', {
    at,
    token,
    cid,
    objectId,
    callSource,
    scope,
    count,
    page,
    customKey,
    customValue,
  })
    .then(result => dispatch(fetchContentSuccess(result.data)))
    .catch(error => dispatch(fetchContentError(error)));
};

export const fetchCommunityContent = () => (dispatch, getState) => {
  const { cid } = getState().user;

  dispatch(fetchCommunityContentStart());

  return axios.post('/api/content/getHomePageContent', {
    cid,
  })
    .then(result => dispatch(fetchCommunityContentSuccess(result.data)))
    .catch(error => dispatch(fetchCommunityContentError(error)));
};
