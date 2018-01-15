import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GoogleOutOfPageAd extends Component {
  static propTypes = {
    adURL: PropTypes.string.isRequired,
    targetDivID: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { adURL, targetDivID } = this.props;

    if (window.googletag) {
      window.googletag.cmd.push(() => {
        const slot = window.googletag.defineOutOfPageSlot(
          adURL,
          targetDivID)
          .addService(window.googletag.pubads());
        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
        window.googletag.display(targetDivID);
      });
    }
  }

  componentWillUnmount() {
    window.googletag.destroySlots();
  }

  render() {
    const { targetDivID } = this.props;

    return (
      <div id={targetDivID}></div>
    );
  }
}

export default GoogleOutOfPageAd;
