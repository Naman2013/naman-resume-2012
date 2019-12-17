import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { Action } from 'app/common/types';
import { IPurchaseConfirmationResponse } from 'app/modules/purchase-confirmation/types';

export const TYPE = constants('account-settings', [
  '~GET_PURCHASE_CONFIRMATION',
]);
export const ACTION = actions(TYPE);

interface IInitialState {
  isFetching: boolean;
  error: any;

  purchaseConfirmationData: IPurchaseConfirmationResponse | {};
}

export const initialState: IInitialState = {
  isFetching: false,
  error: null,

  purchaseConfirmationData: {},
};

export default handleActions(
  {
    [TYPE.GET_PURCHASE_CONFIRMATION]: start,
    [TYPE.GET_PURCHASE_CONFIRMATION_SUCCESS]: getPurchaseConfirmationSuccess,
    [TYPE.GET_PURCHASE_CONFIRMATION_ERROR]: error,
  },
  initialState
);

function start(state: IInitialState) {
  return { ...state, isFetching: true };
}

function error(state: IInitialState, action: Action<any>) {
  return {
    ...state,
    error: action.payload,
    isFetching: false,
  };
}

function getPurchaseConfirmationSuccess(
  state: IInitialState,
  action: Action<IPurchaseConfirmationResponse>
) {
  return {
    ...state,
    purchaseConfirmationData: action.payload,
    isFetching: false,
  };
}
