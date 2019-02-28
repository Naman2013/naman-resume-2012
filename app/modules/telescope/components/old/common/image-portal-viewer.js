import React from 'react';
import PropTypes from 'prop-types';
import { ImagePortal } from '..';
import style from './image-portal-viewer.style';

const ImagePortalViewer = ({ imageURL, description }) => (
  <div className="root">
    <div className="content">
      <ImagePortal src={imageURL} />
      {
        description &&
          <div className="meta-data">
            <p className="copy">{description}</p>
          </div>
      }
    </div>
    <style jsx>{style}</style>
  </div>
);

ImagePortalViewer.propTypes = {
  imageURL: PropTypes.string.isRequired,
  description: PropTypes.string,
};

ImagePortalViewer.defaultProps = {
  description: '',
};

export { ImagePortalViewer };
