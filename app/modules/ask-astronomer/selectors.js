import { createSelector } from 'reselect';

export const selectAskAstronomer = state => state.askAstronomer;

export const makeAskAstronomerFetchingSelector = () =>
  createSelector(
    selectAskAstronomer,
    state => state.isFetching
  );

export const makeAskAstronomerPageDataSelector = () =>
  createSelector(
    selectAskAstronomer,
    state => state.pageData
  );

export const makeAskAstronomerQuestionsDataSelector = () =>
  createSelector(
    selectAskAstronomer,
    state => state.questionsData
  );
