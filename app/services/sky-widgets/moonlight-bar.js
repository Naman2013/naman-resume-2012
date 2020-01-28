import { API } from 'app/api';

export default function fetchMoonlightBar({ obsId, widgetUniqueId }) {
  return API.post('/api/widget/moonlightBar', {
    obsId,
    widgetUniqueId,
  });
}
