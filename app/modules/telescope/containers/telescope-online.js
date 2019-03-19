import { fetchAllWidgets } from 'app/modules/telescope-details/actions';
import {
  fetchDomeCamAction,
  fetchWeatherSatellite,
} from 'app/modules/Telescope-Overview';
import { TelescopeOnline } from 'app/modules/telescope/components/telescope-online';
import {
  makeDayNightBarPanelSelector,
  makeDayNightMapSelector,
  makeDomeCamSelector,
  makeWeatherSatelliteSelector,
} from 'app/modules/telescope/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  dayNightBarPanel: makeDayNightBarPanelSelector(),
  dayNightMap: makeDayNightMapSelector(),
  weatherSatellite: makeWeatherSatelliteSelector(),
  domeCam: makeDomeCamSelector(),
});

const mapDispatchToProps = {
  fetchAllWidgets,
  fetchWeatherSatellite,
  fetchDomeCamAction,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TelescopeOnline);
