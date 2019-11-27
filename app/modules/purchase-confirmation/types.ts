export interface IPurchaseConfirmationResponse {
  ver: string;
  lang: string;
  apiError: boolean;
  errorCode: number;
  errorMsg: string;
  statusCode: number;
  accountTypeSection: {
    accountTypeHeading: string;
    currentSubscriptionPlan: {
      planId: string;
      nextRenewalDate: string;
      planName: string;
      planTeaserContent: string;
      startDateText: string;
      priceDisplayLabel: string;
      showRenewalDate: true;
      isUpgradeAvailable: null; // ?
      upgradeButtonLabel: null; // ?
      planInfoUrl: string;
      imageUrl: string;
    };
    accountStatusLabel: string;
    accountStatus: null; // ?
  };
  accountDetails: {
    accountDetailsHeading: string;
    formFields: {
      displayName: {
        hintText: string;
        label: string;
        currentValue: string;
        transformText: boolean;
      };
    };
  };
  gravityEarnedInThisRequest: boolean;
}
