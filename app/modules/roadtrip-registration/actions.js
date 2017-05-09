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

export const sendRoadtripForm = ({
  lang,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(sendRoadtripFormStart());
  return axios.post('/api/app/sendRoadtripForm', {
    cid,
    at,
    token,
    lang,
    ver,
  })
  .then(result => dispatch(sendRoadtripFormSuccess(result.data)))
  .catch(error => dispatch(sendRoadtripFormFailure(error)));
};
