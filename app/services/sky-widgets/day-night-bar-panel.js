import axios from 'axios';

export default function fetchDayNightBarPanel({ obsId, DayNightBarPanelWidgetId }) {
  return axios.post('/api/widget/dayNightBarPanel', {
    obsId,
    widgetUniqueId: DayNightBarPanelWidgetId,
  });
}
