import { createSelector } from 'reselect';

const leaderboardSelector = (state: any) => state.leaderboard;

export const leaderboardDataSelector = createSelector(
  leaderboardSelector,
  state => state.leaderboardData
);
