/**
  cid required
  at required
  token required

  scheduledMissionId required

  */

import { API } from 'app/api';

export default function cancelPiggyback({
  cid,
  at,
  token,
  scheduledMissionId,
}) {
  return API.post('/api/reservation/cancelPiggyback', {
    cid,
    at,
    token,
    scheduledMissionId,
  });
}
