import { API } from 'app/api';

export default function fetchStartPartyList(data) {
  return API.get('/api/events/upcoming', data);
}