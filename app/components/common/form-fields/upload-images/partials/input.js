import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'app/components/common/style/buttons/Button';
import uniqueId from 'lodash/uniqueId';
import styles from './input.style';

const {
  string,
} = PropTypes;

const ImagesInput = (props) => {
  const {
    imageInputValue,
    handleUploadImage,
    title,
  } = props;
  return (
    <div className="root">
    <label htmlFor="image-upload" className="image-upload-label">
      <span className="browse">{title}</span>
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
  title: string,
};

ImagesInput.defaultProps = {
  title: 'Browse for Image',
};

export default ImagesInput;
