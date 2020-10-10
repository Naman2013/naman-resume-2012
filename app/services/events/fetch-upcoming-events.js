import { API } from 'app/api';

export default function fetchUpcomingEvents() {
  return API.get('/api/events/upcoming?limit=50');
}

export function fetchObservatoryList(data) {
  return API.post('/api/obs/getAllObservatoryStatus', data);
}

export function fetchMissionQuotaData(data) {
  return API.post('/api/reservation/getMissionLimits', data);
}

