import createReducer from '../utils/createReducer';
import {
  FETCH_EVENTS_START,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
  SET_NEXT_EVENT,
} from './upcoming-events-actions';


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
  },
  upcomingEvents: {
    apiError: false,
    timestamp: null,
    statusCode: 200,
    eventListType: null,
    eventList: [],
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
});
