import axios from 'axios';

export default function fetchDayNightBar({ obsId, DayNightBarWidgetId }) {
  return axios.post('/api/widget/dayNightBar', {
    obsId,
    widgetUniqueId: DayNightBarWidgetId,
  });
}
