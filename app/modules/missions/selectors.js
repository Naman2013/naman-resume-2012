import { getSelectOptions } from 'app/utils/common-methods';
import _get from 'lodash/get';
import { createSelector } from 'reselect';

export const selectMissions = state => state.missions;

export const makeMissionsLoadingSelector = () =>
  createSelector(
    selectMissions,
    state => state.isFetching
  );

export const makeMissionsTelescopeFetchingSelector = () =>
  createSelector(
    selectMissions,
    state => state.isTelescopeFetching
  );

export const makeMissionsPageSetupSelector = () =>
  createSelector(
    selectMissions,
    state => state.pageSetup
  );

export const makeMissionsData = () =>
  createSelector(
    selectMissions,
    state => state.missions
  );

export const makeMissionsFirstSlot = () =>
  createSelector(
    makeMissionsData(),
    state => state.missionList[0]
  );

export const makeReservedMissionData = () =>
  createSelector(
    makeMissionsData(),
    state => state.reservedMissionList[0] || {}
  );

export const makeReservedMissionSelector = () =>
  createSelector(
    makeMissionsData(),
    state => state.reservedMission || {}
  );

// bySlooh1000
export const makeBySlooh1000Selector = () =>
  createSelector(
    selectMissions,
    state => state.bySlooh1000
  );

export const makeBySlooh1000DataSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => state.bySlooh1000Data
  );

export const makeBySlooh1000CategoryListSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => state.categoryList
  );

/**
 * Gets the categoryList from reducer
 * Returns categoryList options ready for Select
 */
export const makeBySlooh1000CategoryListSelectOptsSelector = () =>
  createSelector(
    makeBySlooh1000CategoryListSelector(),
    state => {
      return getSelectOptions(
        state,
        'itemIndex',
        'itemDisplayName',
        'itemIsEnabled'
      );
    }
  );

export const makeBySlooh1000SelectedCategorySlugSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => state.selectedCategorySlug
  );

export const makeBySlooh1000ObjectListSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => state.objectList
  );

export const makeBySlooh1000SelectedObjectIdSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => state.selectedObjectId
  );

export const makeBySlooh1000SelectedObjectDataSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => {
      return state.objectList.filter(
        item => item.objectId === state.selectedObjectId
      )[0];
    }
  );

export const makeBySlooh1000ObjectListExpiresSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => state.objectListExpires
  );

/**
 * Gets the objectList from reducer
 * Returns objectList options ready for Select
 */
export const makeBySlooh1000ObjectListSelectOptsSelector = () =>
  createSelector(
    makeBySlooh1000ObjectListSelector(),
    state => {
      return getSelectOptions(
        state,
        'objectId',
        'objectTitle',
        'objectIsEnabled'
      );
    }
  );

// byConstellation
export const makeByConstellationSelector = () =>
  createSelector(
    selectMissions,
    state => state.byConstellation
  );

export const makeByConstellationListSelector = () =>
  createSelector(
    makeByConstellationSelector(),
    state => state.constellationList
  );

export const makeByConstellationListSelectOptsSelector = () =>
  createSelector(
    makeByConstellationListSelector(),
    state => {
      return getSelectOptions(state, 'constellationName', 'constellationName');
    }
  );

export const makeByConstellationSelectedConstellationSelector = () =>
  createSelector(
    makeByConstellationSelector(),
    state => state.selectedConstellation
  );

export const makeByConstellationObjectListSelector = () =>
  createSelector(
    makeByConstellationSelector(),
    state => state.objectList
  );

export const makeByConstellationSelectedObjectIdSelector = () =>
  createSelector(
    makeByConstellationSelector(),
    state => state.selectedObjectId
  );

export const makeByConstellationSelectedObjectDataSelector = () =>
  createSelector(
    makeByConstellationSelector(),
    state => {
      return state.objectList.filter(
        item => item.objectId === state.selectedObjectId
      )[0];
    }
  );

export const makeByConstellationObjectListSelectOptsSelector = () =>
  createSelector(
    makeByConstellationObjectListSelector(),
    state => {
      return getSelectOptions(
        state,
        'objectId',
        'objectTitle',
        'objectIsEnabled'
      );
    }
  );

export const makeByConstellationObjectListExpiresSelector = () =>
  createSelector(
    makeByConstellationSelector(),
    state => state.objectListExpires
  );

// byCatalog
export const makeByCatalogSelector = () =>
  createSelector(
    selectMissions,
    state => state.byCatalog
  );

export const makeByCatalogListSelector = () =>
  createSelector(
    makeByCatalogSelector(),
    state => state.catalogList
  );

export const makeByCatalogListListSelectOptsSelector = () =>
  createSelector(
    makeByCatalogSelector(),
    state => {
      const catList = _get(state, 'catalogList', []);
      return getSelectOptions(catList, 'catalog', 'catFullName');
    }
  );

export const makeByCatalogSelectedCatalogSelector = () =>
  createSelector(
    makeByCatalogSelector(),
    state => state.selectedCatalog
  );

export const makeByCatalogSelectedCatalogDataSelector = () =>
  createSelector(
    makeByCatalogSelector(),
    state => {
      return state.catalogList.filter(
        item => item.catalog === state.selectedCatalog
      )[0];
    }
  );

export const makeByCatalogDesignationSelector = () =>
  createSelector(
    makeByCatalogSelector(),
    state => state.designation
  );

export const makeByCatalogObjectDataSelector = () =>
  createSelector(
    makeByCatalogSelector(),
    state => state.objectData
  );

export const makeByCatalogTelescopeDataSelector = () =>
  createSelector(
    makeByCatalogSelector(),
    state => state.telescopeData
  );

export const makeByCatalogProcessingRecipeSelector = () =>
  createSelector(
    makeByCatalogSelector(),
    state => state.processingRecipe
  );

// by telescope
export const makeByTelescopeSelector = () =>
  createSelector(
    selectMissions,
    state => state.byTelescope
  );

export const makeTelescopeListSelector = () =>
  createSelector(
    makeByTelescopeSelector(),
    state => state.telescopeList
  );

export const makeTelescopeSelectedTelescopeSelector = () =>
  createSelector(
    makeByTelescopeSelector(),
    state => state.selectedTelescope
  );

export const makeTelescopeSelectedDateSelector = () =>
  createSelector(
    makeByTelescopeSelector(),
    state => state.dateList[0]
  );

export const makeTelescopeMissionListSelector = () =>
  createSelector(
    makeByTelescopeSelector(),
    state => state.missionList
  );
