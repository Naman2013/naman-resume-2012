import _ from 'lodash';
import createReducer from '../utils/createReducer';
import {
  FETCH_REPLIES_START,
  FETCH_REPLIES_SUCCESS,
  FETCH_REPLIES_FAIL,
} from './actions';

const initialState = {
  fetching: false,
  pages: 0,
  error: false,
  repliesLists: {},
};

export default createReducer(initialState, {
  [FETCH_REPLIES_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_REPLIES_SUCCESS](state, { payload }) {
    const { replies, threadId } = payload;
    const newState = _.cloneDeep(state.repliesLists);
    newState[threadId] = replies;
    return {
      ...state,
      fetching: false,
      repliesLists: newState,
    };
  },
  [FETCH_REPLIES_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
      repliesLists: {},
      pages: 0,
    };
  },
});
