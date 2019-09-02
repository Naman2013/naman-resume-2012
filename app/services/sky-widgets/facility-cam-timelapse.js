import axios from 'axios';

export default function fetchFacilityCamTimelapse({ obsId, FacilityWebcamTimelapseWidgetId }) {
  return axios.post('/api/widget/facilityWebcamTimelapse', {
    obsId,
    widgetUniqueId: FacilityWebcamTimelapseWidgetId,
  });
}
