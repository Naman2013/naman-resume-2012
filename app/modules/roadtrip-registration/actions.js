import axios from 'axios';
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

const sendRoadtripFormStart = () => ({
  type: SEND_ROADTRIP_FORM_START,
});

const sendRoadtripFormSuccess = () => ({
  type: SEND_ROADTRIP_FORM_SUCCESS,
});

const sendRoadtripFormFailure = () => ({
  type: SEND_ROADTRIP_FORM_FAILURE,
});

export const sendRoadtripForm = (contactFormValues) => (dispatch, getState) => {
  const {
    firstName,
    lastName,
    emailAddress,
    address1,
    address2,
    citstatzip,
    partysize,
    partynames,
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
    partysize,
    partynames,
    camprv,
    basecamp,
    bringing,
  })
  .then(result => dispatch(sendRoadtripFormSuccess(result.data)))
  .catch(error => dispatch(sendRoadtripFormFailure(error)));
};
