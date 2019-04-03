// @flow
import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('mission-details', ['~GET_MISSION_DETAILS']);
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
};

export const initialState: TInitialState = {
  isFetching: false,
  isLoaded: false,
  missionTitle: '',
  missionIconURL: '',
  missionDateCreated: '',
  firstImageNumber: 0,
  imageCount: 0,
  maxImageCount: 0,
  imageList: [],
};

export default handleActions(
  {
    [TYPE.GET_MISSION_DETAILS]: setFetching,
    [TYPE.GET_MISSION_DETAILS_SUCCESS]: getMissionDetailsSuccess,
    [TYPE.GET_MISSION_DETAILS_ERROR]: setServerError,
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
