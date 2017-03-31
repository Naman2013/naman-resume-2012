/**
  cid required
  at required
  token (required - user must be logged in with astronomer level only, since By Telescope is for
  astronomers only - if not, the statusCode will have a 401 error)

  scheduledMissionId required

  obsId required

  domeId required

  reservationDate    required   (yyyy-mm-dd) (same as provided in the request to
  /api/reservation/getMissionSlotsByTelescope,  as returned by
  /api/reservation/getMissionSlotDates )

  ver optional API version

  lang optional API language
  */

import axios from 'axios';

export default function fetchMissionSlot({
  cid,
  at,
  token,
  scheduledMissionId,
  obsId,
  domeId,
  reservationDate,
}) {
  return axios.post('/api/reservation/getMissionSlot', {
    cid,
    at,
    token,
    scheduledMissionId,
    obsId,
    domeId,
    reservationDate,
  });
}
