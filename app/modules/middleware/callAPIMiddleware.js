import { push } from 'react-router-redux';
import { captureErrorState } from '../authorization/actions';

const SIGN_IN_PATH = '/registration/sign-in';
const REDIRECT_CONFIRMATION_PATH = '/redirect-confirmation';
const UNAUTHORIZED_STATUS_CODE = 401;

export default function callAPIMiddleware({ dispatch, getState }) {
  return next => (action) => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
    } = action;

    if (!types) {
      // If payload has 401 (unauthorized code) we are redirecting them to upsell page
      if (action.payload && action.payload.statusCode) {
        if (action.payload.statusCode === UNAUTHORIZED_STATUS_CODE) {
          const { apiError, errorCode, statusCode, loginError } = action.payload;
          if (typeof loginError === 'undefined') {
            dispatch(captureErrorState({
              apiError,
              errorCode,
              statusCode,
            }));
            dispatch(push(REDIRECT_CONFIRMATION_PATH));
          }
        }
      }

      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return next(action);
    }

    const [ requestType, successType, failureType ] = types;

    next(Object.assign({}, payload, {
      type: requestType
    }));

    return callAPI().then(
      response => {
        return next(Object.assign({}, payload, {
        response,
        type: successType
      }))},
      error => next(Object.assign({}, payload, {
        error,
        type: failureType
      }))
    )
  }
}
