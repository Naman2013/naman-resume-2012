import { createSelector } from 'reselect';

export const selectUser = state => state.user;

export const makeUserSelector = () =>
  createSelector(
    selectUser,
    state => state
  );
