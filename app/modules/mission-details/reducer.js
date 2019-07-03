// @flow
import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { apply } from 'qim';
import { API_URL } from './api';

export const TYPE = constants('mission-details', [
  '~GET_MISSION_DETAILS',

  // tags
  '~SET_TAG',
  '~GET_TAGS',
  '~DELETE_TAG',
]);
export const ACTION = actions(TYPE);

type TInitialState = {
  isFetching: boolean,
  isLoaded: boolean,
  missionTitle: string,
  missionIconURL: string,
  missionDateCreated: string,
  firstImageNumber: number,
  imageCount: number,
  imageCount: number,
  apiURL: string,
};

export const initialState: TInitialState = {
  isFetching: false,
  isLoaded: false,
  apiURL: API_URL,
  missionTitle: '',
  missionIconURL: '',
  missionDateCreated: '',
  firstImageNumber: 0,
  imageCount: 0,
  maxImageCount: 0,
  imageList: [],
  tagsData: {
    isFetching: false,
    data: {},
    tagList: [],
  },
};

export default handleActions(
  {
    [TYPE.GET_MISSION_DETAILS]: setFetching,
    [TYPE.GET_MISSION_DETAILS_SUCCESS]: getMissionDetailsSuccess,
    [TYPE.GET_MISSION_DETAILS_ERROR]: setServerError,

    // TAGS
    [TYPE.GET_TAGS]: setTagFetching,
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

function getMissionDetailsSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    missionTitle: payload.missionTitle,
    missionIconURL: payload.missionIconURL,
    missionDateCreated: payload.missionDateCreated,
    firstImageNumber: payload.firstImageNumber,
    imageCount: payload.imageCount,
    maxImageCount: payload.maxImageCount,
    imageList: payload.imageList,
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
