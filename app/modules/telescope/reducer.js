import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { set, apply } from 'qim';

export const TYPE = constants('telescope', [
  '~GET_ALL_SKY_TIMELAPSE',
  '~GET_UPCOMING_SLOTS_BY_TELESCOPE',
  '~GET_FEATURED_OBJECTS_BY_TELESCOPE',
  '~RESERVE_COMMUNITY_MISSION',
  '~GET_TELESCOPES',
  'SET_TELESCOPES_ACTIVE_TAB',
  '~GET_OBSERVATORY_LIST',
  '~GET_ALL_SKY_CAM',
  '~GET_DOME_CAM',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  serverError: null,

  pageSetup: {},

  telescopeActiveTab: 0,

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
    reservedCommunityMissionData: {},
    reservedCommunityMissionList: [],
  },

  observatoryList: { observatoryList: [] },

  allSkyCamData: {},
  domeCamData: {},
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
    [TYPE.RESERVE_COMMUNITY_MISSION]: setQueueTabFetching,
    [TYPE.RESERVE_COMMUNITY_MISSION_SUCCESS]: reserveCommunityMissionSuccess,
    [TYPE.RESERVE_COMMUNITY_MISSION_ERROR]: setQueueTabServerError,
    [TYPE.GET_TELESCOPES]: setTelescopesFetching,
    [TYPE.GET_TELESCOPES_SUCCESS]: getTelescopesSuccess,
    [TYPE.GET_TELESCOPES_ERROR]: setTelescopesError,
    [TYPE.SET_TELESCOPES_ACTIVE_TAB]: setTelescopesActiveTab,
    [TYPE.GET_OBSERVATORY_LIST]: setTelescopesFetching,
    [TYPE.GET_OBSERVATORY_LIST_SUCCESS]: getObservatoryListSuccess,
    [TYPE.GET_OBSERVATORY_LIST_ERROR]: setTelescopesError,
    [TYPE.GET_ALL_SKY_CAM]: setTelescopesFetching,
    [TYPE.GET_ALL_SKY_CAM_SUCCESS]: getAllSkyCamSuccess,
    [TYPE.GET_ALL_SKY_CAM_ERROR]: setTelescopesError,
    [TYPE.GET_DOME_CAM]: setTelescopesFetching,
    [TYPE.GET_DOME_CAM_SUCCESS]: getDomeCamSuccess,
    [TYPE.GET_DOME_CAM_ERROR]: setTelescopesError,
  },
  initialState
);

function setTelescopesActiveTab(state, action) {
  return {
    ...state,
    telescopeActiveTab: action.payload,
  };
}

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

function reserveCommunityMissionSuccess(state, action) {
  return {
    ...state,
    queueTab: {
      ...state.queueTab,
      isFetching: false,
      reservedCommunityMissionData: action.payload,
      reservedCommunityMissionList: action.payload.missionList,
    },
  };
}

function setTelescopesFetching(state) {
  return {
    ...state,
    isFetching: true,
  };
}

function setTelescopesError(state, action) {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
  };
}

function getTelescopesSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    pageSetup: {
      ...state.pageSetup,
      ...action.payload,
    },
  };
}

function getObservatoryListSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    observatoryList: {
      ...payload,
    },
  };
}

// Widgets begin

function getAllSkyCamSuccess(state, { payload }) {
  const { allSkyCamData } = state;
  const { widgetUniqueId } = payload;

  return {
    ...state,
    isFetching: false,
    allSkyCamData: {
      ...allSkyCamData,
      [widgetUniqueId]: {
        ...payload,
      },
    },
  };
}

function getDomeCamSuccess(state, { payload }) {
  const { domeCamData } = state;
  const { widgetUniqueId } = payload;

  return {
    ...state,
    isFetching: false,
    domeCamData: {
      ...domeCamData,
      [widgetUniqueId]: {
        ...payload,
      },
    },
  };
}

// Widgets end
