import axios from 'axios';

export default function fetchWeatherMissionControlStatusWidget({ obsId, widgetUniqueId }) {
  return axios.post('/api/widget/missionControlStatus', {
    obsId,
    widgetUniqueId,
  });
}
