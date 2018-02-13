import { observatoryListSuccess, getCurrentObservatory } from '../Telescope-Overview';
import { resetSnapshotList } from '../starshare-camera/starshare-camera-actions';
import { resetActiveMission } from '../active-telescope-missions/active-telescope-missions-actions';

import {
  fetchObjectContent,
  fetchContentReset,
} from '../community-content/community-object-content-actions';

import { validateResponseAccess } from '../authorization/actions';

// services
import fetchCurrentConditions from '../../services/sky-widgets/current-conditions';
import fetchDayNightBarPanel from '../../services/sky-widgets/day-night-bar-panel';
import fetchDayNightMap from '../../services/sky-widgets/day-night-map';
import fetchAllSkyCamera from '../../services/sky-widgets/all-sky-camera';
import fetchDomeCam from '../../services/sky-widgets/dome-cam';
import fetchObservatoryList from '../../services/telescopes/observatory-list';
import fetchTelescopeStatus from '../../services/telescopes/telescope-status';

export const BOOTSTRAP_TELESCOPE_DETAILS_START = 'BOOTSTRAP_TELESCOPE_DETAILS_START';
export const BOOTSTRAP_TELESCOPE_DETAILS = 'BOOTSTRAP_TELESCOPE_DETAILS';
export const BOOTSTRAP_TELESCOPE_DETAILS_FAIL = 'BOOTSTRAP_TELESCOPE_DETAILS_FAIL';

export const FETCH_TELESCOPE_STATUS_START = 'FETCH_TELESCOPE_STATUS_START';
export const FETCH_TELESCOPE_STATUS_SUCCESS = 'FETCH_TELESCOPE_STATUS';
export const FETCH_TELESCOPE_STATUS_FAIL = 'FETCH_TELESCOPE_STATUS_FAIL';

export const RESET_CURRENT_OBSERVATORY_STATUS = 'RESET_CURRENT_OBSERVATORY_STATUS';
export const SET_CURRENT_OBSERVATORY_STATUS = 'SET_CURRENT_OBSERVATORY_STATUS';
export const UPDATE_TELESCOPE_STATUS = 'UPDATE_TELESCOPE_STATUS';

export const FETCH_CURRENT_WEATHER_CONDITIONS_START = 'FETCH_CURRENT_WEATHER_CONDITIONS_START';
export const FETCH_CURRENT_WEATHER_CONDITIONS_SUCCESS = 'FETCH_CURRENT_WEATHER_CONDITIONS_SUCCESS';

export const FETCH_DAY_NIGHT_BAR_PANEL_START = 'FETCH_DAY_NIGHT_BAR_PANEL_START';
export const FETCH_DAY_NIGHT_BAR_PANEL_SUCCESS = 'FETCH_DAY_NIGHT_BAR_PANEL_SUCCESS';

export const FETCH_DAY_NIGHT_MAP_START = 'FETCH_DAY_NIGHT_MAP_START';
export const FETCH_DAY_NIGHT_MAP_SUCCESS = 'FETCH_DAY_NIGHT_MAP_SUCCESS';

export const FETCH_ALL_SKY_START = 'FETCH_ALL_SKY_START';
export const FETCH_ALL_SKY_SUCCESS = 'FETCH_ALL_SKY_SUCCESS';

export const FETCH_DOME_CAM_START = 'FETCH_DOME_CAM_START';
export const FETCH_DOME_CAM_SUCCESS = 'FETCH_DOME_CAM_SUCCESS';

export const SET_CURRENT_OBSERVATORY = 'SET_CURRENT_OBSERVATORY';
export const SET_CURRENT_TELESCOPE = 'SET_CURRENT_TELESCOPE';

export const RESET_DETAILS_SELECTED_ELEMENTS = 'RESET_DETAILS_SELECTED_ELEMENTS';
export const SET_DISPLAY_COMMUNITY_CONTENT = 'SET_DISPLAY_COMMUNITY_CONTENT';

export const UPDATE_ACTIVE_SSE = 'UPDATE_ACTIVE_SSE';
export const RESET_ACTIVE_SSE = 'RESET_ACTIVE_SSE';

