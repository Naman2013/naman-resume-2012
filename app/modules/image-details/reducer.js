import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('image-details', [
  '~GET_IMAGE_DETAILS',
  '~DELETE_IMAGE',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  serverError: null,
  data: {},
};

export default handleActions(
  {
    [TYPE.GET_IMAGE_DETAILS]: setFetching,
    [TYPE.GET_IMAGE_DETAILS_SUCCESS]: getImageDetailsSuccess,
    [TYPE.GET_IMAGE_DETAILS_ERROR]: setServerError,
  },
  initialState
);

function setFetching(state) {
  return { ...state, isFetching: true };
}

function setServerError(state, action) {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
    isLoded: false,
  };
}

function getImageDetailsSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    data: action.payload,
  };
}
