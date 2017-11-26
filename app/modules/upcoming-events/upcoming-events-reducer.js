import moment from 'moment';
import createReducer from '../utils/createReducer';

import {
  FETCH_EVENTS_START,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
  SET_NEXT_EVENT,
  SET_TIMER_VALUES,
  SET_CALCULATED_EVENT_VALUES,
} from './upcoming-events-actions';

const currentTimePlaceholder = moment();
const initialState = {
  fetchingEvents: false,
  eventsFetched: false,
  errorOccurred: false,
  errorBody: null,
  nextEvent: {
    eventDescription: '',
    eventDetailsURL: '',
    eventEnd: 0,
    eventIconURL: '',
    eventId: 0,
    eventImageURL: '',
    eventIsLive: false,
    isBeforeEvent: false,
    isAfterEvent: false,
  },
  upcomingEvents: {
    apiError: false,
    timestamp: null,
    statusCode: 200,
    eventListType: null,
    eventList: [],
    nextEvent: {
      eventStart: 0,
      eventEnd: 0,
      eventId: 0,
      eventIsLive: false,
    },
  },
  calculatedEventValues: {
    currentTimeMoment: currentTimePlaceholder,
    eventStartMomentDiff: 0,
    eventEndMomentDiff: 0,
    eventEndMoment: moment.unix(currentTimePlaceholder),
    eventStartMoment: moment.unix(currentTimePlaceholder),
    eventLink: '/shows/situation-room',
  },
  eventTimer: {
    currentTime: 0,
    daysTo: 0,
    hoursTo: 0,
    minutesTo: 0,
    secondsTo: 0,
  },
};

export default createReducer(initialState, {
  [SET_NEXT_EVENT](state, { payload }) {
    return {
      ...state,
      nextEvent: payload,
    };
  },
  [FETCH_EVENTS_START](state) {
    return {
      ...state,
      ...initialState,
      fetchingEvents: true,
    };
  },
  [FETCH_EVENTS_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingEvents: false,
      eventsFetched: true,
      upcomingEvents: payload,
    };
  },
  [FETCH_EVENTS_FAIL](state, { payload }) {
    return {
      ...state,
      fetchingEvents: false,
      errorOccurred: true,
      errorBody: payload,
    };
  },
  [SET_CALCULATED_EVENT_VALUES](state, { payload }) {
    return {
      ...state,
      calculatedEventValues: {
        ...payload,
      },
    };
  },
  [SET_TIMER_VALUES](state, { payload }) {
    return {
      ...state,
      eventTimer: {
        ...payload,
      },
    };
  },
});
