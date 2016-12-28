import axios from 'axios';

export const checkTargetVisibility = ({
  at,
  cid,
  token,
  missionType,
  missionStart,
  obsId,
  domeId,
  catalog,
  catName,
  designation,
  ra,
  dec }) => {

  return axios.post('/api/reservation/checkTargetVisibility', {
    at,
    cid,
    token,
    missionType,
    missionStart,
    obsId,
    domeId,
    catalog,
    catName,
    designation,
    ra,
    dec,
  });
};
