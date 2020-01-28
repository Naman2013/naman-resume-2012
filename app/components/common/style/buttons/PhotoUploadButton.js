import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './PhotoUploadButton.style';

const { func, number, oneOfType, string } = PropTypes;

const PhotoUploadButton = ({
  handleUploadImage,
  disabled,
  id = '',
  multiple = false,
  setRef = null,
  handleToggleModal = null,
}) => (
  <div className={cx('button-input-container', { disabled })}>
    <label
      htmlFor={`file-upload${id}`}
      className={cx(
        'file-upload-label',
        handleToggleModal ? 'use-nodal' : null
      )}
    >
      <span className="icon-clip" />
    </label>
    {handleToggleModal && (
      <div onClick={handleToggleModal} className="file-upload-button">
        <span className="icon-clip" />
      </div>
    )}
    <input
      id={`file-upload${id}`}
      type="file"
      className="upload-button"
      onChange={handleUploadImage}
      accept="image/*"
      multiple={multiple}
      ref={setRef}
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
