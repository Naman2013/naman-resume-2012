import { API } from 'app/api';

export default function fetchStarChart({ obsId, widgetUniqueId, scheduledMissionId }) {
  return API.post('/api/widget/starChart', {
    obsId,
    widgetUniqueId,
    scheduledMissionId,
  });
}
