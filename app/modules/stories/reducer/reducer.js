import createReducer from '../../utils/createReducer';
import initialState from './initialState';

import {
  SUBMIT_STORY_START,
  SUBMIT_STORY_SUCCESS,
  SUBMIT_STORY_FAILURE,
} from '../actions/create';


import * as createStoryReducer from './create';

export default createReducer(initialState, {
  [SUBMIT_STORY_START]: createStoryReducer.submitStoryStart,
  [SUBMIT_STORY_SUCCESS]: createStoryReducer.submitStorySuccess,
  [SUBMIT_STORY_FAILURE]: createStoryReducer.submitStoryFailure,
});
