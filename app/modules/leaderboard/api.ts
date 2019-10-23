import { API } from 'app/api';

export const getLeaderboardApi = (data: any) =>
  API.post('api/page/leaderboard', data);
