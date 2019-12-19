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
  ShowDomeCam: boolean;
  ShowAllSkyCam: boolean;
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

export declare interface IGuestDashboard extends StandardResponse {
  Sections: {
    Telescopes?: IGuestDashboardSection;
    Missions?: IGuestDashboardSection;
    MissionsPhotos?: IGuestDashboardSection;
    Observations?: IGuestDashboardSection;
    Clubs?: IGuestDashboardSection;
    Shows?: IGuestDashboardSection;
    Quests?: IGuestDashboardSection;
    Plans?: IGuestDashboardSection;
  };
  TelescopePromos: Array<IDashboardTelescopePromo>;
  RecommendedQuests: Array<IDashboardRecomendedQuest>;
  RecommendedClubs: Array<IDashboardRecomendedClub>;
  CommunityObservations: Array<IDashboardCommunityObservation>;
  FreeTrialButton: { ButtonText: string; LinkUrl: string };
  gravityEarnedInThisRequest: boolean;
}
