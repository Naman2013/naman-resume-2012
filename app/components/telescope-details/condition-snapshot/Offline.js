import React from 'react';
import PropTypes from 'prop-types';

export default function Offline({ offlineImageURL }) {
  return (
    <div>
      <h4 className="text-center">Offline</h4>
      <img width="60%" alt="This element is offline." src={offlineImageURL} />
    </div>
  );
}

Offline.propTypes = {
  offlineImageURL: PropTypes.string.isRequired,
};
