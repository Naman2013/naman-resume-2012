import axios from 'axios';

export function previousShows({
  count,
  page,
}) {
  return axios.get(' /api/events/previous', {
    params: {
      count,
      page,
    },
  });
}
