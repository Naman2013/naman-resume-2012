import createReducer from '../utils/createReducer';

// services
import fetchBrowseTaggedDataService from '../../services/browse-tagged-data/browse-tagged-data';

/* browseTaggedData */
export const FETCH_BROWSE_TAGGED_DATA = 'FETCH_BROWSE_TAGGED_DATA';
export const FETCH_BROWSE_TAGGED_DATA_START = 'FETCH_BROWSE_TAGGED_DATA_START';
export const FETCH_BROWSE_TAGGED_DATA_FAIL = 'FETCH_BROWSE_TAGGED_DATA_FAIL';
export const FETCH_BROWSE_TAGGED_DATA_SUCCESS = 'FETCH_BROWSE_TAGGED_DATA_SUCCESS';


export const fetchBrowseTaggedDataAction = (contentTypes) => (dispatch, getState) => {
  dispatch(fetchBrowseTaggedDataActionStart());

  const { token, at, cid } = getState().user;

  return fetchBrowseTaggedDataService({
    token,
    at,
    cid,
    contentTypes,
  }).then(
    result => {
      dispatch(fetchBrowseTaggedDataActionSuccess(result.data));
    }
  );
};

const fetchBrowseTaggedDataActionStart = () => ({
  type: FETCH_BROWSE_TAGGED_DATA_START,
});

const fetchBrowseTaggedDataActionSuccess = (payload) => ({
    type: FETCH_BROWSE_TAGGED_DATA_SUCCESS,
    payload,
});

const fetchBrowseTaggedDataActionError = payload => ({
  type: FETCH_BROWSE_TAGGED_DATA_FAIL,
  payload,
});
