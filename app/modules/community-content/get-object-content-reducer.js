import createReducer from '../utils/createReducer';
import {
  FETCH_OBJECT_CONTENT_RESET,
  FETCH_OBJECT_CONTENT_SUCCESS,
  FETCH_OBJECT_CONTENT_FAIL,
} from './get-object-content-actions';

const generateInitialState = () => ({
  communityContent: {
    posts: [],
  },
  error: false,
  errorMessage: {},
  fetching: true,
});

export default createReducer(generateInitialState(), {
  [FETCH_OBJECT_CONTENT_RESET](state) {
    return {
      ...state,
      ...generateInitialState(),
    };
  },
  [FETCH_OBJECT_CONTENT_SUCCESS](state, { payload }) {
    return {
      ...state,
      communityContent: payload,
      error: false,
      errorMessage: {},
      fetching: false,
    };
  },
  [FETCH_OBJECT_CONTENT_FAIL](state, { payload }) {
    return {
      ...state,
      communityContent: {},
      error: true,
      errorMessage: payload,
      fetching: false,
    };
  },
});
