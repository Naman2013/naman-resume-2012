import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('clubs', [
  '~GET_CLUBS',
  '~GET_TOP_THREADS',
  '~GET_GROUP_DELETE_INVITATION',
  '~DELETE_INVITATION',
]);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,
  topThreadsList: [],
  serverError: null,
  groupDeleteInvitation: {},
};

export default handleActions(
  {
    [TYPE.GET_CLUBS]: getClubs,
    [TYPE.GET_CLUBS_SUCCESS]: getClubsSuccess,
    [TYPE.GET_CLUBS_ERROR]: getClubsError,
    [TYPE.GET_TOP_THREADS]: getTopThreadsStart,
    [TYPE.GET_TOP_THREADS_SUCCESS]: getTopThreadsSuccess,
    [TYPE.GET_TOP_THREADS_ERROR]: getTopThreadsError,
    [TYPE.GET_GROUP_DELETE_INVITATION]: getGroupDeleteInvitationStart,
    [TYPE.GET_GROUP_DELETE_INVITATION_SUCCESS]: getGroupDeleteInvitationSuccess,
    [TYPE.GET_GROUP_DELETE_INVITATION_ERROR]: getGroupDeleteInvitationError,
    [TYPE.DELETE_INVITATION]: deleteInvitationStart,
    [TYPE.DELETE_INVITATION_SUCCESS]: deleteInvitationSuccess,
    [TYPE.DELETE_INVITATION_ERROR]: deleteInvitationError,
  },
  initialState
);

function setFetching(state) {
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

function getGroupDeleteInvitationStart(state) {
  return {
    ...state,
    isFetching: true,
    isLoaded: false,
    groupDeleteInvitation: {},
  };
}

function getGroupDeleteInvitationSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    groupDeleteInvitation: action.payload,
  };
}

function getGroupDeleteInvitationError(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}

function deleteInvitationStart(state) {
  return {
    ...state,
    isFetching: true,
    isLoaded: false,
  };
}

function deleteInvitationSuccess(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}

function deleteInvitationError(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}
