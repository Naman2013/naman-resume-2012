import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GoogleAd extends Component {
  static propTypes = {
    adURL: PropTypes.string.isRequired,
    adWidth: PropTypes.number.isRequired,
    adHeight: PropTypes.number.isRequired,
    targetDivID: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { adURL, adWidth, adHeight, targetDivID } = this.props;

    if (window.googletag) {
      googletag.cmd.push(() => {
        googletag.defineSlot(adURL, [adWidth, adHeight], targetDivID).addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
    }
  }

  render() {
    const { targetDivID } = this.props;

    return (
      <div id={targetDivID} />
    );
  }
}

export default GoogleAd;
