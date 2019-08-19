import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Offline from '../condition-snapshot/Offline';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchTeidePeakCamTimelapseAction } from '../../../modules/Telescope-Overview';
import { white } from '../../../styles/variables/colors';
import './teidepeak-cam-timelapse-widget.scss';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { teidePeakCamTimelapseWidgetResult },
}) => ({
  domeCamTimelapseTitle: teidePeakCamTimelapseWidgetResult.title,
  refreshIntervalSec: teidePeakCamTimelapseWidgetResult.refreshIntervalSec,
  domeCamTimelapseURL: teidePeakCamTimelapseWidgetResult.facilityWebcamTimelapseURL,
  offlineImageURL: teidePeakCamTimelapseWidgetResult.offlineImageURL,
  onlineStatus: teidePeakCamTimelapseWidgetResult.onlineStatus,
  widgetWidth: teidePeakCamTimelapseWidgetResult.widgetWidth,
  fetchingTeidePeakCamTimelapseWidgetResult:
    telescopeOverview.fetchingTeidePeakCamTimelapseWidgetResult,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchTeidePeakCamTimelapseAction,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class TeidePeakCamTimelapseWidget extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    DomecamTimelapseWidgetId: PropTypes.string.isRequired,
    fetchingDomeCamTimelapseWidgetResult: PropTypes.bool.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    domeCamTimelapseURL: PropTypes.string.isRequired,
    onlineStatus: PropTypes.string.isRequired,
    offlineImageURL: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { obsId, DomecamTimelapseWidgetId } = this.props;
    this.props.actions.fetchTeidePeakCamTimelapseAction({
      obsId,
      DomecamTimelapseWidgetId,
    });
  }

  render() {
    const {
      fetchingTeidePeakCamTimelapseWidgetResult,
      domeCamTimelapseTitle,
      refreshIntervalSec,
      domeCamTimelapseURL,
      onlineStatus,
      offlineImageURL,
      widgetWidth,
    } = this.props;

    const inlineTitleStyle = {
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      minWidth: '100%',
    };

    return (
      <div className="telescope-block live-domecam">
        <h1 style={inlineTitleStyle}>{domeCamTimelapseTitle}</h1>
        <div className="live-domecamtimelapse">
          {onlineStatus === 'offline' && (
            <Offline offlineImageURL={offlineImageURL} />
          )}
          {onlineStatus === 'online' && domeCamTimelapseURL ? (
            <video
              style={{ width: `${widgetWidth}px` }}
              className="domecamtimelapse-video"
              playsInline
              autoPlay
              muted
              loop
              nodownload
              controls
              controlsList="nodownload"
            >
              <source src={domeCamTimelapseURL} type="video/mp4" />
            </video>
          ) : (
            <GenericLoadingBox />
          )}
        </div>
      </div>
    );
  }
}

export default TeidePeakCamTimelapseWidget;
