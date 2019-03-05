import axios from 'axios';

export const SUBMIT_STORY_START = 'SUBMIT_STORY_START';
export const SUBMIT_STORY_SUCCESS = 'SUBMIT_STORY_SUCCESS';
export const SUBMIT_STORY_FAILURE = 'SUBMIT_STORY_FAILURE';

const submitStoryStart = () => ({
  type: SUBMIT_STORY_START,
});

const submitStorySuccess = payload => ({
  type: SUBMIT_STORY_SUCCESS,
  payload,
});

const submitStoryFailure = payload => ({
  type: SUBMIT_STORY_FAILURE,
  payload,
});

export const submitStory = ({
  objectSlug,
  status,
  type,
  title,
  storyType,
  content,
  postTags,
  S3URLs,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(submitStoryStart());
  return axios.post('/api/content/submitObjectContent', {
    cid,
    at,
    token,
    objectSlug,
    status,
    type,
    storyType,
    title,
    content,
    postTags,
    S3URLs,
  })
    .then(result => dispatch(submitStorySuccess(result.data)))
    .catch(error => dispatch(submitStoryFailure(error)));
};

export default {
  submitStory,
};
