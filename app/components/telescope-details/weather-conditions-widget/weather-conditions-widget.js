import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchWeatherConditions } from '../../../modules/Telescope-Overview';
import './weather-conditions-widget.scss';
import { white } from '../../../styles/variables/colors';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { weatherConditionsWidgetResult },
}) => ({
  title: weatherConditionsWidgetResult.title,
  refreshIntervalSec: weatherConditionsWidgetResult.refreshIntervalSec,
  weatherConditionsURL: weatherConditionsWidgetResult.weatherConditionsURL,
  fetchingWeatherConditionsWidgetResult: telescopeOverview.fetchingWeatherConditionsWidgetResult,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchWeatherConditions,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class WeatherConditionsWidget extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    weatherConditionsWidgetId: PropTypes.string.isRequired,
    fetchingWeatherConditionsWidgetResult: PropTypes.bool.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    weatherConditionsURL: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      fetchWeatherConditions: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { obsId, weatherConditionsWidgetId } = this.props;
    this.props.actions.fetchWeatherConditions({
      obsId,
      weatherConditionsWidgetId,
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.weatherConditionsWidgetId !== nextProps.weatherConditionsWidgetId && this.props.obsId !== nextProps.obsId) {
      this.props.actions.fetchWeatherConditions({
        obsId: nextProps.obsId,
        weatherConditionsWidgetId: nextProps.weatherConditionsWidgetId,
      });
    }
  }

  refreshLiveImageInterval = null;

  render() {
    const {
      fetchingWeatherConditionsWidgetResult,
      title,
      refreshIntervalSec,
      weatherConditionsURL,
    } = this.props;

    const inlineTitleStyle = {
      color: 'white',
      textAlign: 'center',
      position: 'absolute',
      minWidth: '100%',
    }

    return (
      <div className="telescope-block live-weather-conditions">
        <div className="live-weather-conditions">
          {
            weatherConditionsURL ?
              <RefreshedImage
                imageURL={weatherConditionsURL}
                refreshIntervalSec={refreshIntervalSec}
                imageAltText=""
                /> : <GenericLoadingBox />

          }
         </div>
      </div>
    );
  }
}

export default WeatherConditionsWidget;
