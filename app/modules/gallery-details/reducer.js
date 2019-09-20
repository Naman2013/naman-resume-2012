// @flow
import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { API_URL } from './api';

export const TYPE = constants('gallery-details', [
  '~GET_GALLERY_DETAILS',
  '~REMOVE_IMAGE_FROM_GALLERY',
  '~DELETE_GALLERY',
]);
export const ACTION = actions(TYPE);

type TInitialState = {
  isFetching: boolean,
  isLoaded: boolean,
  galleryTitle: string,
  galleryDateCreated: string,
  imageCount: number,
  canEditFlag: number | boolean,
  apiURL: string,
};

export const initialState: TInitialState = {
  isFetching: false,
  isLoaded: false,
  apiURL: API_URL,
  galleryTitle: '',
  galleryDateCreated: '',
  imageCount: 0,
  canEditFlag: true,
  imageList: [],
  galleryCountChange: 0,
};

export default handleActions(
  {
    [TYPE.GET_GALLERY_DETAILS]: setFetching,
    [TYPE.GET_GALLERY_DETAILS_SUCCESS]: getGalleryDetailsSuccess,
    [TYPE.GET_GALLERY_DETAILS_ERROR]: setServerError,
    [TYPE.REMOVE_IMAGE_FROM_GALLERY]: setFetching,
    [TYPE.REMOVE_IMAGE_FROM_GALLERY_SUCCESS]: removeImageFromGallerySuccess,
    [TYPE.REMOVE_IMAGE_FROM_GALLERY_ERROR]: setServerError,
    [TYPE.DELETE_GALLERY]: setFetching,
    [TYPE.DELETE_GALLERY_SUCCESS]: deleteGallerySuccess,
    [TYPE.DELETE_GALLERY_ERROR]: setServerError,
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

function getGalleryDetailsSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    galleryTitle: payload.galleryTitle,
    galleryDateCreated: payload.galleryDateCreated,
    imageCount: payload.imageCount,
    canEditFlag: payload.canEditFlag,
    imageList: payload.imageList,
  };
}

function removeImageFromGallerySuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    galleryCountChange: payload.galleryCountChange,
  };
}

function deleteGallerySuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
  };
}
