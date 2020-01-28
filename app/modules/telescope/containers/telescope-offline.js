import { fetchAllWidgets } from 'app/modules/telescope-details/actions';
import {
  fetchDomeCamAction,
  fetchObservatoryWebcam,
  fetchSeeingConditionsWidget,
  fetchWeatherSatellite,
} from 'app/modules/Telescope-Overview';
import TelescopeOffline from 'app/modules/telescope/components/offline';
import {
  makeDayNightBarPanelSelector,
  makeDayNightMapSelector,
  makeDayNightBarSelector,
  makeDomeCamSelector,
  makeFacilityWebcamSelector,
  makeWeatherSatelliteSelector,
  makeAllSkyCameraSelector,
  makeTeidePeakCamCameraSelector,
  makeWeatherConditionsSelector,
  makeSkyConditionsSelector,
} from 'app/modules/telescope/selectors';
import { setPreviousInstrument } from 'app/modules/starshare-camera/starshare-camera-actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  dayNightBarPanel: makeDayNightBarPanelSelector(),
  dayNightBar: makeDayNightBarSelector(),
  dayNightMap: makeDayNightMapSelector(),
  weatherSatellite: makeWeatherSatelliteSelector(),
  weatherConditions: makeWeatherConditionsSelector(),
  domeCam: makeDomeCamSelector(),
  facilityWebcam: makeFacilityWebcamSelector(),
  allSkyCam: makeAllSkyCameraSelector(),
  teidePeakCam: makeTeidePeakCamCameraSelector(),
  skyConditions: makeSkyConditionsSelector(),
});

const mapDispatchToProps = {
  fetchAllWidgets,
  fetchWeatherSatellite,
  fetchDomeCamAction,
  fetchObservatoryWebcam,
  setPreviousInstrument,
  fetchSeeingConditionsWidget,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TelescopeOffline);
