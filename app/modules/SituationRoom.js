import { fetchLiveShowInfo } from './live-shows/live-shows-actions';
import { fetchShowContent } from './community-content/get-show-content-actions';

export const fetchSitiationRoom = eventId => (dispatch, getState) => {
  dispatch(fetchLiveShowInfo(eventId));
  dispatch(fetchShowContent({
    showId: eventId,
    listType: 'sluglookupids',
  }));
};
