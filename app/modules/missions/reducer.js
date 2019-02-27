import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('profile', [
  '~GET_MISSIONS',

  // bySlooh1000 page
  '~GET_CATEGORY_LIST',
  'SET_CATEGORY',
  '~GET_OBJECT_LIST',

  // byTelescope page
  // ...
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  isLoaded: false,
  serverError: null,

  pageSetup: {
    navigationConfig: [],
  },

  bySlooh1000: {
    categoryList: {},
    selectedCategoryId: null,
    objectList: {},
  },
};

export default handleActions(
  {
    [TYPE.GET_MISSIONS]: setFetching,
    [TYPE.GET_MISSIONS_SUCCESS]: getMissionsSuccess,
    [TYPE.GET_MISSIONS_ERROR]: setServerError,

    // bySlooh1000 page
    [TYPE.GET_CATEGORY_LIST]: setFetching,
    [TYPE.GET_CATEGORY_LIST_SUCCESS]: getCategoryListSuccess,
    [TYPE.GET_CATEGORY_LIST_ERROR]: setServerError,
    [TYPE.SET_CATEGORY]: setCategory,
    [TYPE.GET_OBJECT_LIST]: setFetching,
    [TYPE.GET_OBJECT_LIST_SUCCESS]: getObjectListSuccess,
    [TYPE.GET_OBJECT_LIST_ERROR]: setServerError,

    // byTelescope page
    // ...
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

function getCategoryListSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    bySlooh1000: { ...state.bySlooh1000, categoryList: action.payload },
  };
}

function setCategory(state, action) {
  return {
    ...state,
    // bySlooh1000: { ...state.bySlooh1000, selectedCategoryId: action.payload },
  };
}

function getObjectListSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    bySlooh1000: { ...state.bySlooh1000, objectList: action.payload },
  };
}
