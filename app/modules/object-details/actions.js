import createReducer from '../utils/createReducer';

// services
import fetchObjectDataService from '../../services/objects/object-data';

export const FETCH_OBJECT_DATA = 'FETCH_OBJECT_DATA';
export const FETCH_OBJECT_DATA_START = 'FETCH_OBJECT_DATA_START';
export const FETCH_OBJECT_DATA_FAIL = 'FETCH_OBJECT_DATA_FAIL';
export const FETCH_OBJECT_DATA_SUCCESS = 'FETCH_OBJECT_DATA_SUCCESS';

export const fetchObjectDataAction = objectId => (dispatch, getState) => {
  dispatch(fetchObjectDataActionStart());

  const { token, at, cid } = getState().user;

  return fetchObjectDataService({
    token,
    at,
    cid,
    objectId,
  }).then(result => dispatch(fetchObjectDataActionSuccess(result.data)));
};

const fetchObjectDataActionStart = () => ({
  type: FETCH_OBJECT_DATA_START,
});

const fetchObjectDataActionSuccess = payload => ({
  type: FETCH_OBJECT_DATA_SUCCESS,
  payload,
});

const fetchObjectDataActionError = payload => ({
  type: FETCH_OBJECT_DATA_FAIL,
  payload,
});
