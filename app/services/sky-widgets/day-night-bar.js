import { API } from 'app/api';

export default function fetchDayNightBarPanel({ obsId, DayNightBarWidgetId }) {
  return API.post('/api/widget/dayNightBar', {
    obsId,
    widgetUniqueId: DayNightBarWidgetId,
  });
}
