import axios from 'axios';

/**
  see https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/
  for /api/reservation/grabPiggyback documentation
*/
export function grabPiggyback(mission) {
  return axios.post('/api/reservation/grabPiggyback', mission);
}
