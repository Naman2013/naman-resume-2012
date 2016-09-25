import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import classnames from 'classnames';
import styles from './mission-nav.scss';

class MissionNav extends Component {
  render() {
    return (
      <div className={styles.missionNav}>
        <ul>
          <li>
            <Link href="#" to='slooh-recommends'>Slooh Recommends</Link>
          </li>
          <li>
            <ul className="sub-nav">
              <li><a href="#">Existing Missions</a></li>
              <li><a href="#">New Missions</a></li>
            </ul>
          </li>
          <li><a href="#">Browse popular objects</a></li>
          <li>
            <Link to='reserve-by-telescope'>Reserve by telescope</Link>
          </li>
          <li><a href="#">Explore by catalog</a></li>
        </ul>
      </div>
    );
  }
}

export default MissionNav;
