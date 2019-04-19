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

export const makeBySlooh1000AvailableMissionsSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => {
      return (
        state.availableMissionsCount === 0 &&
        state.objectCount > 0 &&
        !!state.selectedCategorySlug
      );
    }
  );

export const makeBySlooh1000NoObjectsSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => {
      return state.objectCount === 0 && !!state.selectedCategorySlug;
    }
  );

export const makeBySlooh1000MissionTypeSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => {
      return state.missionType;
    }
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

export const makeBySlooh1000DataSelector = () =>
  createSelector(
    makeBySlooh1000CategoryListSelector(),
    makeBySlooh1000CategoryListSelectOptsSelector(),
    makeBySlooh1000SelectedCategorySlugSelector(),
    makeBySlooh1000ObjectListSelector(),
    makeBySlooh1000ObjectListSelectOptsSelector(),
    makeBySlooh1000SelectedObjectIdSelector(),
    makeBySlooh1000SelectedObjectDataSelector(),
    makeBySlooh1000ObjectListExpiresSelector(),
    makeBySlooh1000AvailableMissionsSelector(),
    makeBySlooh1000NoObjectsSelector(),
    makeBySlooh1000MissionTypeSelector(),
    (
      categoryList,
      categoryListOpts,
      selectedCategorySlug,
      objectList,
      objectListOpts,
      selectedObjectId,
      selectedObjectData,
      objectListExpires,
      availableMissions,
      noObjects,
      missionType
    ) => {
      return {
        categoryList,
        categoryListOpts,
        selectedCategorySlug,
        objectList,
        objectListOpts,
        selectedObjectId,
        selectedObjectData,
        objectListExpires,
        availableMissions,
        noObjects,
        missionType,
      };
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

export const makeByConstellationAvailableMissionsSelector = () =>
  createSelector(
    makeByConstellationSelector(),
    state => {
      return (
        state.availableMissionsCount === 0 &&
        state.objectCount > 0 &&
        !!state.selectedConstellation
      );
    }
  );

export const makeByConstellationNoObjectsSelector = () =>
  createSelector(
    makeByConstellationSelector(),
    state => {
      return state.objectCount === 0 && !!state.selectedConstellation;
    }
  );

export const makeByConstellationMissionTypeSelector = () =>
  createSelector(
    makeByConstellationSelector(),
    state => {
      return state.missionType;
    }
  );

export const makeByConstellationDataSelector = () =>
  createSelector(
    makeByConstellationListSelector(),
    makeByConstellationListSelectOptsSelector(),
    makeByConstellationSelectedConstellationSelector(),
    makeByConstellationObjectListSelector(),
    makeByConstellationObjectListSelectOptsSelector(),
    makeByConstellationSelectedObjectIdSelector(),
    makeByConstellationSelectedObjectDataSelector(),
    makeByConstellationObjectListExpiresSelector(),
    makeByConstellationAvailableMissionsSelector(),
    makeByConstellationNoObjectsSelector(),
    makeByConstellationMissionTypeSelector(),
    (
      constellationList,
      constellationListOpt,
      selectedConstellation,
      objectList,
      objectListOpts,
      selectedObjectId,
      selectedObjectData,
      objectListExpires,
      availableMissions,
      noObjects,
      missionType
    ) => {
      return {
        constellationList,
        constellationListOpt,
        selectedConstellation,
        objectList,
        objectListOpts,
        selectedObjectId,
        selectedObjectData,
        objectListExpires,
        availableMissions,
        noObjects,
        missionType,
      };
    }
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

export const makeByCatalogDataSelector = () =>
  createSelector(
    makeByCatalogListSelector(),
    makeByCatalogListListSelectOptsSelector(),
    makeByCatalogSelectedCatalogSelector(),
    makeByCatalogSelectedCatalogDataSelector(),
    makeByCatalogDesignationSelector(),
    makeByCatalogObjectDataSelector(),
    makeByCatalogTelescopeDataSelector(),
    makeByCatalogProcessingRecipeSelector(),
    makeMissionsLoadingSelector(),
    makeMissionsFirstSlot(),
    makeReservedMissionData(),
    makeReservedMissionSelector(),
    (
      catalogList,
      catalogListOpts,
      selectedCatalog,
      selectedCatalogData,
      designation,
      objectData,
      telescopeData,
      processingRecipe,
      isFetching,
      missionSlot,
      reservedMissionData,
      reservedMission,
    ) => {
      return {
        catalogList,
        catalogListOpts,
        selectedCatalog,
        selectedCatalogData,
        designation,
        objectData,
        telescopeData,
        processingRecipe,
        isFetching,
        missionSlot,
        reservedMissionData,
        reservedMission,
      };
    }
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

export const makeTelescopeSelectedSlotSelector = () =>
  createSelector(
    makeByTelescopeSelector(),
    state => state.selectedSlot
  );

export const makeTelescopeMissionListRefreshIntervalSelector = () =>
  createSelector(
    makeByTelescopeSelector(),
    state => state.missionListRefreshInterval
  );

// by coordinates

export const makeByCoordinatesSelector = () =>
  createSelector(
    selectMissions,
    state => state.byCoordinates
  );

export const makeByCoordinatesCoordinatesDataSelector = () =>
  createSelector(
    makeByCoordinatesSelector(),
    state => state.coordinatesData
  );

export const makeByCoordinatesTargetNameSelector = () =>
  createSelector(
    makeByCoordinatesSelector(),
    state => state.targetName
  );

export const makeByCoordinatesDataSelector = () =>
  createSelector(
    makeByCoordinatesCoordinatesDataSelector(),
    makeBySlooh1000CategoryListSelector(),
    makeBySlooh1000CategoryListSelectOptsSelector(),
    makeBySlooh1000SelectedCategorySlugSelector(),
    makeByCatalogDesignationSelector(),
    makeByCatalogObjectDataSelector(),
    makeByCatalogTelescopeDataSelector(),
    makeByCatalogProcessingRecipeSelector(),
    makeMissionsLoadingSelector(),
    makeMissionsFirstSlot(),
    makeReservedMissionData(),
    makeReservedMissionSelector(),
    makeByCoordinatesTargetNameSelector(),
    (
      coordinatesData,
      categoryList,
      categoryListOpts,
      selectedCategorySlug,
      designation,
      objectData,
      telescopeData,
      processingRecipe,
      isFetching,
      missionSlot,
      reservedMissionData,
      reservedMission,
      targetName,
    ) => {
      return {
        categoryList,
        categoryListOpts,
        selectedCategorySlug,
        designation,
        objectData,
        telescopeData,
        processingRecipe,
        isFetching,
        missionSlot,
        reservedMissionData,
        reservedMission,
        coordinatesData,
        targetName,
      };
    }
  );