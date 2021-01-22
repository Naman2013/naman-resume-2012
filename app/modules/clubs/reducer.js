import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('clubs', [
  '~GET_CLUBS',
  '~GET_TOP_THREADS',
  '~GET_GROUP_DELETE_INVITATION',
  '~DELETE_INVITATION',
  '~GET_PROFILE_GROUP',
]);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,
  topThreadsList: undefined,
  serverError: null,
  groupDeleteInvitation: {},
  deleteInvitationData: null,
  profileGroupList: [],
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
    [TYPE.GET_PROFILE_GROUP]: getProfileGroup,
    [TYPE.GET_PROFILE_GROUP_SUCCESS]: getProfileGroupSuccess,
    [TYPE.GET_PROFILE_GROUP_ERROR]: getProfileGroupError,
  },
  initialState
);

function start(state) {
  return { ...state, isFetching: true, isLoaded: false };
}
function getProfileGroup(state) {
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
