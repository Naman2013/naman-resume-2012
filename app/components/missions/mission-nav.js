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
            <Link href="#" to='/slooh-recommends/existing'>Slooh Recommends</Link>
            <ul className="sub-nav">
              <li><Link to="/slooh-recommends/existing">Existing Missions</Link></li>
              <li><Link to="/slooh-recommends/new">New Missions</Link></li>
            </ul>
          </li>
          <li><Link to="reservations/reserve-by-objects">Browse popular objects</Link></li>
          <li><Link to="reservations/reserve-by-telescope">Reserve by telescope</Link></li>
          <li><a href="#">Explore by catalog</a></li>
        </ul>
      </div>
    );
  }
}

export default MissionNav;
