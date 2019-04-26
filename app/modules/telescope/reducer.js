import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { set, apply } from 'qim';

export const TYPE = constants('telescope', [
  '~GET_ALL_SKY_TIMELAPSE',
  '~GET_UPCOMING_SLOTS_BY_TELESCOPE',
  '~GET_FEATURED_OBJECTS_BY_TELESCOPE',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  serverError: null,

  allSkyTimelapse: {
    isFetching: false,
    serverError: null,
  },

  queueTab: {
    isFetching: false,
    serverError: null,
    upcomingSlotsData: {
      missionList: [],
      reservationDateFormatted: '',
    },
    featuredObjectsData: {},
  },
};

export default handleActions(
  {
    [TYPE.GET_ALL_SKY_TIMELAPSE]: getAllSkyTimelapse,
    [TYPE.GET_ALL_SKY_TIMELAPSE_SUCCESS]: getAllSkyTimelapseSuccess,
    [TYPE.GET_ALL_SKY_TIMELAPSE_ERROR]: getAllSkyTimelapseError,
    [TYPE.GET_UPCOMING_SLOTS_BY_TELESCOPE]: setQueueTabFetching,
    [TYPE.GET_UPCOMING_SLOTS_BY_TELESCOPE_SUCCESS]: getUpcomingSlotsByTelescopeSuccess,
    [TYPE.GET_UPCOMING_SLOTS_BY_TELESCOPE_ERROR]: setQueueTabServerError,
    [TYPE.GET_FEATURED_OBJECTS_BY_TELESCOPE]: setQueueTabFetching,
    [TYPE.GET_FEATURED_OBJECTS_BY_TELESCOPE_SUCCESS]: getFeaturedObjectsByTelescopeSuccess,
    [TYPE.GET_FEATURED_OBJECTS_BY_TELESCOPE_ERROR]: setQueueTabServerError,
  },
  initialState
);

function getAllSkyTimelapse(state) {
  return set(['allSkyTimelapse', 'isFetching'], true, state);
}

function getAllSkyTimelapseSuccess(state, action) {
  return apply(
    ['allSkyTimelapse'],
    () => ({
      isFetching: false,
      data: action.payload,
    }),
    state
  );
}

function getAllSkyTimelapseError(state, action) {
  return set(['allSkyTimelapse', 'serverError'], action.payload, state);
}

// Queue Tab

function setQueueTabFetching(state) {
  return set(['queueTab', 'isFetching'], true, state);
}

function setQueueTabServerError(state, action) {
  return set(['queueTab', 'serverError'], action.payload, state);
}

function getUpcomingSlotsByTelescopeSuccess(state, action) {
  return {
    ...state,
    queueTab: {
      ...state.queueTab,
      isFetching: false,
      upcomingSlotsData: action.payload,
    },
  };
}

function getFeaturedObjectsByTelescopeSuccess(state, action) {
  return {
    ...state,
    queueTab: {
      ...state.queueTab,
      isFetching: false,
      featuredObjectsData: action.payload,
    },
  };
}
