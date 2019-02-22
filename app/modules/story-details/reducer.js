import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('story-details', ['~GET_STORY_DETAILS']);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  isLoaded: false,
  serverError: null,

  data: {
    posts: [],
  },
};

export default handleActions(
  {
    [TYPE.GET_STORY_DETAILS]: setFetching,
    [TYPE.GET_STORY_DETAILS_SUCCESS]: getStoryDetailsSuccess,
    [TYPE.GET_STORY_DETAILS_ERROR]: setServerError,
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

function getStoryDetailsSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    data: action.payload,
  };
}
