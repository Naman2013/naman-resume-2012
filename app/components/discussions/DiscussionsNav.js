import React from 'react';
import { Link } from 'react-router';
import styles from './discussions-nav.scss';

function DiscussionsNav() {
  return (
    <div className={styles.discussionsNav}>
      <ul className="discussions-nav-container">
        <li>
          <Link
            to="/discussions/main/most-recent"
            className="link"
            activeClassName="active"
          >
            Most recent
          </Link>
        </li>
        <li>
          <Link
            to="/discussions/main/most-active"
            className="link"
            activeClassName="active"
          >
            Most active
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default DiscussionsNav;
