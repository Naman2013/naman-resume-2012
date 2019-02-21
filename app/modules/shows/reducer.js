import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('shows', ['~GET_SHOWS']);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,
};

export default handleActions(
  {
    [TYPE.GET_SHOWS]: getShows,
    [TYPE.GET_SHOWS_SUCCESS]: getShowsSuccess,
    [TYPE.GET_SHOWS_ERROR]: getShowsError,
  },
  initialState,
);

function getShows(state = initialState) {
  return {
    ...state,
    isFetching: true,
  };
}

function getShowsSuccess(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}

function getShowsError(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}
