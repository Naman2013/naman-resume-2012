import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchWeatherSatellite } from '../../../modules/Telescope-Overview';
import './weather-satellite-widget.scss';
import { white } from '../../../styles/variables/colors';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { weatherSatelliteWidgetResult },
}) => ({
  title: weatherSatelliteWidgetResult.title,
  refreshIntervalSec: weatherSatelliteWidgetResult.refreshIntervalSec,
  satelliteImageURL: weatherSatelliteWidgetResult.satelliteImageURL,
  fetchingWeatherSatelliteWidgetResult: telescopeOverview.fetchingWeatherSatelliteWidgetResult,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchWeatherSatellite,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class WeatherSatelliteWidget extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    satelliteWidgetId: PropTypes.string.isRequired,
    fetchingWeatherSatelliteWidgetResult: PropTypes.bool.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    satelliteImageURL : PropTypes.string.isRequired,
    actions: PropTypes.shape({
      fetchWeatherSatellite: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { obsId, satelliteWidgetId } = this.props;
    this.props.actions.fetchWeatherSatellite({
      obsId,
      satelliteWidgetId,
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.satelliteWidgetId !== nextProps.satelliteWidgetId && this.props.obsId !== nextProps.obsId) {
      this.props.actions.fetchWeatherSatellite({
        obsId: nextProps.obsId,
        satelliteWidgetId: nextProps.satelliteWidgetId ,
      });
    }
  }

  refreshLiveImageInterval = null;

  render() {
    const {
      fetchingWeatherSatelliteWidgetResult,
      title,
      refreshIntervalSec,
      satelliteImageURL ,
    } = this.props;

    const inlineTitleStyle = {
      color: 'white',
      textAlign: 'center',
      position: 'absolute',
      minWidth: '100%',
    }

    return (
      <div className="telescope-block weather-satellite-widget">
        <div className="live-weather-satellite">
           {
             satelliteImageURL ?
               <img
                 alt="Webcam feed"
                 src={satelliteImageURL}
                 width="100%"
               /> : <GenericLoadingBox />
           }
         </div>
      </div>
    );
  }
}

export default WeatherSatelliteWidget;
