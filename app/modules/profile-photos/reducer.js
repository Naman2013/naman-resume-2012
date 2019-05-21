import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { apply } from 'qim';

export const TYPE = constants('profile', [
  '~GET_FITS_DATA',

  // tags
  '~SET_TAG',
  '~GET_TAGS',
  '~DELETE_TAG',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  serverError: false,
  isLoaded: false,

  fitsData: {
    isFetching: false,
    isLoaded: false,
    data: {},
  },

  tagsData: {
    isFetching: false,
    data: {},
    tagList: [],
  },
};

export default handleActions(
  {
    [TYPE.GET_FITS_DATA]: setFetching,
    [TYPE.GET_FITS_DATA_SUCCESS]: getFitsDataSuccess,
    [TYPE.GET_FITS_DATA_ERROR]: setServerError,

    // TAGS
    [TYPE.GET_TAGS]: setFetching,
    [TYPE.GET_TAGS_SUCCESS]: getTagsSuccess,
    [TYPE.GET_TAGS_ERROR]: setServerError,

    [TYPE.SET_TAG]: setTagFetching,
    [TYPE.SET_TAG_SUCCESS]: setTagSuccess,
    [TYPE.SET_TAG_ERROR]: setServerError,

    [TYPE.DELETE_TAG]: setTagFetching,
    [TYPE.DELETE_TAG_SUCCESS]: setTagSuccess,
    [TYPE.DELETE_TAG_ERROR]: setServerError,
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

const setTagsDataImmutable = (data, state) =>
  apply(['tagsData'], () => data, state);

function getTagsSuccess(state, action) {
  return setTagsDataImmutable(
    {
      isFetching: false,
      data: action.payload,
      tagList: action.payload.tagList,
    },
    state
  );
}

function setTagSuccess(state, action) {
  return setTagsDataImmutable(
    {
      isFetching: false,
      data: action.payload,
      tagList: action.payload.tagList,
    },
    state
  );
}

function setTagFetching(state) {
  return setTagsDataImmutable(
    {
      isFetching: true,
      data: state.tagsData.data,
      tagList: state.tagsData.tagList,
    },
    state
  );
}

const setFitsDataImmutable = (data, state) =>
  apply(['fitsData'], () => data, state);

function getFitsDataSuccess(state, action) {
  return setFitsDataImmutable(
    {
      isFetching: false,
      isLoaded: true,
      data: action.payload,
    },
    state
  );
}
