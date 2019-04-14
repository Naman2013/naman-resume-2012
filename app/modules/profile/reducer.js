import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('profile', [
  '~GET_PUBLIC_PROFILE',
  '~GET_PRIVATE_PROFILE',
  '~GET_PROFILE_LISTS',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  isLoaded: false,
  serverError: null,

  publicProfileData: null,
  privateProfileData: null,
  profileLists: null,
};

export default handleActions(
  {
    [TYPE.GET_PUBLIC_PROFILE]: setFetching,
    [TYPE.GET_PUBLIC_PROFILE_SUCCESS]: getPublicProfileSuccess,
    [TYPE.GET_PUBLIC_PROFILE_ERROR]: setServerError,
    [TYPE.GET_PRIVATE_PROFILE]: setFetching,
    [TYPE.GET_PRIVATE_PROFILE_SUCCESS]: getPrivateProfileSuccess,
    [TYPE.GET_PRIVATE_PROFILE_ERROR]: setServerError,
    [TYPE.GET_PROFILE_LISTS]: setFetching,
    [TYPE.GET_PROFILE_LISTS_SUCCESS]: getProfileListsSuccess,
    [TYPE.GET_PROFILE_LISTS_ERROR]: setServerError,
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
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    privateProfileData: action.payload,
  };
}

function getProfileListsSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    profileLists: action.payload,
  };
}
