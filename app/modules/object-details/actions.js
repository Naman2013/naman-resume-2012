import createReducer from '../utils/createReducer';

// services
import fetchObjectDataService from '../../services/objects/object-data';
import fetchObjectMissionsService from '../../services/objects/object-missions';

/* getObjectData */
export const FETCH_OBJECT_DATA = 'FETCH_OBJECT_DATA';
export const FETCH_OBJECT_DATA_START = 'FETCH_OBJECT_DATA_START';
export const FETCH_OBJECT_DATA_FAIL = 'FETCH_OBJECT_DATA_FAIL';
export const FETCH_OBJECT_DATA_SUCCESS = 'FETCH_OBJECT_DATA_SUCCESS';

/* getObjectMissions */
export const FETCH_OBJECT_MISSIONS = 'FETCH_OBJECT_MISSIONS';
export const FETCH_OBJECT_MISSIONS_START = 'FETCH_OBJECT_MISSIONS_START';
export const FETCH_OBJECT_MISSIONS_FAIL = 'FETCH_OBJECT_MISSIONS_FAIL';
export const FETCH_OBJECT_MISSIONS_SUCCESS = 'FETCH_OBJECT_MISSIONS_SUCCESS';


export const fetchObjectDataAction = (objectId) => (dispatch, getState) => {
  dispatch(fetchObjectDataActionStart());

  const { token, at, cid } = getState().user;

  return fetchObjectDataService({
    token,
    at,
    cid,
    objectId,
  }).then(
    result => {
      dispatch(fetchObjectDataActionSuccess(result.data));
    }
  );
};

export const fetchObjectMissionsAction = (objectId) => (dispatch, getState) => {
  dispatch(fetchObjectMissionsActionStart());

  const { token, at, cid } = getState().user;

  return fetchObjectMissionsService({
    token,
    at,
    cid,
    objectId,
  }).then(
    result => {
      dispatch(fetchObjectMissionsActionSuccess(result.data));
    }
  );
};

const fetchObjectDataActionStart = () => ({
  type: FETCH_OBJECT_DATA_START,
});

const fetchObjectDataActionSuccess = (payload) => ({
    type: FETCH_OBJECT_DATA_SUCCESS,
    payload,
});

const fetchObjectDataActionError = payload => ({
  type: FETCH_OBJECT_DATA_FAIL,
  payload,
});

const fetchObjectMissionsActionStart = () => ({
  type: FETCH_OBJECT_MISSIONS_START,
});

const fetchObjectMissionsActionSuccess = (payload) => ({
    type: FETCH_OBJECT_MISSIONS_SUCCESS,
    payload,
});

const fetchObjectMissionsActionError = payload => ({
  type: FETCH_OBJECT_MISSIONS_FAIL,
  payload,
});
