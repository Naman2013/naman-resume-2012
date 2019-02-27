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
      const catList = _get(state, 'categoryList', []);
      return getSelectOptions(catList, 'categorySlugLookupId', 'categoryName');
    }
  );
