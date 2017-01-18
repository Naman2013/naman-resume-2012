import React, { PropTypes } from 'react';
import style from './image-file.scss';

function ImageFile({ imageURL }) {
  return (
    <div className="image-wrapper">
      <img src={imageURL} alt="" />
    </div>
  );
}

ImageFile.propTypes = {
  imageURL: PropTypes.string.isRequired,
};

export default ImageFile;
