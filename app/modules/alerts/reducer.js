import createReducer from '../utils/createReducer';
import {
  UPDATE_NOTIFICATION_COUNT
} from './actions';

const initialState = {
  notificationCount: 0,
};

export default createReducer(initialState, {
  [UPDATE_NOTIFICATION_COUNT](state, { payload }) {
    const { count } = payload;
    console.log('here, count', count)
    return {
      ...state,
      notificationCount: count,
    };
  },
});
