import axios from 'axios';

export function upcomingShows({
  count,
  page,
}) {
  return axios.get(' /api/events/upcoming', {
    params: {
      count,
      page,
    },
  });
}
