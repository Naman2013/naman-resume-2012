import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'components/common/style/buttons/Button';
import uniqueId from 'lodash/uniqueId';
import styles from './input.style';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
} = PropTypes;

const ImagesInput = (props) => {
  const {
    imageInputValue,
    handleUploadImage,
  } = props;
  return (
    <div className="root">
    <label htmlFor="image-upload" className="image-upload-label">
      <span className="browse">Browse for Image</span>
      <input
        key={uniqueId()}
        id="image-upload"
        type="file"
        onChange={handleUploadImage}
        accept="image/*"
        value={imageInputValue}
      />
    </label>
      <style jsx>{styles}</style>
    </div>
  );
};

ImagesInput.propTypes = {

};

ImagesInput.defaultProps = {
};

export default ImagesInput;
