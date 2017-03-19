import axios from 'axios';

export default function fetchFacilityWebcam({ obsId, widgetUniqueId }) {
  return axios.post('/api/widget/facilityWebcam', {
    obsId,
    widgetUniqueId,
  });
}
