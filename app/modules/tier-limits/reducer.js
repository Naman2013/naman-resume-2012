import _ from 'lodash';
import createReducer from '../utils/createReducer';
import {
  FETCH_TIER_LIMITS_START,
  FETCH_TIER_LIMITS_SUCCESS,
  FETCH_TIER_LIMITS_FAIL,
} from './actions';

const initialState = {
  periodLimit: false,
  simulLimit: false,
  piggybackLimit: false,
  showLimitText: false,
  limitText: '',
  loading: false,
  refreshIntervalSec: 300,
  tierLimitsError: false,
};

export default createReducer(initialState, {
  [FETCH_TIER_LIMITS_START](state) {
    return {
      ...state,
      tierLimitsError: false,
      loading: true,
    };
  },
  [FETCH_TIER_LIMITS_SUCCESS](state, { payload }) {
    const {
      periodLimit,
      simulLimit,
      piggybackLimit,
      showLimitText,
      limitText,
      apiError,
    } = payload;
    return {
      ...state,
      periodLimit,
      simulLimit,
      piggybackLimit,
      showLimitText,
      limitText,
      tierLimitsError: apiError,
      loading: false,
    };
  },
  [FETCH_TIER_LIMITS_FAIL](state, { payload }) {
    return {
      ...state,
      tierLimitsError: true,
      loading: false,
    };
  },
});
