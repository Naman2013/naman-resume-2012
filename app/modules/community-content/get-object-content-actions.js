import axios from 'axios';

export const FETCH_OBJECT_CONTENT_RESET = 'FETCH_OBJECT_CONTENT_START';
export const FETCH_OBJECT_CONTENT_SUCCESS = 'FETCH_OBJECT_CONTENT_SUCCESS';
export const FETCH_OBJECT_CONTENT_FAIL = 'FETCH_OBJECT_CONTENT_FAIL';

export const fetchObjectContent = ({ objectId, callSource, scope, count, page, customKey, customValue }) => (dispatch, getState) => {
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

const fetchContentSuccess = (data) => ({
  type: FETCH_OBJECT_CONTENT_SUCCESS,
  payload: data,
});

const fetchContentError = (error) => ({
  type: FETCH_OBJECT_CONTENT_FAIL,
  payload: error,
});

export const fetchContentReset = () => ({
  type: FETCH_OBJECT_CONTENT_RESET,
});
