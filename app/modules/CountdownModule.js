import axios from 'axios';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';

const COUNTDOWN_UPCOMING_EVENTS_REQUEST = 'COUNTDOWN_UPCOMING_EVENTS_REQUEST';
const COUNTDOWN_UPCOMING_EVENTS_RESPONSE_SUCCESS = 'COUNTDOWN_UPCOMING_EVENTS_RESPONSE_SUCCESS';
const COUNTDOWN_UPCOMING_EVENTS_RESPONSE_SUCCESS_FAILURE = 'COUNTDOWN_UPCOMING_EVENTS_RESPONSE_SUCCESS_FAILURE';

export const upcomingEventsRequest = createAction(COUNTDOWN_UPCOMING_EVENTS_REQUEST);
export const upcomingEventsResponseSuccess = createAction(COUNTDOWN_UPCOMING_EVENTS_RESPONSE_SUCCESS, 'activeOrUpcomingEvent');
export const upcomingEventsResponseFailure = createAction(COUNTDOWN_UPCOMING_EVENTS_RESPONSE_SUCCESS_FAILURE, 'responseError');

export function fetchActiveOrUpcomingEvent() {
  return async (dispatch) => {
    dispatch(upcomingEventsRequest());

    try {
      const { status, data, data: { eventList } } = await axios.get('/api/events/upcoming?limit=50');

      if (status >= 400) {
        throw new Error(data);
      }

      // using the first event in the list as the next or upcoming event source
      dispatch(upcomingEventsResponseSuccess(eventList[0]));
    } catch (err) {
      dispatch(upcomingEventsResponseFailure(err));
    }
  };
}

const initialState = {
  isFetching: false,
  updateEventsInterval: 1000 * 60 * 5,
  updateDurationInterval: 1000,
  activeOrUpcomingEvent: {
    eventId: null,
  },
  responseError: null,
};

export default createReducer(initialState, {
  [COUNTDOWN_UPCOMING_EVENTS_REQUEST](state) {
    return {
      ...state,
      isFetching: true,
      activeOrUpcomingEvent: {
        eventId: null,
      },
      responseError: null,
    };
  },
  [COUNTDOWN_UPCOMING_EVENTS_RESPONSE_SUCCESS](state, { activeOrUpcomingEvent }) {
    return {
      ...state,
      isFetching: false,
      activeOrUpcomingEvent,
    };
  },
  [COUNTDOWN_UPCOMING_EVENTS_RESPONSE_SUCCESS_FAILURE](state, { responseError }) {
    return {
      ...state,
      isFetching: false,
      responseError,
    };
  },
});
