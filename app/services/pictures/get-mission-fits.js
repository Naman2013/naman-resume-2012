import { API } from 'app/api';

export default function getMissionFits({
  cid,
  at,
  token,
  scheduledMissionId,
}) {
  return API.post('/api/images/getMissionFITS', {
    cid,
    at,
    token,
    scheduledMissionId,
  });
}
