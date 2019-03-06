import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('telescope', []);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  isLoaded: false,
  serverError: null,
};

export default handleActions(
  {
    [TYPE.GET_XX]: setFetching,
    [TYPE.GET_XX_SUCCESS]: getXXSuccess,
    [TYPE.GET_XX_ERROR]: setServerError,
  },
  initialState
);

function setFetching(state) {
  return { ...state, isFetching: true, isLoaded: false };
}

function setServerError(state, action) {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
    isLoaded: false,
  };
}

function getXXSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    data: action.payload,
  };
}
