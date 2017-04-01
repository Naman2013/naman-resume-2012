import axios from 'axios';

export default function getMissionFits({
  cid,
  at,
  token,
  scheduledMissionId,
}) {
  return axios.post('/api/images/getMissionFITS', {
    cid,
    at,
    token,
    scheduledMissionId,
  });
}
