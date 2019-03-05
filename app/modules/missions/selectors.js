import { getSelectOptions } from 'app/utils/common-methods';
import _get from 'lodash/get';
import { createSelector } from 'reselect';

export const selectMissions = state => state.missions;

export const makeMissionsLoadingSelector = () =>
  createSelector(
    selectMissions,
    state => state.isFetching
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
      const catList = _get(state, 'categoryList', []);
      return getSelectOptions(catList, 'categorySlug', 'categoryName');
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

export const makeBySlooh1000SelectedObjectSlugSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => state.selectedObjectSlug
  );

export const makeBySlooh1000SelectedObjectDataSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => {
      return state.objectList.filter(
        item => item.topicSlug === state.selectedObjectSlug
      )[0];
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
      return getSelectOptions(state, 'topicSlug', 'topicName');
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
