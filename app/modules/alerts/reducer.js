import createReducer from '../utils/createReducer';
import {
  UPDATE_NOTIFICATIONS_COUNT
} from './actions';

const initialState = {
  notificationsCount: 0,
};

export default createReducer(initialState, {
  [UPDATE_NOTIFICATIONS_COUNT](state, { payload }) {
    const { count } = payload;
    return {
      ...state,
      notificationsCount: count,
    };
  },
});
