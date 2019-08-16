import { createSelector } from 'reselect';
import { get } from 'lodash';

export const selectAccountSettings = state => state.accountSettings;

export const makeIsFetchingSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.isFetching
  );

export const makeAccountMenuListSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.accountMenuList
  );

export const makeAccountTypeSectionSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.accountTypeSection
  );

export const makeAccountDetailsSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.accountDetails
  );

export const makeAccountCancelSectionSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.accountCancelSection
  );

export const makeAccountEditPaymentSectionSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.editPaymentSection
  );

export const makeSubscriptionPlansDataSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.subscriptionPlans.data
  );

export const makeSubscriptionPlansFetchingSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.subscriptionPlans.isFetching
  );

export const makeEmailSelector = () =>
  createSelector(
    selectAccountSettings,
    state => {
      return get(
        state,
        'accountDetails.formFields.loginEmailAddress.currentValue',
        ''
      );
    }
  );

export const makeShowPasswordPopupSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.showForgetPasswordPopup
  );

export const makePasswordPopupTextSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.forgetPasswordText
  );
