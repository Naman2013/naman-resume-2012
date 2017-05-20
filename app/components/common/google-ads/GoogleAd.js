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
    googletag.cmd.push(function() {
      googletag.defineSlot('/5626790/Community', [300, 250], 'div-gpt-ad-1495110800300-0').addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
    });
  }

  render() {
    const { targetDivID } = this.props;

    return (
      <div id={targetDivID} />
    );
  }
}

export default GoogleAd;