export const REMOVE_IMAGE_VIEWER_CLIP_STATE = 'REMOVE_IMAGE_VIEWER_CLIP_STATE';
export const APPLY_IMAGE_VIEWER_CLIP_STATE = 'APPLY_IMAGE_VIEWER_CLIP_STATE';

export const INCREMENT_MISSION_COUNTER = 'INCREMENT_MISSION_COUNTER';
export const RESET_MISSION_COUNTER = 'RESET_MISSION_COUNTER';
export const UPDATE_RECENTLY_VIEWED_MISSION_ID = 'UPDATE_RECENTLY_VIEWED_MISSION_ID';
export const RESET_VIEWED_MISSION_STATE = 'RESET_VIEWED_MISSION_STATE';

export const incrementMissionCounter = () => ({
  type: INCREMENT_MISSION_COUNTER,
});

export const resetMissionCounter = () => ({
  type: RESET_MISSION_COUNTER,
});

export const updateRecentlyViewedMissionID = missionID => ({
  type: UPDATE_RECENTLY_VIEWED_MISSION_ID,
  missionID,
});

export const resetViewedMissionState = () => ({
  type: RESET_VIEWED_MISSION_STATE,
});

export const removeImageViewerClipState = () => ({
  type: REMOVE_IMAGE_VIEWER_CLIP_STATE,
});

export const applyImageViewerClipState = () => ({
  type: APPLY_IMAGE_VIEWER_CLIP_STATE,
});

/**
  * Getting the current telescope from the API response
  * @param {array} observatoryTelescopes - Array of all telescopes in the current observatory
  * @param {string} telescopeId - Id of the current telescope, which available in URL and/or props.params
  * @returns {Object} telescope - Current telescope object
  */
function getCurrentTelescope(observatoryTelescopes, telescopeId) {
  return observatoryTelescopes.find(telescope => telescope.teleUniqueId === telescopeId);
}

export const updateActiveSSE = payload => ({
  type: UPDATE_ACTIVE_SSE,
  payload,
});

export const resetActiveSSE = () => ({
  type: RESET_ACTIVE_SSE,
});

const setTelescopeOnlineStatus = currentTelescopeOnlineStatus => ({
  type: SET_CURRENT_OBSERVATORY_STATUS,
  currentTelescopeOnlineStatus,
});

const fetchTelescopeStatusSuccess = payload => ({
  type: FETCH_TELESCOPE_STATUS_SUCCESS,
  payload,
});

const fetchTelescopeStatusError = payload => ({
  type: FETCH_TELESCOPE_STATUS_FAIL,
  payload,
});

export const updateTelescopeStatus = ({ teleUniqueId }) => (dispatch, getState) => {
  const {
    telescopeDetails: { allObservatoryTelescopeStatus: { statusList: { statusTeleList } } },
  } = getState();

  dispatch(
    setTelescopeOnlineStatus(
      statusTeleList.find(telescopeStatus => telescopeStatus.teleUniqueId === teleUniqueId),
    ),
  );
};

const startFetchTelescopeStatus = () => ({
  type: FETCH_TELESCOPE_STATUS_START,
});

export const fetchAllTelescopeStatus = ({ obsId, teleUniqueId, isRefresh }) => (dispatch) => {
  // if we are not refreshing inline then reset the flags
  // otherwise we expect to update in place seamlessly
  if (!isRefresh) {
    dispatch(startFetchTelescopeStatus());
  }

  return fetchTelescopeStatus(obsId)
    .then((result) => {
      const { statusList: { statusTeleList } } = result.data;
      const currentTelescopeStatus = statusTeleList.find(
        teleStatus => teleStatus.teleUniqueId === teleUniqueId,
      );

      dispatch(setTelescopeOnlineStatus(currentTelescopeStatus));
      dispatch(fetchTelescopeStatusSuccess(result.data));
    })
    .catch(error => dispatch(fetchTelescopeStatusError(error)));
};

const setDisplayCommunityContent = payload => ({
  type: SET_DISPLAY_COMMUNITY_CONTENT,
  payload,
});

const bootstrapTelescopeDetailsStart = () => ({
  type: BOOTSTRAP_TELESCOPE_DETAILS_START,
});

