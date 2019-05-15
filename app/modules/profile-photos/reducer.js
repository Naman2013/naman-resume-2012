import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('profile', ['~GET_FITS_DATA']);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  serverError: false,
  isLoaded: false,
  data: {},
};

export default handleActions(
  {
    [TYPE.GET_FITS_DATA]: setFetching,
    [TYPE.GET_FITS_DATA_SUCCESS]: getFitsDataSuccess,
    [TYPE.GET_FITS_DATA_ERROR]: setServerError,
  },
  initialState
);

function setFetching(state) {
  return { ...state, isFetching: true, isLoaded: false, serverError: false };
}

function setServerError(state, action) {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
    isLoaded: false,
  };
}

function getFitsDataSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    serverError: false,
    data: action.payload,
  };
}
