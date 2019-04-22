import axios from 'axios';

export default function fetchDayNightBarPanel({ obsId, DayNightBarWidgetId }) {
  return axios.post('/api/widget/dayNightBar', {
    obsId,
    widgetUniqueId: DayNightBarWidgetId,
  });
}
