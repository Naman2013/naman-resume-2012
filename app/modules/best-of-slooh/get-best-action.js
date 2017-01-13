import axios from 'axios';

export const FETCH_BEST_START = 'FETCH_BEST_START';
export const FETCH_BEST_SUCCESS = 'FETCH_BEST_SUCCESS';
export const FETCH_BEST_FAIL = 'FETCH_BEST_FAIL';

export const fetchBest = (id) => (dispatch, getState) => {
  const { cid } = getState().user;
    
  dispatch(fetchBestStart());
  
  return axios.post('/api/content/getBestOf', {
    cid
  })
    .then(result => dispatch(fetchBestSuccess(result.data)))
    .catch(error => dispatch(fetchBestFail(error)));
};

const fetchBestStart = () => ({
  type: FETCH_BEST_START,
});

const fetchBestSuccess = (payload) => ({
  type: FETCH_BEST_SUCCESS,
  payload,
});

const fetchBestFail = (payload) => ({
  type: FETCH_BEST_FAIL,
  payload,
});
