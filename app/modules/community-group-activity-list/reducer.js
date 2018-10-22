import createReducer from '../utils/createReducer';
import {
  CREATE_ACTIVITY_ITEM_SUCCESS,
} from './actions';

const initialState = {
  fetching: false,
  error: false,
  count: 10,
  threadList: [],
  threadCount: 0,
};

export default createReducer(initialState, {
  [CREATE_ACTIVITY_ITEM_SUCCESS](state, { payload }) {
    const { thread } = payload;
    const threadList = [].concat(state.threadList, thread);

    return {
      ...state,
      fetching: false,
      threadCount: state.threadCount + 1,
      threadList,
    };
  },
});
