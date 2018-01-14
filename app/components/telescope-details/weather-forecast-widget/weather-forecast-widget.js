import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchWeatherForecast } from '../../../modules/Telescope-Overview';
import './weather-forecast-widget.scss';
import { white } from '../../../styles/variables/colors';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { weatherForecastWidgetResult },
}) => ({
  title: weatherForecastWidgetResult.title,
  refreshIntervalSec: weatherForecastWidgetResult.refreshIntervalSec,
  miniWeatherPanelURL: weatherForecastWidgetResult.miniWeatherPanelURL,
  fetchingWeatherForecastWidgetResult: telescopeOverview.fetchingWeatherForecastWidgetResult,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchWeatherForecast,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class WeatherForecastWidget extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    miniWeatherPanelWidgetId: PropTypes.string.isRequired,
    fetchingWeatherForecastWidgetResult: PropTypes.bool.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    miniWeatherPanelURL: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      fetchWeatherForecast: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { obsId, miniWeatherPanelWidgetId } = this.props;
    this.props.actions.fetchWeatherForecast({
      obsId,
      miniWeatherPanelWidgetId,
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.miniWeatherPanelWidgetId !== nextProps.miniWeatherPanelWidgetId && this.props.obsId !== nextProps.obsId) {
      this.props.actions.fetchWeatherForecast({
        obsId: nextProps.obsId,
        miniWeatherPanelWidgetId: nextProps.miniWeatherPanelWidgetId,
      });
    }
  }

  refreshLiveImageInterval = null;

  render() {
    const {
      fetchingWeatherForecastWidgetResult,
      title,
      refreshIntervalSec,
      miniWeatherPanelURL,
    } = this.props;

    const inlineTitleStyle = {
      color: 'white',
      textAlign: 'center',
      position: 'absolute',
      minWidth: '100%',
    }

    return (
      <div className="telescope-block live-webcam">
        <div className="top">
          <h3>{title}</h3>
        </div>

        <div className="live-webcam-feed">
           {
             miniWeatherPanelURL ?
               <img
                 alt="Webcam feed"
                 src={miniWeatherPanelURL}
                 width="100%"
               /> : <GenericLoadingBox />
           }
         </div>
      </div>
    );
  }
}

export default WeatherForecastWidget;
