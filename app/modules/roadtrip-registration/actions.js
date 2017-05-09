import axios from 'axios';
import { SubmissionError, reset } from 'redux-form';
import { captureErrorState } from '../authorization/actions';

const SEND_ROADTRIP_FORM_START = 'SEND_ROADTRIP_FORM_START';
const SEND_ROADTRIP_FORM_SUCCESS = 'SEND_ROADTRIP_FORM_SUCCESS';
const SEND_ROADTRIP_FORM_FAILURE = 'SEND_ROADTRIP_FORM_FAILURE';

const authenticateRegistrationPageSuccess = (pathname, replace, callback) => (callback());

const authenticateRegistrationPageFail = (apiRes, pathname, replace, callback) => (dispatch) => {
  dispatch(captureErrorState(apiRes));
  replace('/redirect-confirmation');
  callback();

};

export const authenticateRegistrationPage = (pathname, replace, callback) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  return axios.post('/api/users/accessRoadtripForm', {
    cid,
    at,
    token,
  })
  .then((res) => {
    if (!res.data.apiError) {
      dispatch(authenticateRegistrationPageSuccess(pathname, replace, callback));
    } else {
      dispatch(authenticateRegistrationPageFail(res.data, pathname, replace, callback));
    }
  })
  .catch((error) => dispatch(authenticateRegistrationPageFail(error, pathname, replace, callback)));
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
      dispatch(reset('roadtrip-registration'));
    }
    dispatch(sendRoadtripFormSuccess(result.data))
  })
  .catch(error => {
    dispatch(sendRoadtripFormFailure(error));
    throw new SubmissionError({ _error: 'Your message in was unsuccessful. Please try again.' });
  });
};
