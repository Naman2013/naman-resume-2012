import axios from 'axios';

export default function fetchWeatherConditionsWidget({
  obsId,
  widgetUniqueId,
}) {
  return axios.get('/api/obs/getWXData', { params: { obsId } });
}
