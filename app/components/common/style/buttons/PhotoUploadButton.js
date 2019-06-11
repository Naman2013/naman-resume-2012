import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './PhotoUploadButton.style';

const { func, number, oneOfType, string } = PropTypes;

const PhotoUploadButton = ({ handleUploadImage, disabled, id = '' }) => (
  <div className={cx('button-input-container', { disabled })}>
    <label htmlFor={`file-upload${id}`} className="file-upload-label">
      <span className="icon-clip" />
    </label>
    <input
      id={`file-upload${id}`}
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
