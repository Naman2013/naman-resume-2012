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
  deleteInvitationData: null,
};

export default handleActions(
  {
    [TYPE.GET_CLUBS]: getClubs,
    [TYPE.GET_CLUBS_SUCCESS]: getClubsSuccess,
    [TYPE.GET_CLUBS_ERROR]: error,
    [TYPE.GET_TOP_THREADS_START]: start,
    [TYPE.GET_TOP_THREADS_SUCCESS]: getTopThreadsSuccess,
    [TYPE.GET_TOP_THREADS_ERROR]: error,
    [TYPE.GET_GROUP_DELETE_INVITATION_START]: start,
    [TYPE.GET_GROUP_DELETE_INVITATION_SUCCESS]: getGroupDeleteInvitationSuccess,
    [TYPE.GET_GROUP_DELETE_INVITATION_ERROR]: error,
    [TYPE.DELETE_INVITATION_START]: start,
    [TYPE.DELETE_INVITATION_SUCCESS]: deleteInvitationSuccess,
    [TYPE.DELETE_INVITATION_ERROR]: error,
  },
  initialState
);

function start(state) {
  return { ...state, isFetching: true, isLoaded: false };
}

function error(state, action) {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
  };
}

function getTopThreadsSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    topThreadsList: action.payload || [],
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

function getGroupDeleteInvitationSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    groupDeleteInvitation: action.payload,
  };
}

function deleteInvitationSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    deleteInvitationData: action.payload,
  };
}
