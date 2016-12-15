import axios from 'axios';

export const FETCH_OBJECT_CONTENT_START = 'FETCH_OBJECT_CONTENT_START';
export const FETCH_OBJECT_CONTENT_SUCCESS = 'FETCH_OBJECT_CONTENT_SUCCESS';
export const FETCH_OBJECT_CONTENT_FAIL = 'FETCH_OBJECT_CONTENT_FAIL';

export const fetchObjectContent = ({ objectId, callSource, scope, count, page }) => (dispatch, getState) => {
  dispatch(fetchContentStart());
  return axios.post('');
}

const fetchContentStart = () => ({
  type: FETCH_OBJECT_CONTENT_START,
});
