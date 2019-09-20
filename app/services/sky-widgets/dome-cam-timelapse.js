import { API } from 'app/api';

export default function fetchDomeCamTimelapse({ obsId, DomecamTimelapseWidgetId }) {
  return API.post('/api/widget/domecamTimelapse', {
    obsId,
    widgetUniqueId: DomecamTimelapseWidgetId,
  });
}
