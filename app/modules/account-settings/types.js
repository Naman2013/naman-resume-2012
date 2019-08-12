// @flow
export type TCurrentSubscriptionPlanItem = {
  imageUrl: string,
  isUpgradeAvailable: boolean,
  nextRenewalDate: string | Date,
  planId: number,
  planInfoUrl: string,
  planName: string,
  priceDisplayLabel: string,
  startDateText: string | Date,
  upgradeButtonLabel: string,
};

export type TTypeSectionItem = {
  accountStatus: string,
  accountStatusLabel: string,
  accountTypeHeading: string,
  currentSubscriptionPlan: Object<TCurrentSubscriptionPlanItem>,
};

export type TFormFieldItem = {
  currentValue: string,
  hintText: string,
  label: string,
};

export type TFormField = {
  firstName: Object<TFormFieldItem>,
  lastName: Object<TFormFieldItem>,
  displayName: Object<TFormFieldItem>,
};

export type TAccountDetailsItem = {
  accountDetailsHeading: string,
  formFields: Object<TFormField>,
};

export type TAccountCancelSectionItem = {
  canUserCancelTheirAccount: boolean,
  userCancellationHeading1: string,
  userCancellationInProgress: boolean,
  userCancellationInProgressExplaination: string,
  userCancellationInstructionsText: string,
};

export type TAccountEditPaymentSectionItem = {
  canUserEditPayment: boolean,
  editPaymentMethod: string,
  editPaymentMethod2: string,
  editPaymentButtonText: string,
  editPaymentHeading: string,
  hostedPaymentFormURL: string,
  curPaymentInfo: shape,
};

export type TInfoItem = {
  linkUrl: string,
  name: string,
};

export type TInitialState = {
  isFetching: boolean,
  isFetchingFormField: boolean,
  isLoaded: boolean,
  serverError: boolean,
  accountCancelSection: Object<TAccountCancelSectionItem>,
  editPaymentSection: Object<TAccountEditPaymentSectionItem>,
  accountDetails: Object<TAccountDetailsItem>,
  accountMenuList: Object<TInfoItem>,
  accountTypeSection: Object<TTypeSectionItem>,
};
