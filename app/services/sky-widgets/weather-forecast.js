import axios from 'axios';

export default function fetchWeatherForecastWidget({ obsId, widgetUniqueId }) {
  return axios.post('/api/widget/miniWeatherPanel', {
    obsId,
    widgetUniqueId,
  });
}
