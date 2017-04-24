import moment from 'moment';
import fetchUpcomingEvents from '../../services/events/fetch-upcoming-events';
import { fetchShowContent } from '../community-content/get-show-content-actions';
import { fetchLiveShowInfo } from '../live-shows/live-shows-actions';
import { fetchSituationRoom } from '../SituationRoom';

export const FETCH_EVENTS_START = 'FETCH_EVENTS_START';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAIL = 'FETCH_EVENTS_FAIL';

export const SET_NEXT_EVENT = 'SET_NEXT_EVENT';
export const EVENT_GO_LIVE = 'EVENT_GO_LIVE';
export const END_EVENT = 'END_EVENT';

export const SET_CALCULATED_EVENT_VALUES = 'SET_CALCULATED_EVENT_VALUES';

export const SET_TIMER_VALUES = 'SET_TIMER_VALUES';

export const fetchEventsStart = () => ({
  type: FETCH_EVENTS_START,
});

export const fetchEventsSuccess = payload => ({
  type: FETCH_EVENTS_SUCCESS,
  payload,
});

export const fetchEventsFail = payload => ({
  type: FETCH_EVENTS_FAIL,
  payload,
});

export const setNextEventValues = event => ({
  type: SET_NEXT_EVENT,
  payload: event,
});

export const setNextEvent = event => (dispatch, getState) => {
  const serverTime = getState().upcomingEvents.upcomingEvents.timestamp;
  dispatch(calculateEventTimes(Object.assign({ serverTime }, event)));
  dispatch(setNextEventValues(event));
};

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
  dispatch(fetchShowContent({
    showId: updatedEventList[0].eventId,
    listType: 'sluglookupids',
  }));
  dispatch(fetchSituationRoom(updatedEventList[0].eventId));
  dispatch(fetchEventsSuccess(updatedEvents));
};

export const fetchEvents = () => (dispatch) => {
  dispatch(fetchEventsStart());

  return fetchUpcomingEvents()
  .then((result) => {
    if (!result.data.apiError) {
      dispatch(setNextEvent(result.data.eventList[0]));
      dispatch(fetchEventsSuccess(result.data));
    }
  })
  .catch(error => dispatch(fetchEventsFail(error)));
};

export const calculateEventTimes = ({
  eventStart,
  eventEnd,
  eventId,
  eventIsLive,
  serverTime,
}) => {
  const currentTimeMoment = moment.unix(serverTime);
  const eventStartMoment = moment.unix(eventStart);
  const eventEndMoment = moment.unix(eventEnd);

  const eventStartMomentDiff = eventStartMoment.diff(currentTimeMoment);
  const eventEndMomentDiff = eventEndMoment.diff(currentTimeMoment);
  const eventLink = ((eventStartMomentDiff <= 0 && !eventEndMomentDiff) <= 0 || eventIsLive) ? '/shows/situation-room' : `/shows/event-details/${eventId}`;

  return {
    type: SET_CALCULATED_EVENT_VALUES,
    payload: {
      currentTimeMoment,
      eventStartMoment,
      eventEndMoment,
      eventStartMomentDiff,
      eventEndMomentDiff,
      eventLink,
    },
  };
};

export const setEventTimerValues = (eventTimerValues) => {
  return {
    type: SET_TIMER_VALUES,
    payload: eventTimerValues,
  };
};

export const tickEvent = ({
  currentTime,
  eventStartMoment,
  eventEndMoment,
  eventIsLive,
}) => (dispatch) => {
  const convertedEventStartTime = moment.unix(currentTime);
  const startTimeDifference = eventStartMoment.diff(convertedEventStartTime);
  const endTimeDifference = eventEndMoment.diff(convertedEventStartTime);
  let eventTimerValues = {};
  if (startTimeDifference >= 0) {
    const duration = moment.duration(startTimeDifference, 'milliseconds');
    eventTimerValues = {
      currentTime: currentTime + 1,
      daysTo: duration.days(),
      hoursTo: duration.hours(),
      minutesTo: duration.minutes(),
      secondsTo: duration.seconds(),
      millisecondsTo: duration.milliseconds(),
    };
  } else {
    eventTimerValues = {
      currentTime: currentTime + 1,
      daysTo: 0,
      hoursTo: 0,
      minutesTo: 0,
      secondsTo: 0,
      millisecondsTo: 0,
    };
  }

  // the event is not live
  // the event start time has past the current time
  // the event end time has not past the current time
  if (!eventIsLive && startTimeDifference <= 0 && endTimeDifference >= 0) {
    dispatch(eventGoLive());
  }

  // the event is live
  // the end time has not past the current time by 1 second
  // delaying the ending by 1 second...
  if (endTimeDifference < -1000) {
    dispatch(endEvent());
  }
  dispatch(setEventTimerValues(eventTimerValues));
};
