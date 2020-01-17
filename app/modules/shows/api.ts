import { API } from 'app/api';

export const getUpcomingShowsApi = (url: string) =>
  API.get(`/api/events/upcoming?${url}`);

export const getHighlightedShowsApi = (url: string) =>
  API.get(`/api/events/highlighted?${url}`);
