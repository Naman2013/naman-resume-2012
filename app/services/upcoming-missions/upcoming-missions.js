import { API } from 'app/api';

export const GET_UPCOMING_MISSIONS_URL = '/api/reservation/getUpcomingMissions';

export default function fetchUpcomingMissions({ obsId, domeId }) {
  return API.post(GET_UPCOMING_MISSIONS_URL, {
    obsId,
    domeId,
  });
}
