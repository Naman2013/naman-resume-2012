import { API } from 'app/api';

export default function fetchDayNightBarPanel({ obsId, DayNightBarPanelWidgetId }) {
  return API.post('/api/widget/dayNightBarPanel', {
    obsId,
    widgetUniqueId: DayNightBarPanelWidgetId,
  });
}
