import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('public-profile', [
  '~GET_PUBLIC_PROFILE',
]);
export const ACTION = actions(TYPE);

export const initialState = {

  isFetching: false,
  isLoaded: false,
  serverError: null,

};

export default handleActions(
  {
    [TYPE.GET_PUBLIC_PROFILE]: setFetching,
    [TYPE.GET_PUBLIC_PROFILE_SUCCESS]: getFlowChartSuccess,
    [TYPE.GET_PUBLIC_PROFILE_ERROR]: setServerError,

  },
  initialState,
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

function getFlowChartSuccess(state/* , action */) {
  return {
    ...state,
  };
}
