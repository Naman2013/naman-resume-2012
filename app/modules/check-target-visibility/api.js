import { API } from 'app/api';

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

  return API.post('/api/reservation/checkTargetVisibility', {
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

  return API.post('/api/reservation/checkCatalogVisibility', {
    at,
    cid,
    token,
    catalog,
    catName,
    designation,
    lookaheadReservation,
  });
};
