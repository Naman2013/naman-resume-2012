import React from 'react';
import PropTypes from 'prop-types';
import styles from './PhotoUploadButton.style';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const PhotoUploadButton = ({
  text,
  icon,
  handleUploadImage,
}) => (
  <div className="button-input-container">
    <label htmlFor="file-upload">
      <div
        className="button-container"
      >
        <div className="button-inner-container">
          <span className="button-text fa fa-image" />
          <div className="button-text">
            <span className="fa fa-plus" />
            <span className="text" dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </div>
      </div>
    </label>
    <input
      id="file-upload"
      type="file"
      className="upload-button"
      onChange={handleUploadImage}
      accept="image/*"
    />
    <style jsx>{styles}</style>
  </div>
);

PhotoUploadButton.propTypes = {
  text: string,
  handleUploadImage: func.isRequired,
};
PhotoUploadButton.defaultProps = {
  text: 'Photo',
};

export default PhotoUploadButton;
