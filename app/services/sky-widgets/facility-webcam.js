import { API } from 'app/api';

export default function fetchFacilityWebcam({ obsId, widgetUniqueId }) {
  return API.post('/api/widget/facilityWebcam', {
    obsId,
    widgetUniqueId,
  });
}
