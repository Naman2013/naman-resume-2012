import { createSelector } from 'reselect';

export const selectDashboard = state => state.dashboard;

export const makeDashboardFeaturedObjectsSelector = () =>
  createSelector(
    selectDashboard,
    state => state.featuredObjects
  );
