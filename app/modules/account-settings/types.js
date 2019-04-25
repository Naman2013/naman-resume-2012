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
export type TFormFieldMocked = {
  count: number,
  name: string,
  type: string,
};

export type TInitialState = {
  isFetching: boolean,
  isLoaded: boolean,
  serverError: boolean,
  accountCancelSection: Object<TAccountCancelSectionItem>,
  accountDetails: Object<TAccountDetailsItem>,
  accountMenuList: Object<TInfoItem>,
  accountTypeSection: Object<TTypeSectionItem>,

  // mocked
  // TODO: get rid of mocked data
  accountDetailsOptions: Array<TFormFieldMocked>,
  paymentDetailsOptions: Array<TFormFieldMocked>,
};
