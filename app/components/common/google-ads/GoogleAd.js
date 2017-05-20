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
      window.googletag.cmd.push(() => {
        window.googletag.defineSlot(
          adURL,
          [adWidth, adHeight],
          targetDivID)
          .addService(window.googletag.pubads());
        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
        window.googletag.display(targetDivID);
      });
    }
  }

  render() {
    const { targetDivID, adWidth, adHeight } = this.props;
    const adInlineStyle = {
      width: adWidth,
      height: adHeight,
    };

    return (
      <div style={adInlineStyle} id={targetDivID} />
    );
  }
}

export default GoogleAd;
