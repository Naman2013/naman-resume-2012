import axios from 'axios';

export default function fetchUpcomingEvents() {
  return axios.get('/api/events/upcoming?limit=50');
}
