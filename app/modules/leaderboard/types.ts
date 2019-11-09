export interface LeaderboardResponse extends StandardResponse {
  PageMenuList: {
    MyLeaderboard: {
      Name: string;
      LinkUrl: string;
    };
    SiteWide: {
      Name: string;
      LinkUrl: string;
    };
  };
  PageHeading1: string;
  PageHeadingAllTime: string;
  PageHeadingThirtyDay: string;
  ThirtyDayLeaderboardData: {
    MyLeaderboard: ILeaderboardItem[];
    SitewideLeaderboard: ILeaderboardItem[];
  };
  AllTimeLeaderboardData: {
    MyLeaderboard: ILeaderboardItem[];
    SitewideLeaderboard: ILeaderboardItem[];
  };
  gravityEarnedInThisRequest: boolean;
}

export interface ILeaderboardItem {
  CustomerUUID: string;
  Ranking: string;
  Gravity: string;
  Tier: string;
  DISPLAYNAME: string;
}
