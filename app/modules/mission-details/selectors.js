import { createSelector } from 'reselect';

export const selectMissionDetails = state => state.missionDetails;

export const makeMissionDetailsLoadingSelector = () =>
  createSelector(
    selectMissionDetails,
    state => state.isFetching
  );

export const makeMissionDetailsTitleSelector = () =>
  createSelector(
    selectMissionDetails,
    state => state.missionTitle
  );

export const makeMissionDetailsIconURLSelector = () =>
  createSelector(
    selectMissionDetails,
    state => state.missionIconURL
  );

export const makeMissionDetailsDateCreatedSelector = () =>
  createSelector(
    selectMissionDetails,
    state => state.missionDateCreated
  );

export const makeMissionDetailsImageCountSelector = () =>
  createSelector(
    selectMissionDetails,
    state => state.imageCount
  );

export const makeMissionDetailsImageListSelector = () =>
  createSelector(
    selectMissionDetails,
    state => state.imageList
  );

export const makeMissionDetailsApiURLSelector = () =>
  createSelector(
    selectMissionDetails,
    state => state.apiURL
  );

// TAGS
export const makeTagsFetchingSelector = () =>
  createSelector(
    selectMissionDetails,
    state => state.tagsData.isFetching
  );

export const makeTagListSelector = () =>
  createSelector(
    selectMissionDetails,
    state => state.tagsData.tagList
  );
