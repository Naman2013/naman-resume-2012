import React, { Component } from 'react';
import { Link } from 'react-router';
import { black } from '../../styles/variables/colors';
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

const SUBTITLE_MAP = {
  '/reservations/slooh-recommends/new':
    'Must-see seasonal wonders in focus during current livecasts',
  '/reservations/reserve-by-objects': 'See our favorite jewels in the night sky',
  '/reservations/reserve-by-catalog':
    'Schedule missions by choosing from millions of cataloged objects (Astronomers only)',
  'reserve-by-telescope': 'See the nightly schedule and reserve any open time slot',
};

class MissionNav extends Component {
  state = {
    activeSubtitle: '',
  };

  render() {
    const subtitle =
      SUBTITLE_MAP[this.props.location.pathname] || SUBTITLE_MAP['reserve-by-telescope'];
    return (
      <div className={styles.missionNav}>
        <ul className="mission-nav-container">
          <li>
            <Link to="/reservations/reserve-by-objects" activeClassName="active">
              Slooh 500
            </Link>
          </li>
          <li>
            <Link to="/reservations/slooh-recommends" activeClassName="active">
              Featured Objects
            </Link>
          </li>
          <li>
            <Link to="/reservations/reserve-by-telescope" activeClassName="active">
              By telescope
            </Link>
          </li>
          <li>
            <Link to="/reservations/reserve-by-catalog" activeClassName="active">
              By catalogs
            </Link>
          </li>
        </ul>

        <div className="description-box">
          <h3 className="section-title">{subtitle}</h3>
        </div>

        <style jsx>{`
          .description-box {
            padding-left: 26px;
          }

          .section-title {
            font-size: 16px;
            color: ${black};
          }
        `}</style>
      </div>
    );
  }
}

export default MissionNav;
