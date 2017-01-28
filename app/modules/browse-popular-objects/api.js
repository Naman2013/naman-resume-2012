import axios, { CancelToken } from 'axios';

export default function fetchCatagoryList({
  cid,
  at,
  token,
  callSource, // byTelescope || byPopularObjects
}) {
  return axios.post('/api/reservation/getPopularCategoryList', {
    cid,
    at,
    token,
    callSource,
  });
}
export function fetchCategoryTopicList({
  cid,
  at,
  token,
  status, // optional: published, draft all
}) {
  return axios.post('/api/content/getObjectCategoryTopicList', {
    cid,
    at,
    token,
    status,
  });
}

export function fetchPopularObjectList({
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
}) {
  const fetchPopularObjectsSource = CancelToken.source();

  return {
    cancelToken: fetchPopularObjectsSource,
    promise: axios({
      url: '/api/reservation/getPopularObjectList',
      method: 'post',
      data: {
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
      },
      cancelToken: fetchPopularObjectsSource.token,
    }).catch(() => {}),
  };
}
