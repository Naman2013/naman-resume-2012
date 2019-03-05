import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('story-details', [
  '~GET_STORY_DETAILS',
  '~LIKE_STORY',
]);
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
    [TYPE.LIKE_STORY_SUCCESS]: getLikeStorySuccess,
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

function getLikeStorySuccess(state) {
  const [post] = state.data.posts;
  const prevLikeCount = post.likesCount;
  const newLikeCount = prevLikeCount + 1;
  return {
    ...state,
    data: {
      posts: [{ ...post, likesCount: newLikeCount }],
    },
  };
}
