import axios from 'axios';

export const GUIDE_ENDPOINT_URL = '/api/page/guide';
export const GUIDE_PANEL_ENDPOINT_URL = '/api/guides/getGuidePanels';
export const GUIDE_OBJECTS_ENDPOINT_URL = '/api/guides/getGuideObjects';

export default function fetchGuideDataService({
  token,
  at,
  cid,
  guideId,
}) {
  return axios.post('/api/page/guide', {
    token,
    at,
    cid,
    guideId,
  });
}
