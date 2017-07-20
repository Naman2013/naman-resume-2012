import React from 'react';
import PropTypes from 'prop-types';
import { white, red } from '../../../styles/variables/colors';

const propTypes = {
  imageSource: PropTypes.string.isRequired,
  offlineStatusMessage: PropTypes.string,
};

const defaultProps = {
  offlineStatusMessage: '',
};

const TelescopeOffline = ({ imageSource, offlineStatusMessage }) => (
  <div className="telescope-details-offline">
    <h2>OFFLINE</h2>
    <div>
      <img alt="Telescope is currently offline" height="350" src={imageSource} />
    </div>

    <div className="offlineMessage">
      <h5>{offlineStatusMessage}</h5>
    </div>

    <style jsx>{`
      .telescope-details-offline {
        background: ${white};
        text-align: center;
        padding: 10px 0 40px;
      }

      .offlineMessage {
        color: ${red};
        text-align: center;
        padding-top: 20px;
      }

      .offlineMessage h5 {
        font-size: 18px;
      }
    `}</style>
  </div>
);

TelescopeOffline.propTypes = propTypes;
TelescopeOffline.defaultProps = defaultProps;

export default TelescopeOffline;
