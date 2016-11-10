import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import classnames from 'classnames';
import styles from './mission-nav.scss';

/**
  TODO: WARNING: the link to RESERVE BY TELESCOPE is hard coded
  to the first observatory and first instrument for Canary Islands.
  This could cause issues in the future if either that observatory is no
  longer available, OR the ID's had changed.
  Resolve this by designing a strategy around dynamically setting the default
  observatory and instrument ID's.
*/

const DEFAULT_OBSERVATORY_ID = 'd7f673a5-7908-11e6-a635-0eb2b1774883';
const DEFAULT_INSTRUMENT_ID = '1ff72faa-7909-11e6-a635-0eb2b1774883';

class MissionNav extends Component {
  render() {
    return (
      <div className={styles.missionNav}>
        <ul className="mission-nav-container">
          <li>
            <Link href="#"
              to='/reservations/slooh-recommends'
              activeClassName="active">Slooh Recommends</Link>
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
              to={`/reservations/reserve-by-telescope/${DEFAULT_OBSERVATORY_ID}/${DEFAULT_INSTRUMENT_ID}`}
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
