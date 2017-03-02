import axios from 'axios';

export const FETCH_SHOW_CONTENT_START = 'FETCH_SHOW_CONTENT_START';
export const FETCH_SHOW_CONTENT_SUCCESS = 'FETCH_SHOW_CONTENT_SUCCESS';
export const FETCH_SHOW_CONTENT_FAIL = 'FETCH_SHOW_CONTENT_FAIL';

const fetchContentStart = () => ({
  type: FETCH_SHOW_CONTENT_START,
});

const fetchContentSuccess = payload => ({
  type: FETCH_SHOW_CONTENT_SUCCESS,
  payload,
});

const fetchContentFailure = payload => ({
  type: FETCH_SHOW_CONTENT_FAIL,
  payload,
});

export const fetchShowContent = ({
  showId,
  listType,
}) => (dispatch, getState) => {
  const { cid } = getState().user;
  dispatch(fetchContentStart());
  if (showId) {
    return axios.post('/api/content/getShowContent', {
      cid,
      showId,
      listType,
    })
    .then(result => dispatch(fetchContentSuccess(result.data)))
    .catch(error => dispatch(fetchContentFailure(error)));
  }
};
