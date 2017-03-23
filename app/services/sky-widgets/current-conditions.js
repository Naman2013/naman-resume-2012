import axios from 'axios';

export default function fetchCurrentConditions({ obsId, widgetUniqueId }) {
  return axios.post('/api/widget/currentConditions', {
    obsId,
    widgetUniqueId,
  });
}
