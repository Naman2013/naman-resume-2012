import fetchUpcomingEvents from '../../services/events/fetch-upcoming-events';
import { fetchLiveShowInfo } from '../live-shows/live-shows-actions';
import { fetchSituationRoom } from '../SituationRoom';

export const FETCH_EVENTS_START = 'FETCH_EVENTS_START';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAIL = 'FETCH_EVENTS_FAIL';

export const SET_NEXT_EVENT = 'SET_NEXT_EVENT';
export const EVENT_GO_LIVE = 'EVENT_GO_LIVE';
export const END_EVENT = 'END_EVENT';

const fetchEventsStart = () => ({
  type: FETCH_EVENTS_START,
});

const fetchEventsSuccess = payload => ({
  type: FETCH_EVENTS_SUCCESS,
  payload,
});

const fetchEventsFail = payload => ({
  type: FETCH_EVENTS_FAIL,
  payload,
});

const setNextEvent = event => ({
  type: SET_NEXT_EVENT,
  payload: event,
});

export const eventGoLive = () => (dispatch, getState) => {
  const { nextEvent } = getState().upcomingEvents;
  dispatch(setNextEvent({
    ...nextEvent,
    eventIsLive: true,
  }));
};

/**
  looks at the event list and rebuilds the upcoming events list by removing
  the first event from the set.

  then, we make sure that the next upcoming event is set correctly
  */
export const endEvent = () => (dispatch, getState) => {
  const { upcomingEvents } = getState().upcomingEvents;
  const { eventList } = upcomingEvents;

  const updatedEventList = eventList.splice(1, eventList.length);
  const updatedEvents = {
    ...upcomingEvents,
    eventList: updatedEventList,
  };

  dispatch(setNextEvent(updatedEventList[0]));
  dispatch(fetchEventsSuccess(updatedEvents));
};

export const fetchEvents = () => (dispatch) => {
  dispatch(fetchEventsStart());

  return fetchUpcomingEvents()
  .then((result) => {
    if (!result.data.apiError) {
      dispatch(fetchLiveShowInfo(result.data.eventList[0].eventId));
      dispatch(fetchSituationRoom(result.data.eventList[0].eventId));
      dispatch(setNextEvent(result.data.eventList[0]));
      dispatch(fetchEventsSuccess(result.data));
    }
  })
  .catch(error => dispatch(fetchEventsFail(error)));
};
