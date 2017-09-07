import React from 'react';
import PropTypes from 'prop-types';
import s from './image-file.scss';

function ImageFile({ handleDeleteImage, imageURL }) {
  const inlineStyle = {
    backgroundImage: `url(${imageURL})`,
  };

  return (
    <div style={inlineStyle} className="image-wrapper">
      <button
        onClick={(e) => {
          e.preventDefault();
          handleDeleteImage(imageURL);
        }}
        className={s.deleteButton}
      >
        X
      </button>
    </div>
  );
}

ImageFile.propTypes = {
  handleDeleteImage: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
};

export default ImageFile;
