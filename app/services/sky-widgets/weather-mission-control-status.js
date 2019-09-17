import { API } from 'app/api';

export default function fetchWeatherMissionControlStatusWidget({ obsId, widgetUniqueId }) {
  return API.post('/api/widget/missionControlStatus', {
    obsId,
    widgetUniqueId,
  });
}
