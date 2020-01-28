import { createSelector } from 'reselect';
import { get } from 'lodash';

export const selectCustomerAdminTools = state => state.customerAdminTools;

export const makeIsFetchingSelector = () =>
  createSelector(
    selectCustomerAdminTools,
    state => state.isFetching
  );

  export const makeCustomerAdminToolsURLSelector = () =>
    createSelector(
      selectCustomerAdminTools,
      state => state.customerAdminToolsURL
    );
