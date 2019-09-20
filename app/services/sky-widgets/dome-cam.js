import { API } from 'app/api';

export default function fetchDomeCam({ obsId, DomecamWidgetId }) {
  return API.post('/api/widget/domeCamera', {
    obsId,
    widgetUniqueId: DomecamWidgetId,
  });
}
