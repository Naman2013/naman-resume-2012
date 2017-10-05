import axios from 'axios';

export default function ({ obsId, widgetUniqueId }) {
  return axios.post('/api/widget/moonlightBar', {
    obsId,
    widgetUniqueId,
  });
}
