import { createSelector } from 'reselect';

export const selectStarParyList = state => state.newDashboard;


export const makeStarPartyListSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.upcomingStarPartyList
  );