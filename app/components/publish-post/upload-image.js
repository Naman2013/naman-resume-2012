import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import ImageFile from './image-file';
import './upload-image.scss';

function UploadImage({ handleDeleteImage, handleUploadImage, displayImages, inputValue }) {
  const images =
    displayImages.map(image => (
      <ImageFile
        key={uniqueId()}
        imageURL={image}
        handleDeleteImage={handleDeleteImage}
      />
    ));

  return (
    <div>
      <i className="step-description">Upload JPEGS, GIFS, or PNGs here to add punch and meaning to your post</i>

      <div className="image-list-wrapper">
        {
          images
        }
      </div>

      <label htmlFor="image-upload" className="file-input-label">
        Browse for Image
        <input
          key={uniqueId()}
          id="image-upload"
          type="file"
          onChange={handleUploadImage}
          accept="image/*"
          value={inputValue}
          multiple
        />
      </label>
    </div>
  );
}

UploadImage.defaultProps = {
  displayImages: [],
  handleDeleteImage: () => {
    console.warn('Delete image has not been implemented.');
  },
};

UploadImage.propTypes = {
  handleDeleteImage: PropTypes.func,
  handleUploadImage: PropTypes.func.isRequired,
  displayImages: PropTypes.arrayOf(PropTypes.string),
};

export default UploadImage;
