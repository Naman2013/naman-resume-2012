export declare interface IGuestDashboardSection {
  Index: number;
  Title: string;
  SubTitle: string;
  ComponentType: string;
  DataField: string;
  HideSection: boolean;
  ChildComponents?: Array<string>;
  APIParams?: any;
}

export declare interface IDashboardTelescopePromo {
  Index: number;
  Title: string;
  Body: string;
  WidgetType: string;
  WidgetIdFieldName: string;
  ObsId: string;
}

export declare interface IDashboardRecomendedQuest {
  title: string;
  iconUrl: string;
  hasLink: boolean;
  questDifficulty: string;
  linkUrl: string;
}

export declare interface IDashboardCommunityObservation {
  customerImageId: number;
  imageIndex: number;
  imageTimestamp: number;
}

export declare interface IDashboardRecomendedClub {
  discussionGroupId: string;
  linkUrl: string;
  title: string;
  access: string;
  accessDescription: string;
  memberCount: number;
  memberCountDisplay: string;
  canView: boolean;
  viewMessage: string;
  showJoinPrompt: boolean;
  joinPrompt: string;
  joinPromptIconUrl: string;
  joinActionIconUrl: string;
  iconUrl: string;
  toggleFollowConfirmationFlag: boolean;
  toggleFollowConfirmationPrompt: string;
  showAskPrompt: boolean;
  askPrompt: string;
  showMessage: boolean;
  message: string;
  isGoogleClassroom: boolean;
  googleClassroomIconURL: string;
}

export declare interface IDashboardMissionPhotosData {
  imageIndex: number;
  imageTimestamp: string;
  imageId: number;
  imageURL: string;
  imageType: string;
  imageTitle: string;
  overlayText: string[];
  missionDate: string;
  missionTime: string;
  displayDate: string;
  displayTime: string;
  scheduledMissionId: number;
  missionImageCount: string;
  missionOwner: string;
  fitsIsAvailable: true;
  galleryId: number;
  objectId: number;
  objectIconURL: string;
  missionIconURL: string;
  obsId: string;
  domeId: number;
  telescopeId: string;
  sysId: string;
  telescopeName: string;
  instrumentName: string;
}

export declare interface IGuestDashboard extends StandardResponse {
  Sections: {
    [Telescopes: string]: IGuestDashboardSection;
    Missions: IGuestDashboardSection;
    MissionsPhotos: IGuestDashboardSection;
    Observations: IGuestDashboardSection;
    Clubs: IGuestDashboardSection;
    Shows: IGuestDashboardSection;
    Quests: IGuestDashboardSection;
    Plans: IGuestDashboardSection;
  };
  TelescopePromos: Array<IDashboardTelescopePromo>;
  RecommendedQuests: Array<IDashboardRecomendedQuest>;
  RecommendedClubs: Array<IDashboardRecomendedClub>;
  CommunityObservations: Array<IDashboardCommunityObservation>;
  FreeTrialButton: { ButtonText: string; LinkUrl: string };
  gravityEarnedInThisRequest: boolean;
  MissionPhotosData: {
    imageList: Array<IDashboardMissionPhotosData>;
  };
  customClass: string;
  enableDashboardOfferPopup: boolean;
  dashboardOfferPopupCallSource: string;
}

export declare interface IFeaturedObjectsMission {
  missionIndex: number;
  missionAvailable: boolean;
  missionStart: number;
  missionStartFormatted: {
    displayLabel: string;
    displayTime: string;
    displayTimeZone: string;
    displayDate: string;
    displayDateTime: string;
    displayWeekdayMonthDayUTC: string;
    displayWeekdayMonthDayYearUTC: string;
    displayFullMonthDayYearUTC: string;
    displayOtherTimeZones: string;
    displayUSEasternTime: string;
    displayWMDUSEasternTime: string;
    displayUSPacificTime: string;
    displayWMDUSPacificTime: string;
  };
  scheduledMissionId: number;
  userHasReservation: boolean;
  userReservationType: string;
  missionType: string;
  objectType: string;
  objectId: number;
  objectIconURL: string;
  title: string;
  obsId: string;
  domeId: number;
  telescopeId: string;
  obsName: string;
  telescopeName: string;
  telescopeLinkURL: string;
  calendarIconURL: string;
  clockIconURL: string;
  observatoryIconURL: string;
  popupHeader: string;
  popupSubheader: string;
  learnButtonCaption: string;
  learnButtonLink: string;
  viewMissionButtonCaption: string;
  tip: string;
  goBackLinkText: string;
  exitLinkText: string;
  showFollowPromptFlag: boolean;
  followPrompt: string;
  followPromptIconUrl: string;
  followActionIconUrl: string;
  toggleFollowConfirmationFlag: boolean;
  toggleFollowConfirmationPrompt: string;
  showSloohUser: boolean;
  showUserDetails: boolean;
  ownerId: string;
  ownerDisplayName: string;
  ownerAvatarURL: string;
  ownerProfileLink: string;
}

export declare interface IDashboardFeaturedObjects extends StandardResponse {
  expires: number;
  callSource: string;
  maxObjectCount: number;
  maxCount: number;
  featuredObjectsCount: number;
  showFeaturedObjects: boolean;
  recommendedObjectsShow: boolean;
  recommendedObjectsHeading: string;
  recommendedObjectsSubHeading: string;
  recommendedObjectsCount: number;
  optionsButtonCaption: string;
  reservedButtonCaption: string;
  missionCount: number;
  missionList: Array<IFeaturedObjectsMission>;
  gravityEarnedInThisRequest: boolean;
}

export declare interface ISubscriptionPlan {
  planID: string;
  planName: string;
  planAudienceType: string;
  planAudienceTab: string;
  planDescription: string;
  planCostPrefix: string;
  planCost: string;
  planCostPostfix: string;
  PlanConditionId: string;
  aboutThisPlan: string;
  teaserContent: string;
  welcomeToThisPlan: string;
  isPlanActionEnabled: boolean;
  selectButtonText: string;
  imageUrl: string;
  isAstronomyClub: boolean;
  triggerUpgradeFlow: boolean;
  triggerUpsellFlow: boolean;
  planSelectedBackgroundImageUrl_Desktop: string;
  planSelectedBackgroundImageUrl_Tablet: string;
  planSelectedBackgroundImageUrl_Mobile: string;
  hasTrialPeriod: boolean;
  '2018AccountType': string;
}

export declare interface ISubscriptionPlans extends StandardResponse {
  subscriptionPlansCount: number;
  subscriptionPlans: Array<ISubscriptionPlan>;
}
