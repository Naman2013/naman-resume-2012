import { observatoryListSuccess } from '../Telescope-Overview';

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

const bootstrapTelescopeDetailsStart = () => ({
  type: BOOTSTRAP_TELESCOPE_DETAILS_START,
});

const bootStrapTelescopeDetailsSuccess = payload => ({
  type: BOOTSTRAP_TELESCOPE_DETAILS,
  payload,
});

const bootstrapTelescopeDetailsFail = payload => ({
  type: BOOTSTRAP_TELESCOPE_DETAILS_FAIL,
  payload,
});

const setCurrentObservatory = observatory => ({
  type: SET_CURRENT_OBSERVATORY,
  observatory,
});

export const bootstrapTelescopeDetails = ({ obsUniqueId, teleUniqueId }) => (dispatch, getState) => {
  const { at, cid, token } = getState().user;

  return fetchObservatoryList({
    at,
    cid,
    token,
    callSource: 'details',
  }).then((result) => {

    // TODO: isolate an observatory that matches the passed unique ID
    // TODO: isolate a telescope that matches the passed unique ID

    dispatch(observatoryListSuccess(result.data));

  }).catch((error) => {
    // TODO: handle error scenario when we have no information
  });
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
