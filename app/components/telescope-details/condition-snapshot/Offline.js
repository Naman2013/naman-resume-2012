import React, { PropTypes } from 'react';

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
