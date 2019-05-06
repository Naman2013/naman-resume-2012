import React from 'react';
import PropTypes from 'prop-types';
import Image from './image';
import styles from './display.style';

const { arrayOf, func, number, shape, string } = PropTypes;

const ImagesDisplay = props => {
  const { S3URLs, handleDeleteImage } = props;
  return (
    <div className="root">
      {S3URLs.map(image => (
        <Image imageURL={image} handleDeleteImage={handleDeleteImage} />
      ))}
      <style jsx>{styles}</style>
    </div>
  );
};

ImagesDisplay.propTypes = {
  handleDeleteImage: func.isRequired,
  S3URLs: arrayOf(string),
};

ImagesDisplay.defaultProps = {
  S3URLs: [],
};

export default ImagesDisplay;
