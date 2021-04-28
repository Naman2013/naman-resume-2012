import createReducer from '../utils/createReducer';
import cloneDeep from 'lodash/cloneDeep';
import {
  CANCEL_MISSION_START,
  CANCEL_MISSION_SUCCESS,
  CANCEL_MISSION_FAIL,
  CANCEL_MYPIGGYBACK_START,
  CANCEL_MYPIGGYBACK_SUCCESS,
  CANCEL_MYPIGGYBACK_FAIL,

} from './actions';

export default createReducer(initialState, {
  [CANCEL_MISSION_START](state) {
    return {
      ...state,
      error: false,
    };
  },
  [CANCEL_MISSION_SUCCESS](state, { payload, refreshAction}) {
    dispatch(refreshAction());
    const { apiError } = payload;
    return {
      ...state,
      error: apiError,
      result: payload,
    };
  },
  [CANCEL_MISSION_FAIL](state, { payload, refreshAction }) {
    dispatch(refreshAction());
    return {
      ...state,
      error: true,
      result: {}
    };
  },
  [CANCEL_MYPIGGYBACK_START](state) {
    return {
      ...state,
      error: false,
    };
  },
  [CANCEL_MYPIGGYBACK_SUCCESS](state, { payload }) {
   
    dispatch(payload.refreshAction());
    const { apiError } = payload;
    return {
      ...state,
      error: apiError,
      result: payload.payload,
    };
  },
  [CANCEL_MYPIGGYBACK_FAIL](state, { payload }) {
    
    dispatch(payload.refreshAction());
    return {
      ...state,
      error: true,
      result: {}
    };
  },
});
