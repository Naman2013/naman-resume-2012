import { API } from 'app/api';

export default function fetchWeatherSatelliteWidget({ obsId, widgetUniqueId }) {
  return API.post('/api/wx/satellite', {
    obsId,
    widgetUniqueId,
  });
}
