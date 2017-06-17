import createReducer from '../utils/createReducer';
import {
  FETCH_RECORDED_SHOW_START,
  FETCH_RECORDED_SHOW_SUCCESS,
  FETCH_RECORDED_SHOW_FAIL,
} from './recorded-show-actions';


const initialState = {

};

export default createReducer(initialState, {
  [FETCH_RECORDED_SHOW_START]() {
    return {
      ...initialState,
    };
  },
  [FETCH_RECORDED_SHOW_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
  [FETCH_RECORDED_SHOW_FAIL]() {
    return {
      ...initialState,
      apiError: true,
    };
  },
});
