import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPES = constants('leaderboard', ['~GET_LEADERBOARD']);
export const ACTIONS = actions(TYPES);

export const initialState = {
  isFetching: false,
};

export default handleActions(
  {
    [TYPES.GET_LEADERBOARD]: setFetching,
    [TYPES.GET_LEADERBOARD_SUCCESS]: getPublicProfileSuccess,
    [TYPES.GET_LEADERBOARD_ERROR]: setServerError,
  },
  initialState
);

function setFetching(state: any) {
  return { ...state, isFetching: true };
}

function setServerError(state: any, action: any) {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
  };
}

function getPublicProfileSuccess(state: any, action: any) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    publicProfileData: action.payload,
  };
}
