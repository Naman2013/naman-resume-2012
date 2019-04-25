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
  currentSubscriptionPlan: Array<TCurrentSubscriptionPlanItem>,
};

export type TFormFieldItem = {
  hintText: string,
  label: string,
  currentValue: string,
};

export type TFormField = {
  firstName: Array<TFormFieldItem>,
  lastName: Array<TFormFieldItem>,
  displayName: Array<TFormFieldItem>,
};

export type TAccountDetailsItem = {
  accountDetailsHeading: string,
  formFields: Array<TFormField>,
};

export type TAccountCancelSectionItem = {
  canUserCancelTheirAccount: boolean,
  userCancellationHeading1: string,
  userCancellationInProgress: boolean,
  userCancellationInProgressExplaination: string,
  userCancellationInstructionsText: string,
};

export type TInfoItem = {
  linkUrl: string,
  name: string,
};

// mocked types
export type TAccountTypeItem = {
  label: string,
  name: string | Date | number,
};

export type TFormFieldMocked = {
  count: number,
  name: string,
  type: string,
};

export type TInitialState = {
  isFetching: boolean,
  isLoaded: boolean,
  serverError: boolean,
  accountCancelSection: Array<TAccountCancelSectionItem>,
  accountDetails: Array<TAccountDetailsItem>,
  accountMenuList: Object<TInfoItem>,
  accountTypeSection: Array<TTypeSectionItem>,

  // mocked
  // TODO: get rid of mocked data
  accountTypeItems: Array<TAccountTypeItem>,
  accountDetailsOptions: Array<TFormFieldMocked>,
  paymentDetailsOptions: Array<TFormFieldMocked>,
};
