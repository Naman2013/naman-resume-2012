import React, { Component, PropTypes } from 'react';
import styles from './style/pulse-post-by.scss';

const PulsePostBy = ({ avatar, name, location, type, since }) =>
  <div className={styles.pulsePostBy}>
    
    <p><img src={avatar}/></p>
    
    <span className={styles.pulsePostByName}>{name}</span>
    <span className={styles.pulsePostByPost}>{type}</span>
    
    <br/>
    
    <span className={styles.pulsePostByFrom}>{location} Member since {since}</span>
    
  </div>;

export default PulsePostBy;

PulsePostBy.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  type: PropTypes.string,
  since: PropTypes.string
};
