import axios from 'axios';

export const FETCH_CATALOG_START = 'FETCH_CATALOG_START';
export const FETCH_CATALOG_SUCCESS = 'FETCH_CATALOG_SUCCESS';
export const FETCH_CATALOG_FAIL = 'FETCH_CATALOG_FAIL';

export const fetchCatalog = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(startGetCatalog());
  return axios.post('/api/reservation/getCatalogList', {
    at,
    token,
    cid,
  })
  .then(result => dispatch(successGetCatalog(result.data)))
  .catch(error => dispatch(failGetCatalog(error)));
};

const startGetCatalog = () => ({
  type: FETCH_CATALOG_START,
});

const successGetCatalog = (data) => ({
  type: FETCH_CATALOG_SUCCESS,
  payload: data,
});

const failGetCatalog = ({ payload }) => ({
  type: FETCH_CATALOG_FAIL,
  payload,
});
