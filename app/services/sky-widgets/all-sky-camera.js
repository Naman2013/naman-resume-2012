import { API } from 'app/api';

export default function fetchAllSkyCamera({ obsId, AllskyWidgetId }) {
  return API.post('/api/widget/allSkyCamera', {
    obsId,
    widgetUniqueId: AllskyWidgetId,
  });
}
