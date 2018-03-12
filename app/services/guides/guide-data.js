import axios from 'axios';

export default function fetchGuideDataService({ token, at, cid, guideId }) {
  return axios.post('/api/page/guide', {
    token,
    at,
    cid,
    guideId,
  });
}
