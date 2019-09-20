import { API } from 'app/api';

export function upcomingShows({
  count,
  page,
}) {
  return API.get(' /api/events/upcoming', {
    params: {
      count,
      page,
    },
  });
}
