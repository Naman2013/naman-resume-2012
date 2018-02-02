import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchWeatherMissionControlStatus } from '../../../modules/Telescope-Overview';
import './weather-mission-control-status-widget.scss';
import { white } from '../../../styles/variables/colors';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { weatherMissionControlStatusWidgetResult },
}) => ({
  title: weatherMissionControlStatusWidgetResult.title,
  refreshIntervalSec: weatherMissionControlStatusWidgetResult.refreshIntervalSec,
  missionControlStatusURL: weatherMissionControlStatusWidgetResult.missionControlStatusURL,
  fetchingWeatherMissionControlStatusWidgetResult: telescopeOverview.fetchingWeatherMissionControlStatusWidgetResult,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchWeatherMissionControlStatus,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class WeatherMissionControlStatusWidget extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    missionControlStatusWidgetId: PropTypes.string.isRequired,
    fetchingWeatherMissionControlStatusWidgetResult: PropTypes.bool.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    missionControlStatusURL : PropTypes.string.isRequired,
    actions: PropTypes.shape({
      fetchWeatherMissionControlStatus: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { obsId, missionControlStatusWidgetId } = this.props;
    this.props.actions.fetchWeatherMissionControlStatus({
      obsId,
      missionControlStatusWidgetId,
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.missionControlStatusWidgetId !== nextProps.missionControlStatusWidgetId && this.props.obsId !== nextProps.obsId) {
      this.props.actions.fetchWeatherMissionControlStatus({
        obsId: nextProps.obsId,
        missionControlStatusWidgetId: nextProps.missionControlStatusWidgetId ,
      });
    }
  }

  refreshLiveImageInterval = null;

  render() {
    const {
      fetchingWeatherMissionControlStatisWidgetResult,
      title,
      refreshIntervalSec,
      missionControlStatusURL ,
    } = this.props;

    return (
      <div className="telescope-block weather-missioncontrolstatus-widget">
        <div className="live-weather-missioncontrolstatus">
           {
             missionControlStatusURL ?
               <RefreshedImage
                 imageURL={missionControlStatusURL}
                 refreshIntervalSec={refreshIntervalSec}
                 imageAltText=""
                 /> : <GenericLoadingBox />
           }
         </div>
      </div>
    );
  }
}

export default WeatherMissionControlStatusWidget;
