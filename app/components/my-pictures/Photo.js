import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './Photo.scss';

function Photo({ imageURL, handlePhotoClick }) {
  const inlinePhotoStyle = {
    backgroundImage: `url(${imageURL})`,
  };

  return (
    <div className={style.photoRoot}>
      <Link onClick={handlePhotoClick} className={style.photoLink} style={inlinePhotoStyle} to="" />
    </div>
  );
}

Photo.propTypes = {
  imageURL: PropTypes.string.isRequired,
  handlePhotoClick: PropTypes.func.isRequired,
};

export default Photo;
