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

  // galleries
  '~GET_GALLERIES',
  '~CREATE_GALLERY',
  '~ADD_IMAGE_TO_GALLERY',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  serverError: null,
  data: {},

  tagsData: {
    isFetching: false,
    data: {},
    tagList: [],
  },

  galleriesData: {
    isFetching: false,
    data: {
      galleryList: [],
    },
    // tagList: [],
  },
};

export default handleActions(
  {
    [TYPE.GET_IMAGE_DETAILS]: setFetching,
    [TYPE.GET_IMAGE_DETAILS_SUCCESS]: getImageDetailsSuccess,
    [TYPE.GET_IMAGE_DETAILS_ERROR]: setServerError,

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

    // GALLERIES
    [TYPE.GET_GALLERIES]: setGalleriesFetching,
    [TYPE.GET_GALLERIES_SUCCESS]: getGalleriesSuccess,
    [TYPE.GET_GALLERIES_ERROR]: setServerError,

    [TYPE.ADD_IMAGE_TO_GALLERY]: setGalleriesFetching,
    [TYPE.ADD_IMAGE_TO_GALLERY_SUCCESS]: addImageToGallerySuccess,
    [TYPE.ADD_IMAGE_TO_GALLERY_ERROR]: setServerError,
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

const setGalleriesDataImmutable = (data, state) =>
  apply(['galleriesData'], () => data, state);

function setGalleriesFetching(state) {
  return setGalleriesDataImmutable(
    {
      isFetching: true,
      data: state.galleriesData.data,
    },
    state
  );
}

function getGalleriesSuccess(state, action) {
  return setGalleriesDataImmutable(
    {
      isFetching: false,
      data: action.payload,
    },
    state
  );
}

function addImageToGallerySuccess(state) {
  return setGalleriesDataImmutable(
    {
      isFetching: false,
      data: state.galleriesData.data,
    },
    state
  );
}
