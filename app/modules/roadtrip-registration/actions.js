import axios from 'axios';
import { SubmissionError, reset } from 'redux-form';
import { fetchErrors } from '../authorization/actions';

const SEND_ROADTRIP_FORM_START = 'SEND_ROADTRIP_FORM_START';
const SEND_ROADTRIP_FORM_SUCCESS = 'SEND_ROADTRIP_FORM_SUCCESS';
const SEND_ROADTRIP_FORM_FAILURE = 'SEND_ROADTRIP_FORM_FAILURE';

const authenticateRegistrationPageSuccess = (pathname, replace, callback) => (callback());

const authenticateRegistrationPageFail = () => {
  // if (pathname !== '/registration/sign-in') {
  //   replace('/registration/sign-in');
  // }
  fetchErrors();
};

export const authenticateRegistrationPage = (pathname, replace, callback) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  return axios.post('/api/users/accessRoadtripForm', {
    cid,
    at,
    token,
  })
  .then(() => dispatch(authenticateRegistrationPageSuccess(pathname, replace, callback)))
  .catch(() => dispatch(authenticateRegistrationPageFail()));
};

const sendRoadtripFormStart = (payload) => ({
  type: SEND_ROADTRIP_FORM_START,
  payload,
});

const sendRoadtripFormSuccess = (payload) => ({
  type: SEND_ROADTRIP_FORM_SUCCESS,
  payload,
});

const sendRoadtripFormFailure = (payload) => ({
  type: SEND_ROADTRIP_FORM_FAILURE,
  payload,
});

export const sendRoadtripForm = (contactFormValues) => (dispatch, getState) => {
  const {
    firstName,
    lastName,
    emailAddress,
    address1,
    address2,
    citstatzip,
    partySize,
    partyNames,
    camprv,
    basecamp,
    bringing,
  } = contactFormValues;
  const { cid, at, token } = getState().user;
  dispatch(sendRoadtripFormStart());
  return axios.post('/api/app/sendRoadtripForm', {
    cid,
    at,
    token,
    firstName,
    lastName,
    emailAddress,
    address1,
    address2,
    citstatzip,
    partySize,
    partyNames,
    camprv,
    basecamp,
    bringing,
  })
  .then(result => {
    if (result.data && !result.data.apiError) {
      dispatch(reset('contact'));
    }
    dispatch(sendRoadtripFormSuccess(result.data))
  })
  .catch(error => {
    dispatch(sendRoadtripFormFailure(error));
    throw new SubmissionError({ _error: 'Your message in was unsuccessful. Please try again.' });
  });
};
