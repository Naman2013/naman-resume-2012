import React, { PropTypes } from 'react';
import styles from './style/pulse-post-image.scss';

const PulsePostImage = ({ image, imageBy }) => {
  return (
    <figure
      className={styles.PulsePostImageContainer}
    >
      <img src={image} className={styles.PulsePostImage} />
      <figcaption className={styles.PulsePostImageBy}>{imageBy}</figcaption>
    </figure>
  );
};


export default PulsePostImage;

PulsePostImage.propTypes = {
  image: PropTypes.string.isRequired,
  imageBy: PropTypes.string.isRequired,
};
