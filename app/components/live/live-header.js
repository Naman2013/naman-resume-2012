import React, { Component, PropTypes } from 'react'
import UniversalTime from '../../components/common/universal-time';
import styles from './live-header.scss';


const LiveHeader = ({ list }) =>
  <header className={styles.liveHeader}>
    <span className="live">live</span>
    <h1>SPACE STADIUM</h1>
    <span className="live">live</span>
    <UniversalTime extraClass={styles.liveHeaderUTC}/>
  </header>;


export default LiveHeader;