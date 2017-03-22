import { fetchLiveShowInfo } from './live-shows/live-shows-actions';
import { fetchShowContent } from './community-content/get-show-content-actions';
import fetchUpcomingEvents from '../services/events/fetch-upcoming-events';
import {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFail,
  setNextEvent,
} from './upcoming-events/upcoming-events-actions';

export const fetchSituationRoom = eventId => (dispatch) => {
  dispatch(fetchLiveShowInfo(eventId));
  dispatch(fetchShowContent({
    showId: eventId,
    listType: 'sluglookupids',
  }));
};

export const fetchEventsAndSituationRoom = () => (dispatch) => {
  dispatch(fetchEventsStart());

  return fetchUpcomingEvents()
  .then((result) => {
    if (!result.data.apiError) {
      dispatch(setNextEvent(result.data.eventList[0]));
      dispatch(fetchSituationRoom(result.data.eventList[0].eventId));
      dispatch(fetchEventsSuccess(result.data));
    }
  })
  .catch(error => dispatch(fetchEventsFail(error)));
};
