import { API } from 'app/api';

export default function fetchFacilityCamTimelapse({ obsId, FacilityWebcamTimelapseWidgetId }) {
  return API.post('/api/widget/facilityWebcamTimelapse', {
    obsId,
    widgetUniqueId: FacilityWebcamTimelapseWidgetId,
  });
}
