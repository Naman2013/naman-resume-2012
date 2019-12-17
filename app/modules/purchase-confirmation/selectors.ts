import { createSelector } from 'reselect';

const purchaseConfirmationSelector = (state: any) => state.purchaseConfirmation;

export const purchaseConfirmationDataSelector = () =>
  createSelector(
    purchaseConfirmationSelector,
    state => state.purchaseConfirmationData
  );

export const purchaseConfirmationLoadingSelector = () =>
  createSelector(
    purchaseConfirmationSelector,
    state => state.isFetching
  );
