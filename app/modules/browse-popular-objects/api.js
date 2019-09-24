import { CancelToken } from 'axios';
import { API } from 'app/api';

export default function fetchCatagoryList({
  cid,
  at,
  token,
  callSource, // byTelescope || byPopularObjects
}) {
  return API.post('/api/reservation/getPopularCategoryList', {
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
  callSource,
}) {
  return API.post('/api/content/getObjectCategoryTopicList', {
    cid,
    at,
    token,
    status,
    callSource,
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
    promise: API({
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
