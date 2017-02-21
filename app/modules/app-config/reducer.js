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
};

export default createReducer(initialState, {
  [FETCH_APP_CONFIG_START](state) {
    return {
      ...state,
      error: false,
    };
  },
  [FETCH_APP_CONFIG_SUCCESS](state, { payload }) {
    const {
      footerBackgroundRGB,
      copyrightNotice,
      copyrightRGB,
      hostname,
      hostnameRGB,
      gaTrackingId,
      adroll_adv_id,
      adroll_pix_id,
      registerNewMemberURL,
      registerNewPaidMemberURL,
      upgradeMembershipURL,
      upgradeToApprenticeURL,
      upgradeToAstronomerURL,
      renewMembershipURL,
    } = payload;
    return {
      ...state,
      footerBackgroundRGB,
      copyrightNotice,
      copyrightRGB,
      hostname,
      hostnameRGB,
      gaTrackingId,
      adroll_adv_id,
      adroll_pix_id,
      registerNewMemberURL,
      registerNewPaidMemberURL,
      upgradeMembershipURL,
      upgradeToApprenticeURL,
      upgradeToAstronomerURL,
      renewMembershipURL,
    };
  },
  [FETCH_APP_CONFIG_FAIL](state, { payload }) {
    return {
      ...state,
      error: true,
    };
  },
});
