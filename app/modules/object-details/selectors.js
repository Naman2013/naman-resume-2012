import { createSelector } from 'reselect';

export const selectObjectDetails = state => state.objectDetails;

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
