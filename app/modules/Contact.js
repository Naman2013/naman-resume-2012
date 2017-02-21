import { SubmissionError } from 'redux-form';
import axios from 'axios';
import { reset } from 'redux-form';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';

const SEND_MESSAGE = 'SEND_MESSAGE';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

const send = () => ({
  type: SEND_MESSAGE,
});

const success = payload => ({
  type: SEND_MESSAGE_SUCCESS,
  payload,
});

const fail = payload => ({
  type: SEND_MESSAGE_FAILURE,
  payload,
});

export const contact = contactFormValues => (dispatch, getState) => {
  const {
    firstName,
    lastName,
    emailAddress,
    source,
    message,
    subject,
  } = contactFormValues;
  const { cid } = getState().user;

  dispatch(send());

  return axios.post('/api/app/sendContactForm', {
    firstName,
    lastName,
    emailAddress,
    source,
    message,
    subject,
    cid,
  })
    .then((result) => {
      if (result.data && !result.data.apiError) {
        dispatch(reset('contact'));
      }
      dispatch(success(result.data));
    })
    .catch((error) => {
      dispatch(fail(error));
      throw new SubmissionError({ _error: 'Your message in was unsuccessful. Please try again.' });
    });
};


const initialState = {
  isSent: false,
  contactFormError: '',
};

export default createReducer(initialState, {
  [SEND_MESSAGE](state) {
    return {
      ...state,
      isSent: false,
    };
  },
  [SEND_MESSAGE_SUCCESS](state, { payload }) {
    const { errorMsg } = payload;
    return {
      ...state,
      isSent: true,
      contactFormError: errorMsg,
    };
  },
  [SEND_MESSAGE_FAILURE](state, { payload }) {
    const { errorMsg } = payload;
    return {
      ...state,
      isSent: false,
      contactFormError: errorMsg,
    };
  },
});