const bootStrapTelescopeDetailsSuccess = () => ({
  type: BOOTSTRAP_TELESCOPE_DETAILS,
});

const setCurrentObservatory = currentObservatory => ({
  type: SET_CURRENT_OBSERVATORY,
  currentObservatory,
});

const setCurrentTelescope = currentTelescope => ({
  type: SET_CURRENT_TELESCOPE,
  currentTelescope,
});

const fetchCommunityContent = telescope => (dispatch) => {
  const { teleContentType, teleContentList } = telescope;

  const NONE = 'none';
  const MISSION_OBJECT_ID = 'missionObjectId';
  const STATIC_OBJECT_ID = 'staticObjectId';
  const STATIC_SLUG_LOOKUP_ID = 'staticSlugLookupId';
  const STATIC_SLUG = 'staticSlug';

  const displayCommunityContent = teleContentType !== NONE;

  // sets fields for whether or not to display the community content fields
  // and resets the content
  dispatch(fetchContentReset());
  dispatch(setDisplayCommunityContent(displayCommunityContent));

  // TODO: based on the content type fetch the community content
  if (STATIC_OBJECT_ID) {
    dispatch(
      fetchObjectContent({
        objectId: teleContentList[0],
        callSource: 'telescopeDetails',
      }),
    );
  }
};

const resetMissionAndSetTelescope = currentTelescope => (dispatch) => {
  dispatch(fetchCommunityContent(currentTelescope));
  dispatch(resetActiveMission());
  dispatch(setCurrentTelescope(currentTelescope));
};

export const bootstrapTelescopeDetails = ({ obsUniqueId, teleUniqueId }) => (
  dispatch,
  getState,
) => {
  const { at, cid, token } = getState().user;

  dispatch(bootstrapTelescopeDetailsStart());

  return fetchObservatoryList({
    at,
    cid,
    token,
    callSource: 'details',
  })
    .then((result) => {
      const { apiError } = result.data;

      if (!apiError) {
        const { observatoryList } = result.data;
        const currentObservatory = getCurrentObservatory(observatoryList, obsUniqueId);
        const currentTelescope = getCurrentTelescope(
          currentObservatory.obsTelescopes,
          teleUniqueId,
        );

        dispatch(resetActiveMission());
        dispatch(fetchAllTelescopeStatus({ obsId: currentObservatory.obsId, teleUniqueId }));
        dispatch(setCurrentObservatory(currentObservatory));
        dispatch(resetMissionAndSetTelescope(currentTelescope));
        dispatch(resetSnapshotList());
        dispatch(observatoryListSuccess(result.data));
        dispatch(bootStrapTelescopeDetailsSuccess());
      } else {
        dispatch(validateResponseAccess(result.data));
      }
    })
    .catch((error) => {
      // TODO: handle error scenario when we have no information
      throw error;
      // dispatch(bootstrapTelescopeDetailsFail());
    });
};

export const setObservatory = ({ obsUniqueId, teleUniqueId }) => (dispatch, getState) => {
  const {
    telescopeDetails: { currentObservatory, fetchingObservatoryList },
    telescopeOverview: { observatoryList },
  } = getState();

  if (!currentObservatory) {
    dispatch(bootstrapTelescopeDetails({ obsUniqueId, teleUniqueId }));
  } else if (!fetchingObservatoryList) {
    const nextObservatory = getCurrentObservatory(observatoryList.observatoryList, obsUniqueId);
    dispatch(setCurrentObservatory(nextObservatory));
  }
};

export const setTelescope = ({ obsUniqueId, teleUniqueId }) => (dispatch, getState) => {
  const {
    telescopeDetails: { currentObservatory, fetchingObservatoryList },
    telescopeOverview: { observatoryList },
  } = getState();

  if (!currentObservatory) {
    dispatch(bootstrapTelescopeDetails({ obsUniqueId, teleUniqueId }));
  } else if (!fetchingObservatoryList) {
    const nextObservatory = getCurrentObservatory(observatoryList.observatoryList, obsUniqueId);
    const nextTelescope = getCurrentTelescope(nextObservatory.obsTelescopes, teleUniqueId);
    dispatch(resetMissionAndSetTelescope(nextTelescope));
    dispatch(resetSnapshotList());
  }
};

