import React from 'react';
import styles from './my-pictures-header.scss';

const MyPicturesHeader = ({ altText }) =>
  <div className={styles.myPictureHeader}>
    {altText ? <h1>{altText}</h1> : <h1>My Pictures</h1>}
  </div>;

export default MyPicturesHeader;
