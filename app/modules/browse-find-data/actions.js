import createReducer from '../utils/createReducer';

// services
import fetchBrowseFindDataService from '../../services/browse-find-data/browse-find-data';

/* findData */
export const FETCH_BROWSE_FIND_DATA = 'FETCH_BROWSE_FIND_DATA';
export const FETCH_BROWSE_FIND_DATA_START = 'FETCH_BROWSE_FIND_DATA_START';
export const FETCH_BROWSE_FIND_DATA_FAIL = 'FETCH_BROWSE_FIND_DATA_FAIL';
export const FETCH_BROWSE_FIND_DATA_SUCCESS = 'FETCH_BROWSE_FIND_DATA_SUCCESS';
export const FETCH_BROWSE_FIND_DATA_RESET = 'FETCH_BROWSE_FIND_DATA_RESET';

/* Find Data */
export const resetBrowseFindDataAction = () => (dispatch, getState) => {
  dispatch(fetchBrowseFindDataActionReset());
}

export const fetchBrowseFindDataAction = (findTerm) => (dispatch, getState) => {
  dispatch(fetchBrowseFindDataActionStart());

  const { token, at, cid } = getState().user;

  return fetchBrowseFindDataService({
    token,
    at,
    cid,
    findTerm,
  }).then(
    result => {
      dispatch(fetchBrowseFindDataActionSuccess(result.data));
    }
  );
};

const fetchBrowseFindDataActionStart = () => ({
  type: FETCH_BROWSE_FIND_DATA_START,
});

const fetchBrowseFindDataActionSuccess = (payload) => ({
    type: FETCH_BROWSE_FIND_DATA_SUCCESS,
    payload,
});

const fetchBrowseFindDataActionError = payload => ({
  type: FETCH_BROWSE_FIND_DATA_FAIL,
  payload,
});

const fetchBrowseFindDataActionReset = payload => ({
  type: FETCH_BROWSE_FIND_DATA_RESET,
  payload,
});
