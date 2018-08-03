import axios from 'axios';

export const GUIDE_ENDPOINT_URL = '/api/page/guide';

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
