import createReducer from '../utils/createReducer';

// services
import fetchObjectDetailsService from '../../services/objects/object-details';
import fetchObjectDataService from '../../services/objects/object-data';
import fetchObjectMissionsService from '../../services/objects/object-missions';
import fetchObjectQuestsService from '../../services/objects/object-quests';
import fetchObjectFollowService from '../../services/objects/object-follow';
import fetchObjectSpecialistsService from '../../services/objects/specialists';

/* getObjectDetails */
export const FETCH_OBJECT_DETAILS = 'FETCH_OBJECT_DETAILS';
export const FETCH_OBJECT_DETAILS_START = 'FETCH_OBJECT_DETAILS_START';
export const FETCH_OBJECT_DETAILS_FAIL = 'FETCH_OBJECT_DETAILS_FAIL';
export const FETCH_OBJECT_DETAILS_SUCCESS = 'FETCH_OBJECT_DETAILS_SUCCESS';
export const RESET_OBJECT_DETAILS = 'RESET_OBJECT_DETAILS';

/* getObjectData */
export const FETCH_OBJECT_DATA = 'FETCH_OBJECT_DATA';
export const FETCH_OBJECT_DATA_START = 'FETCH_OBJECT_DATA_START';
export const FETCH_OBJECT_DATA_FAIL = 'FETCH_OBJECT_DATA_FAIL';
export const FETCH_OBJECT_DATA_SUCCESS = 'FETCH_OBJECT_DATA_SUCCESS';
export const RESET_OBJECT_DATA = 'RESET_OBJECT_DATA';

/* getObjectMissions */
export const FETCH_OBJECT_MISSIONS = 'FETCH_OBJECT_MISSIONS';
export const FETCH_OBJECT_MISSIONS_START = 'FETCH_OBJECT_MISSIONS_START';
export const FETCH_OBJECT_MISSIONS_FAIL = 'FETCH_OBJECT_MISSIONS_FAIL';
export const FETCH_OBJECT_MISSIONS_SUCCESS = 'FETCH_OBJECT_MISSIONS_SUCCESS';

/* getObjectQuests */
export const FETCH_OBJECT_QUESTS = 'FETCH_OBJECT_QUESTS';
export const FETCH_OBJECT_QUESTS_START = 'FETCH_OBJECT_QUESTS_START';
export const FETCH_OBJECT_QUESTS_FAIL = 'FETCH_OBJECT_QUESTS_FAIL';
export const FETCH_OBJECT_QUESTS_SUCCESS = 'FETCH_OBJECT_QUESTS_SUCCESS';

/* getObjectFollow */
export const FETCH_OBJECT_FOLLOW = 'FETCH_OBJECT_FOLLOW';
export const FETCH_OBJECT_FOLLOW_START = 'FETCH_OBJECT_FOLLOW_START';
export const FETCH_OBJECT_FOLLOW_FAIL = 'FETCH_OBJECT_FOLLOW_FAIL';
export const FETCH_OBJECT_FOLLOW_SUCCESS = 'FETCH_OBJECT_FOLLOW_SUCCESS';

/*getObjectSpecialists */
export const FETCH_OBJECT_SPECIALISTS = 'FETCH_OBJECT_SPECIALISTS';
export const FETCH_OBJECT_SPECIALISTS_START = 'FETCH_OBJECT_SPECIALISTS_START';
export const FETCH_OBJECT_SPECIALISTS_FAIL = 'FETCH_OBJECT_SPECIALISTS_FAIL';
export const FETCH_OBJECT_SPECIALISTS_SUCCESS = 'FETCH_OBJECT_SPECIALISTS_SUCCESS';
export const RESET_OBJECT_SPECIALISTS = 'RESET_OBJECT_SPECIALISTS';



//////////////////////////
/* FETCH OBJECT DETAILS */

