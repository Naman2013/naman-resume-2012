import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchWeatherSatellite } from '../../../modules/Telescope-Overview';

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
      imageWidth,
    } = this.props;

    const inlineTitleStyle = {
      color: 'white',
      textAlign: 'center',
      position: 'absolute',
      minWidth: '100%',
    }

    const defaultProps = {
      imageWidth: '100%',
    };

    return (
      <div className="telescope-block weather-satellite-widget">
        <div className="live-weather-satellite">
           {
             satelliteImageURL ?
               <RefreshedImage
                 imageURL={satelliteImageURL}
                 refreshIntervalSec={refreshIntervalSec}
                 imageAltText=""
                 maxImageWidth={imageWidth}
                 /> : <GenericLoadingBox />
           }
         </div>
      </div>
    );
  }
}

export default WeatherSatelliteWidget;
