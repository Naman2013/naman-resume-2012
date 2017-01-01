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

export const checkCatalogVisibility = ({
  at,
  cid,
  token,
  catalog,
  catName,
  designation,
  lookaheadReservation }) => {

  return axios.post('/api/reservation/checkCatalogVisibility', {
    at,
    cid,
    token,
    catalog,
    catName,
    designation,
    lookaheadReservation,
  });
};
