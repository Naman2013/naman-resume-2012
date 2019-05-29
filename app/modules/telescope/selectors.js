import { createSelector } from 'reselect';
// import _ from 'lodash/fp';

export const selectTelescope = state => state.telescope;
export const selectTelescopeDetails = state => state.telescopeDetails;
export const selectTelescopeOverview = state => state.telescopeOverview;

export const makeTelescopeFetchingSelector = () =>
  createSelector(
    selectTelescope,
    state => state.isFetching
  );

export const makeTelescopeDataSelector = () =>
  createSelector(
    selectTelescope,
    state => state.data
  );

export const makeTelescopePageSetupSelector = () =>
  createSelector(
    selectTelescope,
    state => state.pageSetup
  );

export const makeAllSkyTimelapseSelector = () =>
  createSelector(
    selectTelescope,
    state => state.allSkyTimelapse
  );

export const makeAllSkyTimelapseURLSelector = () =>
  createSelector(
    makeAllSkyTimelapseSelector(),
    state => state.data.allskyTimelapseURL
  );

export const makeAllSkyTimelapseFetchingSelector = () =>
  createSelector(
    makeAllSkyTimelapseSelector(),
    state => state.isFetching
  );

export const makeAllSkyCameraSelector = () =>
  createSelector(
    selectTelescopeOverview,
    state => state.allSkyWidgetResult
  );

export const makeDayNightBarPanelSelector = () =>
  createSelector(
    selectTelescopeDetails,
    state => state.dayNightBarPanel
  );

export const makeDayNightBarSelector = () =>
  createSelector(
    selectTelescopeDetails,
    state => state.dayNightBar
  );

export const makeDayNightMapSelector = () =>
  createSelector(
    selectTelescopeDetails,
    state => state.dayNightMap
  );

export const makeWeatherSatelliteSelector = () =>
  createSelector(
    selectTelescopeOverview,
    state => state.weatherSatelliteWidgetResult
  );

export const makeDomeCamSelector = () =>
  createSelector(
    selectTelescopeOverview,
    state => state.domeCamWidgetResult
  );

export const makeFacilityWebcamSelector = () =>
  createSelector(
    selectTelescopeOverview,
    state => state.observatoryLiveWebcamResult
  );

export const makeMoonlightBarSelector = () =>
  createSelector(
    selectTelescopeOverview,
    state => state.moonlightBarResult
  );

// Queue tab

export const makeQueueTabSelector = () =>
  createSelector(
    selectTelescope,
    state => state.queueTab
  );

export const makeQueueTabUpcomingSlotsDataSelector = () =>
  createSelector(
    makeQueueTabSelector(),
    state => state.upcomingSlotsData
  );

export const makeQueueTabIsFetchingSelector = () =>
  createSelector(
    makeQueueTabSelector(),
    state => state.isFetching
  );

export const makeQueueTabFeaturedObjectsDataSelector = () =>
  createSelector(
    makeQueueTabSelector(),
    state => state.featuredObjectsData
  );

export const makeQueueTabReservedCommunityMissionDataSelector = () =>
  createSelector(
    makeQueueTabSelector(),
    state => state.reservedCommunityMissionData
  );

export const makeQueueTabReservedCommunityMissionSelector = () =>
  createSelector(
    makeQueueTabSelector(),
    state => state.reservedCommunityMissionList[0]
  );
