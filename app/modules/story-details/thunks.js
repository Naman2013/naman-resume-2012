import { getStoryDetailsApi } from 'app/modules/story-details/api';
import like from '../../services/community-content/like';
import { ACTION } from './reducer';

export const getStoryDetails = postId => (dispatch, getState) => {
  const { at, token, cid } = getState().user; // todo can we improve this?
  dispatch(ACTION.getStoryDetails());
  return getStoryDetailsApi({ at, token, cid, postId })
    .then(result => dispatch(ACTION.getStoryDetailsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getStoryDetailsError(error)));
};

export const likeStory = data => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.likeStory());
  return like({ at, token, cid, ...data })
    .then(result => {
      dispatch(ACTION.likeStorySuccess(result.data));
      return result.data;
    })
    .catch(error => dispatch(ACTION.likeStoryError(error)));
};
