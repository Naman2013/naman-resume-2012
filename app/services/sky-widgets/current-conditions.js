import { API } from 'app/api';

export default function fetchCurrentConditions({ obsId, widgetUniqueId }) {
  return API.post('/api/widget/currentConditions', {
    obsId,
    widgetUniqueId,
  });
}
