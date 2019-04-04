// @flow
import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { API_URL } from './api';

export const TYPE = constants('gallery-details', ['~GET_GALLERY_DETAILS']);
export const ACTION = actions(TYPE);

type TInitialState = {
  isFetching: boolean,
  isLoaded: boolean,
  galleryTitle: string,
  galleryDateCreated: string,
  imageCount: number,
  apiURL: string,
};

export const initialState: TInitialState = {
  isFetching: false,
  isLoaded: false,
  apiURL: API_URL,
  galleryTitle: '',
  galleryDateCreated: '',
  imageCount: 0,
  imageList: [],
};

export default handleActions(
  {
    [TYPE.GET_GALLERY_DETAILS]: setFetching,
    [TYPE.GET_GALLERY_DETAILS_SUCCESS]: getGalleryDetailsSuccess,
    [TYPE.GET_GALLERY_DETAILS_ERROR]: setServerError,
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
    imageList: payload.imageList,
  };
}
