import React from 'react';
import PropTypes from 'prop-types';
import { closeAstronaut } from 'app/styles/variables/iconURLs';
import styles from './image.style';

const {
  string,
  func,
} = PropTypes;

const Image = (props) => {
  const {
    imageURL,
    handleDeleteImage,
  } = props;
  return (
    <div className="root">
      <img className="delete-tag" src={closeAstronaut} data-url={imageURL} onClick={handleDeleteImage} />
      <div className="displayed-img-container">
        <img className="displayed-img" src={imageURL} alt="uploaded image" />
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

Image.propTypes = {
  imageURL: string.isRequired,
  handleDeleteImage: func.isRequired,
};

Image.defaultProps = {
};

export default Image;
