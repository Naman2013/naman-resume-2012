import { createSelector } from 'reselect';

export const state = state => state.newGuestDashboard;

export const makeLandingPageDetailsSelector = () =>
  createSelector(
    state,
    state => state.landingPageDetails
  );

export const makeFetchSubscriptionPlanSelector = () =>
  createSelector(
    state,
    state => state.subscriptionPlans
  );