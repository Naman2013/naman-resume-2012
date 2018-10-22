import React from 'react';
import PropTypes from 'prop-types';
import { ImagePortalViewer } from './';
import { ModuleContainer } from './module-container';

const AllSkyCamera = ({ imageURL, description }) => (
  <div className="root">
    <ModuleContainer title="All sky camera snap">
      <ImagePortalViewer imageURL={imageURL} description={description} />
    </ModuleContainer>
  </div>
);

AllSkyCamera.propTypes = {
  imageURL: PropTypes.string.isRequired,
  description: PropTypes.string,
};

AllSkyCamera.defaultProps = {
  description: 'Restibulum rutrum quameli mitae fringilla lorem ipsum.',
};

export { AllSkyCamera };
