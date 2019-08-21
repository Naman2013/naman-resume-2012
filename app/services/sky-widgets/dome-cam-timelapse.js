import axios from 'axios';

export default function fetchDomeCamTimelapse({ obsId, DomecamTimelapseWidgetId }) {
  return axios.post('/api/widget/domecamTimelapse', {
    obsId,
    widgetUniqueId: DomecamTimelapseWidgetId,
  });
}
