import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('clubs', ['~GET_CLUBS', '~GET_TOP_THREADS']);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,
  topThreadsList: [],
  serverError: null,
};

export default handleActions(
  {
    [TYPE.GET_CLUBS]: getClubs,
    [TYPE.GET_CLUBS_SUCCESS]: getClubsSuccess,
    [TYPE.GET_CLUBS_ERROR]: getClubsError,
    [TYPE.GET_TOP_THREADS]: getTopThreadsStart,
    [TYPE.GET_TOP_THREADS_SUCCESS]: getTopThreadsSuccess,
    [TYPE.GET_TOP_THREADS_ERROR]: getTopThreadsError,
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
