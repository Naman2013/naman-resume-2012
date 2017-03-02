import { fetchHandleErrors } from '../../services/authorization/handle-error';
import { push } from 'react-router-redux';

export const FETCH_ERRORS_START = 'FETCH_ERRORS_START';
export const FETCH_ERRORS_SUCCESS = 'FETCH_ERRORS_SUCCESS';

export const CAPTURE_ERROR_STATE = 'CAPTURE_ERROR_STATE';
export const RESET_ERROR_STATE = 'RESET_ERROR_STATE';

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
    const { responseType } = result.data;

    if (responseType === MEMBER_UPSELL) {
      dispatch(push('registration/upgrade'));
    }
  });
};
