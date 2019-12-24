import { createSelector } from 'reselect';

export const selectShows = state => state.shows;

export const makeDashboardShowsSelector = () =>
  createSelector(
    selectShows,
    state => state.dashboardShowsList
  );
