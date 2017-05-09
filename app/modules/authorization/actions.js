import { push } from 'react-router-redux';
import { fetchHandleErrors } from '../../services/authorization/handle-error';
import { destroySession } from '../User';

export const FETCH_ERRORS_START = 'FETCH_ERRORS_START';
export const FETCH_ERRORS_SUCCESS = 'FETCH_ERRORS_SUCCESS';

export const CAPTURE_ERROR_STATE = 'CAPTURE_ERROR_STATE';
export const RESET_ERROR_STATE = 'RESET_ERROR_STATE';

export const VALIDATE_RESPONSE = 'VALIDATE_RESPONSE';

const fetchErrorsStart = () => ({
  type: FETCH_ERRORS_START,
});

const fetchErrorsSuccess = payload => ({
  type: FETCH_ERRORS_SUCCESS,
  payload,
});

export const captureErrorState = ({ apiError, errorCode, statusCode, currentPageID }) => ({
  type: CAPTURE_ERROR_STATE,
  apiError,
  errorCode,
  statusCode,
  currentPageID,
});

export const fetchErrors = () => (dispatch, getState) => {
  dispatch(fetchErrorsStart());
  const { cid, token, at } = getState().user;
  const { apiError, errorCode, statusCode, currentPageID } = getState().authorization;
  return fetchHandleErrors({
    cidCheck: cid,
    atCheck: at,
    tokenCheck: token,
    apiErrorCheck: apiError,
    errorCodeCheck: errorCode,
    statusCodeCheck: statusCode,
    currentPageId: currentPageID,
  })
  .then((result) => {
    dispatch(fetchErrorsSuccess(result.data));
    const MEMBER_UPSELL = 'memberUpsell';
    const GOTO_HOMEPAGE = 'gotoHomePage';
    const LOGIN_UPSELL = 'loginUpsell';
    const { responseType } = result.data;

    if (responseType === MEMBER_UPSELL) {
      dispatch(push('registration/upgrade'));
    }

    if (responseType === GOTO_HOMEPAGE) {
      dispatch(push('/'));
    }

    if (responseType === LOGIN_UPSELL) {
      dispatch(push('/registration/sign-in'));
    }
  });
};

export const validateResponseAccess = apiResponse => (dispatch) => {
  const SIGN_IN_PATH = '/registration/sign-in';
  const REDIRECT_CONFIRMATION_PATH = '/redirect-confirmation';
  const UNAUTHORIZED_STATUS_CODE = 401;
  const BAD_LOGIN_SESSION_CODE = 60003;

  const { apiError, errorCode, statusCode, loginError } = apiResponse;
  if (statusCode === UNAUTHORIZED_STATUS_CODE) {
    if (typeof loginError === 'undefined') {
      if (errorCode === BAD_LOGIN_SESSION_CODE) {
        // destroy the user session
        destroySession();
      }
      dispatch(captureErrorState({
        apiError,
        errorCode,
        statusCode,
      }));
      dispatch(push(REDIRECT_CONFIRMATION_PATH));
    }
    return false;
  }
  return true;
};
