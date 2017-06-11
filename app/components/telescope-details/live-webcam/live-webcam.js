import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchObservatoryWebcam } from '../../../modules/Telescope-Overview';
import './live-webcam.scss';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { observatoryLiveWebcamResult },
}) => ({
  title: observatoryLiveWebcamResult.title,
  subtitle: observatoryLiveWebcamResult.subtitle,
  logoURL: observatoryLiveWebcamResult.logoURL,
  refreshIntervalSec: observatoryLiveWebcamResult.refreshIntervalSec,
  facilityWebcamURL: observatoryLiveWebcamResult.facilityWebcamURL,
  fetchingObservatoryLiveWebcamResult: telescopeOverview.fetchingObservatoryLiveWebcamResult,
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
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    logoURL: PropTypes.string.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    facilityWebcamURL: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      fetchObservatoryWebcam: PropTypes.func.isRequired,
    }).isRequired,
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
      title,
      subtitle,
      logoURL,
      fetchingObservatoryLiveWebcamResult,
      refreshIntervalSec,
      facilityWebcamURL,
    } = this.props;

    return (
      <div className="telescope-block live-webcam">
        <div className="top">
          <h3>{title}</h3>
          <p>{subtitle}</p>
          <img alt="Sponsored by logo" className="topLogo" height="40" src={logoURL} />
        </div>
        <div className="live-webcam-feed">
          {
            !fetchingObservatoryLiveWebcamResult ?
              <RefreshedImage
                imageURL={facilityWebcamURL}
                refreshIntervalSec={refreshIntervalSec}
              /> : <GenericLoadingBox />
          }
        </div>
      </div>
    );
  }
}

export default LiveWebcam;
