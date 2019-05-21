import { createSelector } from 'reselect';

export const selectObjectDetails = state => state.objectDetails;

export const makeObjectDetailsFetchingSelector = () =>
  createSelector(
    selectObjectDetails,
    state => state.isFetching
  );

export const makeObjectDetailsDataSelector = () =>
  createSelector(
    selectObjectDetails,
    state => state.objectDetails
  );

export const makeObjectDetailsMissionsSelector = () =>
  createSelector(
    selectObjectDetails,
    state => state.objectMissions
  );
