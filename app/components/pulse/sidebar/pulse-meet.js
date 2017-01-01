import React, { Component, PropTypes } from 'react';
import styles from '../style/pulse-meet.scss';
import PulsePostBy from '../pulse-post-by';


const PulseMeet = ({list}) =>
  <div className={styles.pulseMeet}>

    <header className={styles.pulseMeetHeader}>
      <h4>Meet the Guardian</h4>
      <p>This Slooh Member volunteers to curate this object's content</p>
    </header>

    <PulsePostBy {...list}/>

    <div className={styles.pulseMeetContainer}>{list.message}</div>

  </div>;


export default PulseMeet;

PulseMeet.propTypes = {
  list: PropTypes.object.isRequired
};