export const updateObservatoryAndTelescope = ({ obsUniqueId, teleUniqueId }) => (dispatch) => {
  dispatch(setObservatory({ obsUniqueId, teleUniqueId }));
  dispatch(setTelescope({ obsUniqueId, teleUniqueId }));
};

const fetchDomeCamStart = () => ({
  type: FETCH_DOME_CAM_START,
});

const fetchDomeCamSuccess = payload => ({
  type: FETCH_DOME_CAM_SUCCESS,
  payload,
});

const fetchDomeCamAction = ({ obsId, DomecamWidgetId }) => (dispatch) => {
  dispatch(fetchDomeCamStart());
  return fetchDomeCam({
    obsId,
    DomecamWidgetId,
  }).then(result => dispatch(fetchDomeCamSuccess(result.data)));
};

const fetchAllSkyStart = () => ({
  type: FETCH_ALL_SKY_START,
});

const fetchAllSkySuccess = payload => ({
  type: FETCH_ALL_SKY_SUCCESS,
  payload,
});

const fetchAllSkyAction = ({ obsId, AllskyWidgetId }) => (dispatch) => {
  dispatch(fetchAllSkyStart());
  return fetchAllSkyCamera({
    obsId,
    AllskyWidgetId,
  }).then(result => dispatch(fetchAllSkySuccess(result.data)));
};

const fetchDayNightMapStart = () => ({
  type: FETCH_DAY_NIGHT_MAP_START,
});

const fetchDayNightMapSuccess = payload => ({
  type: FETCH_DAY_NIGHT_MAP_SUCCESS,
  payload,
});

const fetchDayNightMapAction = ({ obsId, DayNightMapWidgetId }) => (dispatch) => {
  dispatch(fetchDayNightMapStart());
  return fetchDayNightMap({
    obsId,
    DayNightMapWidgetId,
  }).then(result => dispatch(fetchDayNightMapSuccess(result.data)));
};

const fetchWeatherConditionsStart = () => ({
  type: FETCH_CURRENT_WEATHER_CONDITIONS_START,
});

const fetchWeatherConditionsSuccess = payload => ({
  type: FETCH_CURRENT_WEATHER_CONDITIONS_SUCCESS,
  payload,
});

const fetchWeatherConditions = ({ obsId, CurrentConditionsWidgetId }) => (dispatch) => {
  dispatch(fetchWeatherConditionsStart());
  return fetchCurrentConditions({
    obsId,
    widgetUniqueId: CurrentConditionsWidgetId,
  }).then(result => dispatch(fetchWeatherConditionsSuccess(result.data)));
};

const fetchDayNightBarPanelStart = () => ({
  type: FETCH_DAY_NIGHT_BAR_PANEL_START,
});

const fetchDayNightBarPanelSuccess = payload => ({
  type: FETCH_DAY_NIGHT_BAR_PANEL_SUCCESS,
  payload,
});

const fetchDayNightBarPanelAction = ({ obsId, DayNightBarPanelWidgetId }) => (dispatch) => {
  dispatch(fetchDayNightBarPanelStart());
  return fetchDayNightBarPanel({
    obsId,
    DayNightBarPanelWidgetId,
  }).then(result => dispatch(fetchDayNightBarPanelSuccess(result.data)));
};

export const fetchAllWidgets = ({
  obsId,
  CurrentConditionsWidgetId,
  DayNightBarPanelWidgetId,
  DayNightMapWidgetId,
  AllskyWidgetId,
  DomecamWidgetId,
}) => (dispatch) => {
  dispatch(fetchWeatherConditions({ obsId, CurrentConditionsWidgetId }));
  dispatch(fetchDayNightBarPanelAction({ obsId, DayNightBarPanelWidgetId }));
  dispatch(fetchDayNightMapAction({ obsId, DayNightMapWidgetId }));
  dispatch(fetchAllSkyAction({ obsId, AllskyWidgetId }));
  dispatch(fetchDomeCamAction({ obsId, DomecamWidgetId }));
};
