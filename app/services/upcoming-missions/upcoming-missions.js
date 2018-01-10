import axios from 'axios';

export default function fetchUpcomingMissions({ obsId, domeId }) {
  return axios.post('/api/reservation/getUpcomingMissions', {
    obsId,
    domeId,
  });
}
