/**
  cid required
  at required
  token required

  scheduledMissionId required

  */

import { API } from 'app/api';

export default function cancelMission({
  cid,
  at,
  token,
  scheduledMissionId,
}) {
  return API.post('/api/reservation/cancelReservation', {
    cid,
    at,
    token,
    scheduledMissionId,
  });
}
