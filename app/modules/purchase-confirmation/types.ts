export interface IPurchaseConfirmationResponse {
  ver: string;
  lang: string;
  apiError: boolean;
  errorCode: number;
  errorMsg: string;
  statusCode: number;
  pageHeading1: string;
  pageHeading2: string;
  gettingStartedBtn: {
    linkLabel: string;
    linkUrl: string;
  };
  explainationText: string;
  accountTypeSection: {
    accountTypeHeading: string;
    currentSubscriptionPlan: {
      planId: string;
      nextRenewalDate: string;
      planName: string;
      planTeaserContent: string;
      startDateText: string;
      priceDisplayLabel: string;
      showRenewalDate: boolean;
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
  purchaseThankYouText: string;
  firstExplanationText: string;
  secondExplanationText: string;
  welcomeVideoStreamURL: string;
}
