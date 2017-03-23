import axios from 'axios';

export default function fetchDayNightMap({ obsId, DayNightMapWidgetId }) {
  return axios.post('/api/widget/dayNightMap', {
    obsId,
    widgetUniqueId: DayNightMapWidgetId,
  });
}
