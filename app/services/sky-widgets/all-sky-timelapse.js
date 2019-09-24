import { API } from 'app/api';

export default function fetchAllSkyTimelapse({ obsId, AllskyTimelapseWidgetId }) {
  return API.post('/api/widget/allskyTimelapse', {
    obsId,
    widgetUniqueId: AllskyTimelapseWidgetId,
  });
}
