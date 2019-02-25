import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('clubs', ['~GET_CLUBS']);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,
};

export default handleActions(
  {
    [TYPE.GET_CLUBS]: getClubs,
    [TYPE.GET_CLUBS_SUCCESS]: getClubsSuccess,
    [TYPE.GET_CLUBS_ERROR]: getClubsError,
  },
  initialState,
);

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
