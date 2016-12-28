import React, { Component, PropTypes } from 'react';
import styles from './style/pulse-post-image.scss';

const PulsePostImage = ({ image, imageBy }) =>

  <figure className={styles.PulsePostImage}>
    <img src={image}/>
    <figcaption className={styles.PulsePostImageBy}>{imageBy}</figcaption>
  </figure>;


export default PulsePostImage;

PulsePostImage.propTypes = {
  image: PropTypes.string,
  imageBy: PropTypes.string,
};
