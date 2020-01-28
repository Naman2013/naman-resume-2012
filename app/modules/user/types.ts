interface User extends StandardResponse {
  at: string;
  avatarURL: string;
  cid: string;
  customerUUID: string;
  fname: string;
  googleProfileId: string;
  isAuthorized: boolean;
  membershipType: string;
  playerMuted: boolean;
  playerVolume: number;
  subscriptionPlanName: string;
  token: string;
}
