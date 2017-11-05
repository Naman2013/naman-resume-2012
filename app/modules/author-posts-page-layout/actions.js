import axios from 'axios';


export const FETCH_AUTHOR_PAGE_META_START = 'FETCH_AUTHOR_PAGE_META_START';
export const FETCH_AUTHOR_PAGE_META_SUCCESS = 'FETCH_AUTHOR_PAGE_META_SUCCESS';

const fetchMetaStart = () => ({
  type: FETCH_AUTHOR_PAGE_META_START,
});

const fetchMetaSuccess = payload => ({
  type: FETCH_AUTHOR_PAGE_META_SUCCESS,
  payload,
});

export const fetchPageMeta = authorId => (dispatch) => {
  dispatch(fetchMetaStart());
  return axios.post(' /api/content/getAuthorPostListPageLayout', {
    authorId,
  })
  .then(result => dispatch(fetchMetaSuccess(result.data)));
};
