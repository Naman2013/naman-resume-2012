import { API } from 'app/api';

export default function fetchWeatherForecastWidget({ obsId, widgetUniqueId }) {
  return API.post('/api/widget/miniWeatherPanel', {
    obsId,
    widgetUniqueId,
  });
}
