import { observatoryListSuccess, getCurrentObservatory } from '../Telescope-Overview';

import fetchCurrentConditions from '../../services/sky-widgets/current-conditions';
import fetchDayNightBar from '../../services/sky-widgets/day-night-bar';
import fetchDayNightMap from '../../services/sky-widgets/day-night-map';
import fetchAllSkyCamera from '../../services/sky-widgets/all-sky-camera';
import fetchDomeCam from '../../services/sky-widgets/dome-cam';
import fetchObservatoryList from '../../services/telescopes/observatory-list';

export const BOOTSTRAP_TELESCOPE_DETAILS_START = 'BOOTSTRAP_TELESCOPE_DETAILS_START';
export const BOOTSTRAP_TELESCOPE_DETAILS = 'BOOTSTRAP_TELESCOPE_DETAILS';
export const BOOTSTRAP_TELESCOPE_DETAILS_FAIL = 'BOOTSTRAP_TELESCOPE_DETAILS_FAIL';

export const FETCH_CURRENT_WEATHER_CONDITIONS_START = 'FETCH_CURRENT_WEATHER_CONDITIONS_START';
export const FETCH_CURRENT_WEATHER_CONDITIONS_SUCCESS = 'FETCH_CURRENT_WEATHER_CONDITIONS_SUCCESS';

export const FETCH_DAY_NIGHT_BAR_START = 'FETCH_DAY_NIGHT_BAR_START';
export const FETCH_DAY_NIGHT_BAR_SUCCESS = 'FETCH_DAY_NIGHT_BAR_SUCCESS';

export const FETCH_DAY_NIGHT_MAP_START = 'FETCH_DAY_NIGHT_MAP_START';
export const FETCH_DAY_NIGHT_MAP_SUCCESS = 'FETCH_DAY_NIGHT_MAP_SUCCESS';

export const FETCH_ALL_SKY_START = 'FETCH_ALL_SKY_START';
export const FETCH_ALL_SKY_SUCCESS = 'FETCH_ALL_SKY_SUCCESS';

export const FETCH_DOME_CAM_START = 'FETCH_DOME_CAM_START';
export const FETCH_DOME_CAM_SUCCESS = 'FETCH_DOME_CAM_SUCCESS';

export const SET_CURRENT_OBSERVATORY = 'SET_CURRENT_OBSERVATORY';
export const SET_CURRENT_TELESCOPE = 'SET_CURRENT_TELESCOPE';

export const RESET_DETAILS_SELECTED_ELEMENTS = 'RESET_DETAILS_SELECTED_ELEMENTS';

/**
  * Getting the current telescope from the API response
  * @param {array} observatoryTelescopes - Array of all telescopes in the current observatory
  * @param {string} telescopeId - Id of the current telescope, which available in URL and/or props.params
  * @returns {Object} telescope - Current telescope object
  */
function getCurrentTelescope(observatoryTelescopes, telescopeId) {
  return observatoryTelescopes.find(telescope => telescope.teleUniqueId === telescopeId);
}

const resetSelectedDetailsElements = () => ({
  type: RESET_DETAILS_SELECTED_ELEMENTS,
});

const bootstrapTelescopeDetailsStart = () => ({
  type: BOOTSTRAP_TELESCOPE_DETAILS_START,
});

const bootStrapTelescopeDetailsSuccess = () => ({
  type: BOOTSTRAP_TELESCOPE_DETAILS,
});

const bootstrapTelescopeDetailsFail = payload => ({
  type: BOOTSTRAP_TELESCOPE_DETAILS_FAIL,
  payload,
});

const setCurrentObservatory = currentObservatory => ({
  type: SET_CURRENT_OBSERVATORY,
  currentObservatory,
});

const setCurrentTelescope = currentTelescope => ({
  type: SET_CURRENT_TELESCOPE,
  currentTelescope,
});

const fetchCommunityContent = telescope => (dispatch, getState) => {
  // TODO: check in on the telescope and determine what community content we need to display
  const { teleContentType, teleContentCount, teleContentList } = telescope;

  const NONE = 'none';
  const MISSION_OBJECT_ID = 'missionObjectId';
  const STATIC_OBJECT_ID = 'staticObjectId';
  const STATIC_SLUG_LOOKUP_ID = 'staticSlugLookupId';
  const STATIC_SLUG = 'staticSlug';

  // TODO: document the teleContentTypes
  // TODO: based on the content type fetch the community content
};

export const bootstrapTelescopeDetails = ({ obsUniqueId, teleUniqueId }) => (dispatch, getState) => {
  const { at, cid, token } = getState().user;

  dispatch(bootstrapTelescopeDetailsStart());
  dispatch(resetSelectedDetailsElements());

  return fetchObservatoryList({
    at,
    cid,
    token,
    callSource: 'details',
  }).then((result) => {
    const { observatoryList } = result.data;
    const currentObservatory = getCurrentObservatory(observatoryList, obsUniqueId);
    const currentTelescope = getCurrentTelescope(currentObservatory.obsTelescopes, teleUniqueId);

    dispatch(fetchCommunityContent(currentTelescope));
    dispatch(setCurrentObservatory(currentObservatory));
    dispatch(setCurrentTelescope(currentTelescope));
    dispatch(observatoryListSuccess(result.data));
    dispatch(bootStrapTelescopeDetailsSuccess());
  }).catch(() => {
    // TODO: handle error scenario when we have no information
    dispatch(bootstrapTelescopeDetailsFail());
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
    dispatch(setCurrentTelescope(nextTelescope));
  }
};

export const updateObservatoryAndTelescope = ({ obsUniqueId, teleUniqueId }) => (dispatch) => {
  dispatch(setObservatory({ obsUniqueId, teleUniqueId }));
  dispatch(setTelescope({ obsUniqueId, teleUniqueId }));
}

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
    AllskyWidgetId }).then(result => dispatch(fetchAllSkySuccess(result.data)));
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
    DayNightMapWidgetId }).then(result => dispatch(fetchDayNightMapSuccess(result.data)));
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
  })
  .then(result => dispatch(fetchWeatherConditionsSuccess(result.data)));
};

const fetchDayNightBarStart = () => ({
  type: FETCH_DAY_NIGHT_BAR_START,
});

const fetchDayNightBarSuccess = payload => ({
  type: FETCH_DAY_NIGHT_BAR_SUCCESS,
  payload,
});

const fetchDayNightBarAction = ({ obsId, DayNightBarWidgetId }) => (dispatch) => {
  dispatch(fetchDayNightBarStart());
  return fetchDayNightBar({
    obsId,
    DayNightBarWidgetId,
  })
  .then(result => dispatch(fetchDayNightBarSuccess(result.data)));
};

export const fetchAllWidgets = ({ obsId, CurrentConditionsWidgetId, DayNightBarWidgetId, DayNightMapWidgetId, AllskyWidgetId, DomecamWidgetId }) => (dispatch) => {
  dispatch(fetchWeatherConditions({ obsId, CurrentConditionsWidgetId }));
  dispatch(fetchDayNightBarAction({ obsId, DayNightBarWidgetId }));
  dispatch(fetchDayNightMapAction({ obsId, DayNightMapWidgetId }));
  dispatch(fetchAllSkyAction({ obsId, AllskyWidgetId }));
  dispatch(fetchDomeCamAction({ obsId, DomecamWidgetId }));
};
