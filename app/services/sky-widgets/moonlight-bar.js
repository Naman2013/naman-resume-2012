import axios from 'axios';

export default function fetchMoonlightBar({ obsId, widgetUniqueId }) {
  return axios.post('/api/widget/moonlightBar', {
    obsId,
    widgetUniqueId,
  });
}
