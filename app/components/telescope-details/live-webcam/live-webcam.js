import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import './live-webcam.scss';

const mapStateToProps = ({ telescopeOverview }) => ({
  ...telescopeOverview.observatoryLiveWebcamResult,
});

@connect(mapStateToProps)
class LiveWebcam extends Component {
  static propTypes = {
    apiError: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    credits: PropTypes.string.isRequired,
    logoURL: PropTypes.string.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    facilityWebcamURL: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const { refreshIntervalSec, facilityWebcamURL } = this.props;
    this.scaffoldTimer({
      refreshIntervalSec,
      facilityWebcamURL,
    });
  }

  state = {
    facilityWebcamURL: this.generateNewWebcamURL(),
  }

  componentWillReceiveProps(nextProps) {
    const { facilityWebcamURL } = this.props;
    if (facilityWebcamURL !== nextProps.facilityWebcamURL) {
      this.setState({
        facilityWebcamURL: nextProps.facilityWebcamURL,
      });
      this.scaffoldTimer({
        refreshIntervalSec: nextProps.refreshIntervalSec,
        facilityWebcamURL: nextProps.facilityWebcamURL,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshLiveImageInterval);
  }

  setNewWebcamURL() {
    const facilityWebcamURL = this.generateNewWebcamURL();
    this.setState({
      facilityWebcamURL,
    });
  }

  generateNewWebcamURL() {
    const { facilityWebcamURL } = this.props;
    if (facilityWebcamURL) {
      return `${facilityWebcamURL}#cache-bust=${new Date().getTime()}`;
    }
    return '';
  }

  refreshLiveImageInterval = null

  scaffoldTimer({ refreshIntervalSec, facilityWebcamURL }) {
    clearInterval(this.refreshLiveImageInterval);
    if (refreshIntervalSec && facilityWebcamURL) {
      this.refreshLiveImageInterval = setInterval(::this.setNewWebcamURL, refreshIntervalSec * 1000);
    }
  }

  render() {
    const {
      title,
      subtitle,
      logoURL,
    } = this.props;
    const { facilityWebcamURL } = this.state;

    return (
      <div className="telescope-block live-webcam">
        <div className="top">
          <h3>{title}</h3>
          <p>{subtitle}</p>
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
