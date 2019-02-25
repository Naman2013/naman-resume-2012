export const GET_STORIES = 'GET_STORIES';
export const GET_STORIES_SUCCESS = 'GET_STORIES_SUCCESS';
export const GET_STORIES_ERROR = 'GET_STORIES_ERROR';

export const getStoriesStart = () => ({
  type: GET_STORIES,
});

export const getStoriesSuccess = payload => ({
  type: GET_STORIES_SUCCESS,
  payload,
});

export const getStoriesError = payload => ({
  type: GET_STORIES_ERROR,
  payload,
});
