import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { set, apply } from 'qim';

export const TYPE = constants('telescope', ['~GET_ALL_SKY_TIMELAPSE']);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  serverError: null,

  allSkyTimelapse: {
    isFetching: false,
    data: {},
    serverError: null,
  },
};

export default handleActions(
  {
    [TYPE.GET_ALL_SKY_TIMELAPSE]: getAllSkyTimelapse,
    [TYPE.GET_ALL_SKY_TIMELAPSE_SUCCESS]: getAllSkyTimelapseSuccess,
    [TYPE.GET_ALL_SKY_TIMELAPSE_ERROR]: getAllSkyTimelapseError,
  },
  initialState
);

function getAllSkyTimelapse(state) {
  return set(['allSkyTimelapse', 'isFetching'], true, state);
}

function getAllSkyTimelapseSuccess(state, action) {
  return apply(
    ['allSkyTimelapse'],
    () => ({
      isFetching: false,
      data: action.payload,
    }),
    state
  );
}

function getAllSkyTimelapseError(state, action) {
  return set(['allSkyTimelapse', 'serverError'], action.payload, state);
}
