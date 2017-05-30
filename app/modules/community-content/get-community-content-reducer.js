import createReducer from '../utils/createReducer';
import {
  FETCH_COMMUNITY_CONTENT_START,
  FETCH_COMMUNITY_CONTENT_SUCCESS,
  FETCH_COMMUNITY_CONTENT_FAIL,
} from './community-object-content-actions';

const generateInitialState = () => ({
  communityContent: {},
  error: false,
  errorMessage: {},
  fetching: true,
});

export default createReducer(generateInitialState(), {
  [FETCH_COMMUNITY_CONTENT_START](state) {
    return {
      ...state,
      ...generateInitialState(),
    };
  },
  [FETCH_COMMUNITY_CONTENT_SUCCESS](state, { payload }) {
    return {
      ...state,
      communityContent: payload,
      error: false,
      errorMessage: {},
      fetching: false,
    };
  },
  [FETCH_COMMUNITY_CONTENT_FAIL](state, { payload }) {
    return {
      ...state,
      communityContent: {},
      error: true,
      errorMessage: payload,
      fetching: false,
    };
  },
});
