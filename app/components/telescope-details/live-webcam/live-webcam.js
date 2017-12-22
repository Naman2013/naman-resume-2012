import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchObservatoryWebcam } from '../../../modules/Telescope-Overview';
import './live-webcam.scss';
import { white } from '../../../styles/variables/colors';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { observatoryLiveWebcamResult },
}) => ({
  title: observatoryLiveWebcamResult.title,
  subtitle: observatoryLiveWebcamResult.subtitle,
  logoURL: observatoryLiveWebcamResult.logoURL,
  imageWidth: observatoryLiveWebcamResult.imageWidth,
  refreshIntervalSec: observatoryLiveWebcamResult.refreshIntervalSec,
  facilityWebcamURL: observatoryLiveWebcamResult.facilityWebcamURL,
  fetchingObservatoryLiveWebcamResult: telescopeOverview.fetchingObservatoryLiveWebcamResult,
  logoWidth: '150px',
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObservatoryWebcam,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class LiveWebcam extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    facilityWebcamWidgetId: PropTypes.string.isRequired,
    fetchingObservatoryLiveWebcamResult: PropTypes.bool.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    facilityWebcamURL: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      fetchObservatoryWebcam: PropTypes.func.isRequired,
    }).isRequired,
    imageWidth: PropTypes.string.isRequired,
    logoWidth: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { obsId, facilityWebcamWidgetId } = this.props;
    this.props.actions.fetchObservatoryWebcam({
      obsId,
      facilityWebcamWidgetId,
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.facilityWebcamWidgetId !== nextProps.facilityWebcamWidgetId && this.props.obsId !== nextProps.obsId) {
      this.props.actions.fetchObservatoryWebcam({
        obsId: nextProps.obsId,
        facilityWebcamWidgetId: nextProps.facilityWebcamWidgetId,
      });
    }
  }

  refreshLiveImageInterval = null;

  render() {
    const {
      fetchingObservatoryLiveWebcamResult,
      refreshIntervalSec,
      facilityWebcamURL,
      imageWidth,
      title,
      logoURL,
      logoWidth,
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
          <img alt="Sponsored by logo" className="topLogo" height="40" src={logoURL} />
        </div>

        <div className="live-webcam-feed">
           {
             facilityWebcamURL ?
               <img
                 alt="Webcam feed"
                 src={facilityWebcamURL}
                 width="100%"
               /> : <GenericLoadingBox />
           }
         </div>
      </div>
    );
  }
}

export default LiveWebcam;
