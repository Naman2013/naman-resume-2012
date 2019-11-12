interface StandardResponse {
  apiError: boolean;
  errorCode: number;
  errorMsg: string;
  lang: string;
  statusCode: number;
  timestamp: number;
  ver: string;
}

interface ProfileMenu {
  linkUrl: string;
  name: string;
}

interface Mission {
  cancelMissionDialogPrompt: string;
  cancelMissionMenuText: string;
  cancelPiggybackDialogPrompt: string;
  cancelPiggybackMenuText: string;
  categoryDescription: string;
  expires: number;
  missionIconURL: string;
  missionIndex: number;
  missionStart: number;
  missionStartFormatted: {
    displayDate: string;
    displayDateTime: string;
    displayLabel: string;
    displayOtherTimeZones: string;
    displayTime: string;
    displayTimeZone: string;
    displayUSEasternTime: string;
    displayUSPacificTime: string;
    displayWMDUSEasternTime: string;
    displayWMDUSPacificTime: string;
    displayWeekdayMonthDayUTC: string;
    displayWeekdayMonthDayYearUTC: string;
  };
  displayDate: string;
  displayDateTime: string;
  displayLabel: string;
  displayOtherTimeZones: string;
  displayTime: string;
  displayTimeZone: string;
  displayUSEasternTime: string;
  displayUSPacificTime: string;
  displayWMDUSEasternTime: string;
  displayWMDUSPacificTime: string;
  displayWeekdayMonthDayUTC: string;
  displayWeekdayMonthDayYearUTC: string;
  missionStartTZ: string;
  missionTitle: string;
  observatoryUniqueId: string;
  scheduledMissionId: number;
  showCancelMissionMenu: false;
  showCancelPiggybackMenu: true;
  showDotMenu: true;
  startTime: string;
  telescopePierName: string;
  telescopeUniqueId: string;
  userReservationType: string;
}

interface ProfileMissions extends StandardResponse {
  avatarType: string;
  avatarURL: string;
  displayName: string;
  emptySetRecentMissionsDisplay: string;
  emptySetUpcomingMissionsDisplay: string;
  expires: number;
  gravityEarnedInThisRequest: false;
  gravityRankLabel: string;
  memberName: string;
  memberSinceMDY: string;
  memberSinceText: string;
  membershipType: string;
  missionCount: number;
  missionList: Mission[];
  missionListHeading: string;
  profileMenuList: ProfileMenu[];
  profileMenuListCount: number;
  recentMissionCount: number;
  recentMissionList: Mission[];
  recentMissionListHeading: string;
}

interface IGettingStarted {
  heading1: string;
  heading2: string;
  questsList: IQuestItem[];
}

interface IQuestItem {
  // questId: number;
  // questTitle: string;
  briefDescription: string;
  sequenceDescription: string;

  AboutText: string;
  AboutTitle: string;
  BadgeName: string;
  BadgeTitle: string;
  Difficulty: string;
  IconUrl: string;
  LinkLabel: string;
  LinkURL: string;
  QuestId: number;
  QuestTitle: string;
  QuestType: string;
  QuestUUID: string;
  Status: string;
}
