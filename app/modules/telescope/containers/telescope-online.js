import {
  fetchAllTelescopeStatus,
  fetchAllWidgets,
  updateCurrentInstrument,
} from 'app/modules/telescope-details/actions';
import {
  fetchDomeCamAction,
  fetchObservatoryWebcam,
  fetchWeatherSatellite,
} from 'app/modules/Telescope-Overview';
import { TelescopeOnline } from 'app/modules/telescope/components/telescope-online';
import {
  makeDayNightBarPanelSelector,
  makeDayNightMapSelector,
  makeDomeCamSelector,
  makeFacilityWebcamSelector,
  makeWeatherSatelliteSelector,
  makeMoonlightBarSelector,
  makeDayNightBarSelector,
  makeWeatherConditionsSelector,
  makeTeidePeakCamCameraSelector,
} from 'app/modules/telescope/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  dayNightBarPanel: makeDayNightBarPanelSelector(),
  dayNightBar: makeDayNightBarSelector(),
  dayNightMap: makeDayNightMapSelector(),
  weatherSatellite: makeWeatherSatelliteSelector(),
  weatherConditions: makeWeatherConditionsSelector(),
  domeCam: makeDomeCamSelector(),
  facilityWebcam: makeFacilityWebcamSelector(),
  moonlightBar: makeMoonlightBarSelector(),
  teidePeakCam: makeTeidePeakCamCameraSelector(),
});

const mapDispatchToProps = {
  fetchAllWidgets,
  fetchWeatherSatellite,
  fetchDomeCamAction,
  fetchObservatoryWebcam,
  setTelescopesActiveTab: ACTION.setTelescopesActiveTab,
  fetchAllTelescopeStatus,
  updateCurrentInstrument,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TelescopeOnline);
