import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ImagePortal } from '../index';
import style from './image-portal-viewer.style';

export class ImagePortalViewer extends Component {
  render() {
    const { imageURL, title, onClick } = this.props;
    return (
      <div
        className="root image-portal-viewer"
        onClick={onClick}
        role="presentation"
      >
        <div className="content">
          <ImagePortal src={imageURL} />
          {title && (
            <div className="meta-data">
              <p className="copy">{title}</p>
            </div>
          )}
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

ImagePortalViewer.propTypes = {
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string,
};

ImagePortalViewer.defaultProps = {
  title: '',
};
