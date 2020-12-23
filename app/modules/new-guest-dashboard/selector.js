import { createSelector } from 'reselect';

export const state = state => state.newGuestDashboard;

export const makeLandingPageDetailsSelector = () =>
  createSelector(
    state,
    state => state.landingPageDetails
  );