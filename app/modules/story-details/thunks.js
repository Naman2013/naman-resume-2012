import { getStoryDetailsApi } from 'app/modules/story-details/api';
import { ACTION } from './reducer';

export const getStoryDetails = postId => (dispatch, getState) => {
  const { at, token, cid } = getState().user; // todo can we improve this?
  dispatch(ACTION.getStoryDetails());
  return getStoryDetailsApi({ at, token, cid, postId })
    .then(result => dispatch(ACTION.getStoryDetailsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getStoryDetailsError(error)));
};
