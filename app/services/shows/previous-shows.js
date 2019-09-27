import { API } from 'app/api';

export function previousShows({
  count,
  page,
}) {
  return API.get(' /api/events/previous', {
    params: {
      count,
      page,
    },
  });
}
