/**
  cid required
  at required
  token required

  scheduledMissionId required

  */

import axios from 'axios';

export default function cancelPiggyback({
  cid,
  at,
  token,
  scheduledMissionId,
}) {
  return axios.post('/api/reservation/cancelPiggyback', {
    cid,
    at,
    token,
    scheduledMissionId,
  });
}
