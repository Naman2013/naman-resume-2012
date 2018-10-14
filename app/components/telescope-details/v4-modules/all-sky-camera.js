import React from 'react';
import PropTypes from 'prop-types';
import { ImagePortal } from './';
import { ModuleContainer } from './module-container';
import style from './all-sky-camera.style';

const AllSkyCamera = ({ imageURL }) => (
  <div className="root">
    <ModuleContainer title="All sky camera snap">
      <div className="content">
        <ImagePortal src={imageURL} />
        <div className="vertical-line" />
        <ul className="attribute-list">
          <li>00%</li>
          <li>00%</li>
          <li>00%</li>
          <li>00%</li>
        </ul>
        <p className="copy">Restibulum rutrum quameli mitae fringilla lorem ipsum.</p>
      </div>
    </ModuleContainer>
    <style jsx>{style}</style>
  </div>
);

AllSkyCamera.propTypes = {
  imageURL: PropTypes.string.isRequired,
};

export { AllSkyCamera };
