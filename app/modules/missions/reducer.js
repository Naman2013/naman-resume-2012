import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('profile', ['~GET_MISSIONS']);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  isLoaded: false,
  serverError: null,

  pageSetup: {
    navigationConfig: [],
  },
};

export default handleActions(
  {
    [TYPE.GET_MISSIONS]: setFetching,
    [TYPE.GET_MISSIONS_SUCCESS]: getMissionsSuccess,
    [TYPE.GET_MISSIONS_ERROR]: setServerError,
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

function getMissionsSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    pageSetup: action.payload,
  };
}
