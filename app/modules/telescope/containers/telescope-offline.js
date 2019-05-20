import { fetchAllWidgets } from 'app/modules/telescope-details/actions';
import {
  fetchDomeCamAction,
  fetchObservatoryWebcam,
  fetchWeatherSatellite,
} from 'app/modules/Telescope-Overview';
import TelescopeOffline from 'app/modules/telescope/components/offline';
import {
  makeDayNightBarPanelSelector,
  makeDayNightMapSelector,
  makeDomeCamSelector,
  makeFacilityWebcamSelector,
  makeWeatherSatelliteSelector,
  makeAllSkyCameraSelector,
} from 'app/modules/telescope/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  dayNightBarPanel: makeDayNightBarPanelSelector(),
  dayNightMap: makeDayNightMapSelector(),
  weatherSatellite: makeWeatherSatelliteSelector(),
  domeCam: makeDomeCamSelector(),
  facilityWebcam: makeFacilityWebcamSelector(),
  allSkyCam: makeAllSkyCameraSelector(),
});

const mapDispatchToProps = {
  fetchAllWidgets,
  fetchWeatherSatellite,
  fetchDomeCamAction,
  fetchObservatoryWebcam,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TelescopeOffline);
