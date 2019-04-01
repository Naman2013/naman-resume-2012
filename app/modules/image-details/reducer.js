import { actions, constants } from 'ducks-helpers';
import { apply } from 'qim';
import { handleActions } from 'redux-actions';

export const TYPE = constants('image-details', [
  '~GET_IMAGE_DETAILS',
  '~DELETE_IMAGE',

  // tags
  '~SET_TAG',
  '~GET_TAGS',
  '~DELETE_TAG',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  serverError: null,
  data: {},

  tagsData: {
    isLoading: false,
    data: [],
    tagList: [],
  },
};

export default handleActions(
  {
    [TYPE.GET_IMAGE_DETAILS]: setFetching,
    [TYPE.GET_IMAGE_DETAILS_SUCCESS]: getImageDetailsSuccess,
    [TYPE.GET_IMAGE_DETAILS_ERROR]: setServerError,

    [TYPE.GET_TAGS]: setFetching,
    [TYPE.GET_TAGS_SUCCESS]: getTagsSuccess,
    [TYPE.GET_TAGS_ERROR]: setServerError,

    [TYPE.SET_TAG]: setTagFetching,
    [TYPE.SET_TAG_SUCCESS]: setTagSuccess,
    [TYPE.SET_TAG_ERROR]: setServerError,
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
