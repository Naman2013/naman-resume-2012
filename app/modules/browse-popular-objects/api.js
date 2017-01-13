import axios from 'axios';

export const fetchCatagoryList = ({
  cid,
  at,
  token,
  callSource, // byTelescope || byPopularObjects
}) => {
  return axios.post('/api/reservation/getPopularCategoryList', {
    cid,
    at,
    token,
    callSource,
  });
};

export const fetchPopularObjectList = ({
  cid,
  at,
  token,
  callSource,
  categorySlug,
  uniqueId,
  scheduledMissionId,
  missionStart,
  obsId,
  domeId,
  telescopeId,
  lookaheadReservation, // optional
  includeDescription, // optional
}) => {
  return axios.post('/api/reservation/getPopularObjectList', {
    cid,
    at,
    token,
    callSource,
    categorySlug,
    uniqueId,
    scheduledMissionId,
    missionStart,
    obsId,
    domeId,
    telescopeId,
    lookaheadReservation,
    includeDescription,
  });
};
