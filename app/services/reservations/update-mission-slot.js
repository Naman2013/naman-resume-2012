import axios from 'axios';

export default function updateMissionSlot({
  token,
  at,
  cid,
  scheduledMissionId,
  callSource,
  missionType,
  missionStart,
  objectId,
  objectType,
  objectTitle,
  objectRA,
  objectDec,
  catalog,
  catName,
  designation,
  processingRecipe,
  obsId,
  domeId,
  telescopeId,
  obsName,
  telescopeName,
  objectIconURL,
  uniqueId,
  targetName,
  objective,
}) {
  return axios.post('/api/reservation/updateMissionSlot', {
    token,
    at,
    cid,
    scheduledMissionId,
    callSource,
    missionType,
    missionStart,
    objectId,
    objectType,
    objectTitle,
    objectRA,
    objectDec,
    catalog,
    catName,
    designation,
    processingRecipe,
    obsId,
    domeId,
    telescopeId,
    obsName,
    telescopeName,
    objectIconURL,
    uniqueId,
    targetName,
    objective,
  });
}
