import { API } from 'app/api';

export default function fetchUpcomingEvents() {
  return API.get('/api/events/upcoming?limit=50');
}

export function fetchObservatoryList() {
  return API.post('/api/obs/getAllObservatoryStatus');
}

