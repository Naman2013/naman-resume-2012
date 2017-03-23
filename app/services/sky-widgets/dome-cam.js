import axios from 'axios';

export default function fetchDomeCam({ obsId, DomecamWidgetId }) {
  return axios.post('/api/widget/domeCamera', {
    obsId,
    widgetUniqueId: DomecamWidgetId,
  });
}
