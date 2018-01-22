/**
  cid required
  at required
  token required

  scheduledMissionId required

  */

import axios from 'axios';

export default function cancelMission({
  cid,
  at,
  token,
  scheduledMissionId,
}) {
  return axios.post('/api/reservation/cancelReservation', {
    cid,
    at,
    token,
    scheduledMissionId,
  });
}
