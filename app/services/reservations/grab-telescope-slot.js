/**
  cid

  at

  token      (user must be logged in with an active account capable of telescope usage - if not,
  the statusCode will have a 401 error)

  scheduledMissionId  (required)

  grabType     (required)  notarget or placeholder - must be notarget if finalizeReservation is true

  finalizeReservation (optional) true/false - set to true to revert a placeholder mission slot
    to a ‘notarget’ slot, when the user clicks the Finalize Reservation button
    on a slot that is currently set to ‘placeholder’ type (default is ‘false’) (if slot
  Is currently ‘notarget’ when this is called, missionAvailable will be returned as
  false)

  uniqueId  (required) mission slot unique ID of the By Telescope slot that initiated call
      (also returned in the response)
      match with the By Telescope slot uniqueId that issued the request
*/

import axios from 'axios';

export default function grabTelescopeSlot({
  cid,
  at,
  token,
  scheduledMissionId,
  grabType,
  finalizeReservation,
  uniqueId,
}) {
  return axios.post('/api/reservation/grabTelescopeSlot', {
    cid,
    at,
    token,
    scheduledMissionId,
    grabType,
    finalizeReservation,
    uniqueId,
  });
}
