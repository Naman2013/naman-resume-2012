import axios from 'axios';

export const GET_UPCOMING_MISSIONS_URL = '/api/reservation/getUpcomingMissions';

export default function fetchUpcomingMissions({ obsId, domeId }) {
  return axios.post(GET_UPCOMING_MISSIONS_URL, {
    obsId,
    domeId,
  });
}
