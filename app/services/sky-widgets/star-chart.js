import axios from 'axios';

export default function fetchStarChart({ obsId, widgetUniqueId, scheduledMissionId }) {
  return axios.post('/api/widget/starChart', {
    obsId,
    widgetUniqueId,
    scheduledMissionId,
  });
}
