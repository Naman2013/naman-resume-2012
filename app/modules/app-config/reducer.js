import _ from 'lodash';
import createReducer from '../utils/createReducer';
import {
  FETCH_APP_CONFIG_START,
  FETCH_APP_CONFIG_SUCCESS,
  FETCH_APP_CONFIG_FAIL,
} from './actions';

const initialState = {
  error: true,
  footerBackgroundRGB: '',
  copyrightNotice: '',
  copyrightRGB: '',
  hostname: '',
  hostnameRGB: '',
  gaTrackingId: '',
  adroll_adv_id: '',
  adroll_pix_id: '',
  registerNewMemberURL: '',
  registerNewPaidMemberURL: '',
  upgradeMembershipURL: '',
  upgradeToApprenticeURL: '',
  upgradeToAstronomerURL: '',
  renewMembershipURL: '',
  forgotPasswordURL: '',
};

export default createReducer(initialState, {
  [FETCH_APP_CONFIG_START](state) {
    return {
      ...state,
      error: false,
    };
  },
  [FETCH_APP_CONFIG_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
  [FETCH_APP_CONFIG_FAIL](state, { payload }) {
    return {
      ...state,
      error: true,
    };
  },
});
