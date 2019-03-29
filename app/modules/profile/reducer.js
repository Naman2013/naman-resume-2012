import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('profile', [
  '~GET_PUBLIC_PROFILE',
  '~GET_PRIVATE_PROFILE',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  isLoaded: false,
  serverError: null,

  publicProfileData: null,
  privateProfileData: null,
};

export default handleActions(
  {
    [TYPE.GET_PUBLIC_PROFILE]: setFetching,
    [TYPE.GET_PUBLIC_PROFILE_SUCCESS]: getPublicProfileSuccess,
    [TYPE.GET_PUBLIC_PROFILE_ERROR]: setServerError,
    [TYPE.GET_PRIVATE_PROFILE]: setFetching,
    [TYPE.GET_PRIVATE_PROFILE_SUCCESS]: getPrivateProfileSuccess,
    [TYPE.GET_PRIVATE_PROFILE_ERROR]: setServerError,
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

function getPublicProfileSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    publicProfileData: action.payload,
  };
}

function getPrivateProfileSuccess(state, action) {
  console.log('getPrivateProfileSuccess - action', action.payload);
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    privateProfileData: action.payload,
  };
}
