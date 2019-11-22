import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { Action } from 'app/common/types';
import { LeaderboardResponse } from 'app/modules/leaderboard/types';

export const TYPES = constants('leaderboard', ['~GET_LEADERBOARD']);
export const ACTIONS = actions(TYPES);

export type TInitialState = {
  isFetching: boolean;
  serverError: string;
  leaderboardData: LeaderboardResponse | {};
};

export const initialState: TInitialState = {
  isFetching: false,
  leaderboardData: {},
  serverError: '',
};

export default handleActions(
  {
    [TYPES.GET_LEADERBOARD]: setFetching,
    [TYPES.GET_LEADERBOARD_SUCCESS]: getLeaderboardSuccess,
    [TYPES.GET_LEADERBOARD_ERROR]: setServerError,
  },
  initialState
);

function setFetching(state: TInitialState): TInitialState {
  return { ...state, isFetching: true };
}

function setServerError(
  state: TInitialState,
  action: Action<string>
): TInitialState {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
  };
}

function getLeaderboardSuccess(
  state: TInitialState,
  action: Action<LeaderboardResponse>
): TInitialState {
  return {
    ...state,
    isFetching: false,
    leaderboardData: action.payload,
  };
}
