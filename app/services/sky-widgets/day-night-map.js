import { API } from 'app/api';

export default function fetchDayNightMap({ obsId, DayNightMapWidgetId }) {
  return API.post('/api/widget/dayNightMap', {
    obsId,
    widgetUniqueId: DayNightMapWidgetId,
  });
}
