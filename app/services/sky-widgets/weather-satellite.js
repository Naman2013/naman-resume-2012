import axios from 'axios';

export default function fetchWeatherSatelliteWidget({ obsId, widgetUniqueId }) {
  return axios.post('/api/wx/satellite', {
    obsId,
    widgetUniqueId,
  });
}
