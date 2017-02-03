import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { iconCategory as icon } from '../../community/tools/community-icon';
import styles from '../style/pulse-popular.scss';

const PulsePopular = ({ tag, list }) =>
  <div className={styles.pulsePopular}>

    <header className={styles.pulsePopularHeader}>
      {tag ? <h4>More About <Link to="#" className="tag">{tag}</Link></h4> : <h4>Popular Posts on Slooh Pulse</h4>}
      <p>As submitted by the Slooh Community…</p>
    </header>

    <ul className={styles.pulsePopularContainer}>
      {list.map((v, k) =>
        <li key={k}>
          <img className={styles.icon} src={icon.icon[v.type]}/>
          <Link to={v.link}>{v.label}</Link>
        </li>
      )}
    </ul>

  </div>;


export default PulsePopular;

PulsePopular.propTypes = {
  list: PropTypes.array.isRequired,
  tag: PropTypes.string
};
