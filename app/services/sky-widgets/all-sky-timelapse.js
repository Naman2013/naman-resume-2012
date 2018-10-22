import axios from 'axios';

export default function fetchAllSkyTimelapse({ obsId, AllskyTimelapseWidgetId }) {
  return axios.post('/api/widget/allskyTimelapse', {
    obsId,
    widgetUniqueId: AllskyTimelapseWidgetId,
  });
}
