import React, { Component, PropTypes } from 'react';
import styles from "./my-pictures-header.scss"

const MyPicturesHeader = ({ title }) =>
  <div className={styles.myPictureHeader}>
    
    <h1>{title}</h1>
    
    <div>
      <button className="button btn-primary">Upload file</button>
    </div>
  
  </div>;


export default MyPicturesHeader;

MyPicturesHeader.propTypes = {
  title: PropTypes.string
};