export const fetchObjectDetailsAction = (objectId) => (dispatch, getState) => {
  dispatch(fetchObjectDetailsActionStart());

  const { token, at, cid } = getState().user;

  return fetchObjectDetailsService({
    token,
    at,
    cid,
    objectId,
  }).then(
    result => {
      dispatch(fetchObjectDetailsActionSuccess(result.data));
    }
  );
};

export const resetObjectDetails = () => ({
  type: RESET_OBJECT_DETAILS,
});


///////////////////////
/* FETCH OBJECT DATA */

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

export const resetObjectData = () => ({
  type: RESET_OBJECT_DATA,
});


///////////////////////////
/* FETCH OBJECT MISSIONS */

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


/////////////////////////
/* FETCH OBJECT QUESTS */

export const fetchObjectQuestsAction = (objectId) => (dispatch, getState) => {
  dispatch(fetchObjectQuestsActionStart());

  const { token, at, cid } = getState().user;

  return fetchObjectQuestsService({
    token,
    at,
    cid,
    objectId,
  }).then(
    result => {
      dispatch(fetchObjectQuestsActionSuccess(result.data));
    }
  );
};


/////////////////////////
/* FETCH FOLLOW OBJECT */

export const fetchObjectFollowAction = (objectId) => (dispatch, getState) => {
  dispatch(fetchObjectFollowActionStart());

  const { token, at, cid } = getState().user;

  return fetchObjectFollowService({
    token,
    at,
    cid,
    objectId,
  }).then(
    result => {
      dispatch(fetchObjectFollowActionSuccess(result.data));
    }
  );
};


//////////////////////////////
/* FETCH OBJECT SPECIALISTS */

export const fetchObjectSpecialistsAction = (objectId) => (dispatch, getState) => {
  dispatch(fetchObjectSpecialistsActionStart());

  const { token, at, cid } = getState().user;

  return fetchObjectSpecialistsService({
    token,
    at,
    cid,
    objectId,
  }).then(
    result => {
      dispatch(fetchObjectSpecialistsActionSuccess(result.data));
    }
  );
};

export const resetObjectSpecialists = () => ({
  type: RESET_OBJECT_SPECIALISTS,
});




////////////////////
/* fetch handlers */


// DETAILS
const fetchObjectDetailsActionStart = () => ({
  type: FETCH_OBJECT_DETAILS_START,
});

const fetchObjectDetailsActionSuccess = (payload) => ({
    type: FETCH_OBJECT_DETAILS_SUCCESS,
    payload,
});

const fetchObjectDetailsActionError = payload => ({
  type: FETCH_OBJECT_DETAILS_FAIL,
  payload,
});



// DATA
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


// MISSIONS
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


// QUESTS
const fetchObjectQuestsActionStart = () => ({
  type: FETCH_OBJECT_QUESTS_START,
});

const fetchObjectQuestsActionSuccess = (payload) => ({
    type: FETCH_OBJECT_QUESTS_SUCCESS,
    payload,
});

const fetchObjectQuestsActionError = payload => ({
  type: FETCH_OBJECT_QUESTS_FAIL,
  payload,
});


// FOLLOW
const fetchObjectFollowActionStart = () => ({
  type: FETCH_OBJECT_FOLLOW_START,
});

const fetchObjectFollowActionSuccess = (payload) => ({
    type: FETCH_OBJECT_FOLLOW_SUCCESS,
    payload,
});

const fetchObjectFollowActionError = payload => ({
  type: FETCH_OBJECT_FOLLOW_FAIL,
  payload,
});


// SPECIALISTS
const fetchObjectSpecialistsActionStart = () => ({
  type: FETCH_OBJECT_SPECIALISTS_START,
});

const fetchObjectSpecialistsActionSuccess = (payload) => ({
    type: FETCH_OBJECT_SPECIALISTS_SUCCESS,
    payload,
});

const fetchObjectSpecialistsActionError = payload => ({
  type: FETCH_OBJECT_SPECIALISTS_FAIL,
  payload,
});