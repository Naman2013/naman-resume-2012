import { validateResponseAccess } from '../authorization/actions';

export default function callAPIMiddleware({ dispatch, getState }) {
  return next => (action) => {

    if (!action) {
      return;
    }

    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
    } = action;

    // =================================================
    // here is where the access validation magic occurrs
    // =================================================
    if (!types) {
      if (action.payload && action.payload.statusCode) {
        dispatch(validateResponseAccess(action.payload));
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
