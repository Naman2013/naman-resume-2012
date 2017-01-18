import React, { PropTypes } from 'react';
import ImageFile from './image-file';
import style from './upload-image.scss';

function UploadImage({ handleUploadImage, displayImages }) {
  const images = displayImages.map((image, index) => <ImageFile key={index} imageURL={image} />);
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
          id="image-upload"
          type="file"
          onChange={handleUploadImage}
          accept="image/*"
          multiple
        />
      </label>
    </div>
  );
}

UploadImage.defaultProps = {
  displayImages: [],
};

UploadImage.propTypes = {
  handleUploadImage: PropTypes.func.isRequired,
  displayImages: PropTypes.arrayOf(PropTypes.string),
};

export default UploadImage;
