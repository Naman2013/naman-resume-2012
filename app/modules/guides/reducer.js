import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('guides', ['~GET_GUIDES']);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,
};

export default handleActions(
  {
    [TYPE.GET_GUIDES]: getGuides,
    [TYPE.GET_GUIDES_SUCCESS]: getGuidesSuccess,
    [TYPE.GET_GUIDES_ERROR]: getGuidesError,
  },
  initialState,
);

function getGuides(state = initialState) {
  return {
    ...state,
    isFetching: true,
  };
}

function getGuidesSuccess(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}

function getGuidesError(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}
