import axios from 'axios';
import { reset } from 'redux-form';
import createReducer from '../utils/createReducer';

const SEND_ROADTRIP_FORM_START = 'SEND_ROADTRIP_FORM_START';
const SEND_ROADTRIP_FORM_SUCCESS = 'SEND_ROADTRIP_FORM_SUCCESS';
const SEND_ROADTRIP_FORM_FAILURE = 'SEND_ROADTRIP_FORM_FAILURE';

const initialState = {
  isSent: false,
  registrationFormError: '',
};

export default createReducer(initialState, {
  [SEND_ROADTRIP_FORM_START](state) {
    return {
      ...state,
      isSent: false,
    };
  },
  [SEND_ROADTRIP_FORM_SUCCESS](state, { payload }) {
    const { errorMsg } = payload;
    return {
      ...state,
      isSent: true,
      registrationFormError: errorMsg,
    };
  },
  [SEND_ROADTRIP_FORM_FAILURE](state, { payload }) {
    const { errorMsg } = payload;
    return {
      ...state,
      isSent: false,
      registrationFormError: errorMsg,
    };
  },
});
