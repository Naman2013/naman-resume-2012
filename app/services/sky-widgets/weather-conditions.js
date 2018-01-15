import axios from 'axios';

export default function fetchWeatherConditionsWidget({ obsId, widgetUniqueId }) {
  return axios.post('/api/widget/weatherConditions', {
    obsId,
    widgetUniqueId,
  });
}
