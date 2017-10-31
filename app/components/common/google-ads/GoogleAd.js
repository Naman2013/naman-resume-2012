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
        const slot = window.googletag.defineSlot(
          adURL,
          [adWidth, adHeight],
          targetDivID)
          .addService(window.googletag.pubads());
        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
        window.googletag.display(targetDivID);

        // Set timer to refresh slot every 30 seconds
        setInterval(() => {
          window.googletag.pubads().refresh([slot]);
        }, 30000);
      });
    }
  }

  componentWillUnmount() {
    window.googletag.destroySlots();
  }

  render() {
    const { targetDivID, adWidth, adHeight } = this.props;
    const adInlineStyle = {
      width: adWidth,
      height: adHeight,
    };

    return (
      <div className="root">
        <div className="advertisement" id={targetDivID} style={adInlineStyle} />
        <p>Advertisement</p>

        <style jsx>
          {`
            .root {
              text-align: center;
              margin-bottom: 10px;
            }

            .advertisement {
              margin: 0 auto;
            }

            p {
              font-size: 10px;
              margin-top: 5px;
            }
          `}</style>
      </div>
    );
  }
}

export default GoogleAd;
