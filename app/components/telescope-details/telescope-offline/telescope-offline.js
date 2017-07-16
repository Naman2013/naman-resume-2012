import React from 'react';
import PropTypes from 'prop-types';
import { white } from '../../../styles/variables/colors';

const propTypes = {
  imageSource: PropTypes.string.isRequired,
  offlineStatusMessage: PropTypes.string,
};

const defaultProps = {
  offlineStatusMessage: '',
};

const TelescopeOffline = ({ imageSource }) => (
  <div className="telescope-details-offline">
    <h2>OFFLINE</h2>
    <div>
      <img alt="Telescope is currently offline" height="350" src={imageSource} />
    </div>

    <style jsx>{`
      .telescope-details-offline {
        background: ${white};
        text-align: center;
        padding: 10px 0 40px;
      }
    `}</style>
  </div>
);

TelescopeOffline.propTypes = propTypes;
TelescopeOffline.defaultProps = defaultProps;

export default TelescopeOffline;
