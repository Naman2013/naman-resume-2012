// @flow
import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { set } from 'qim';
import { TInitialState } from './types';

export const TYPE = constants('customer-admin-tools', [
  '~FETCH_CUSTOMER_ADMIN_TOOLS',
]);
export const ACTION = actions(TYPE);

export const initialState: TInitialState = {
  isFetching: false,
  isLoaded: false,
  serverError: null,
  customerAdminToolsURL: null,
};

export default handleActions(
  {
    [TYPE.FETCH_CUSTOMER_ADMIN_TOOLS]: fetchCustomerAdminTools,
    [TYPE.FETCH_CUSTOMER_ADMIN_TOOLS_SUCCESS]: fetchCustomerAdminToolsSuccess,
    [TYPE.FETCH_CUSTOMER_ADMIN_TOOLS_ERROR]: fetchCustomerAdminToolsError,
  },
  initialState
);

function fetchCustomerAdminTools(state) {
  return set(['isFetching'], true, state);
}

function fetchCustomerAdminToolsSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    customerAdminToolsURL: action.payload.customerAdminToolsURL,
    status: action.payload.status,
    statusMessage: action.payload.statusMessage,
  };
}


function fetchCustomerAdminToolsError(state, action) {
  return set(['serverError'], action.payload, state);
}
