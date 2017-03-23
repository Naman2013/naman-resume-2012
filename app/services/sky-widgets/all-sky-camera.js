import axios from 'axios';

export default function fetchAllSkyCamera({ obsId, AllskyWidgetId }) {
  return axios.post('/api/widget/allSkyCamera', {
    obsId,
    widgetUniqueId: AllskyWidgetId,
  });
}
