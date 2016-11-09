import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import classnames from 'classnames';
import styles from './mission-nav.scss';

class MissionNav extends Component {
  render() {
    return (
      <div className={styles.missionNav}>
        <ul className="mission-nav-container">
          <li>
            <Link href="#" to='/reservations/slooh-recommends' activeClassName="active">Slooh Recommends</Link>
            <ul className="sub-nav">
              <li>
                <Link
                  to="/reservations/slooh-recommends/existing"
                  activeClassName="active">
                  Join Existing Missions
                </Link>
              </li>
              <li>
                <Link
                  to="/reservations/slooh-recommends/new"
                  activeClassName="active">
                  Set Up New Missions
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/reservations/reserve-by-objects"
              activeClassName="active">
              Browse popular objects
            </Link>
          </li>
          <li>
            <Link
              to="/reservations/reserve-by-telescope"
              activeClassName="active">
              Reserve by telescope
            </Link>
          </li>
          <li>
            <Link
              to="/reservations/reserve-by-catalog"
              activeClassName="active">
              Explore by catalog
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default MissionNav;
