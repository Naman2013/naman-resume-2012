import { API } from 'app/api';

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
  return API.post('/api/reservation/updateMissionSlot', {
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
