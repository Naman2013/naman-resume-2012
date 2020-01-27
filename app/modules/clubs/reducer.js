import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('clubs', [
  '~GET_CLUBS',
  '~GET_TOP_THREADS',
  '~GET_PROFILE_GROUP',
]);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,
  topThreadsList: [],
  serverError: null,
  profileGroupList: [],
};

export default handleActions(
  {
    [TYPE.GET_CLUBS]: getClubs,
    [TYPE.GET_CLUBS_SUCCESS]: getClubsSuccess,
    [TYPE.GET_CLUBS_ERROR]: getClubsError,
    [TYPE.GET_TOP_THREADS]: getTopThreadsStart,
    [TYPE.GET_TOP_THREADS_SUCCESS]: getTopThreadsSuccess,
    [TYPE.GET_TOP_THREADS_ERROR]: getTopThreadsError,
    [TYPE.GET_PROFILE_GROUP]: getProfileGroup,
    [TYPE.GET_PROFILE_GROUP_SUCCESS]: getProfileGroupSuccess,
    [TYPE.GET_PROFILE_GROUP_ERROR]: getProfileGroupError,
  },
  initialState
);

function setFetching(state) {
  return { ...state, isFetching: true, isLoaded: false };
}
function getProfileGroup(state) {
  return { ...state, isFetching: true, isLoaded: false };
}

function getTopThreadsStart(state) {
  return { ...state, isFetching: true, isLoaded: false, topThreadsList: [] };
}

function getTopThreadsSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    topThreadsList: action.payload || [],
  };
}

function getTopThreadsError(state, action) {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
  };
}

function getClubs(state = initialState) {
  return {
    ...state,
    isFetching: true,
  };
}

function getClubsSuccess(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}

function getClubsError(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}

function getProfileGroupSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    profileGroupList: action.payload || [],
  };
}

function getProfileGroupError(state, action) {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
  };
}
