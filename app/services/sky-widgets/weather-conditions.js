import { API } from 'app/api';

export default function fetchWeatherConditionsWidget({
  obsId,
  widgetUniqueId,
}) {
  return API.get('/api/obs/getWXData', { params: { obsId } });
}
