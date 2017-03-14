import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './discussions-nav.scss';

const { string } = PropTypes;

function DiscussionsNav({
  alphabeticLink,
  mostRecentLink,
  mostActiveLink
}) {
  return (
    <div className={styles.discussionsNav}>
      <ul className="discussions-nav-container">
        {alphabeticLink && <li>
          <Link
            to={alphabeticLink}
            className="link"
            activeClassName="active"
          >
            Alphabetical
          </Link>
        </li>}
        {mostRecentLink &&  <li>
          <Link
            to={mostRecentLink}
            className="link"
            activeClassName="active"
          >
            Most recent
          </Link>
        </li>}
        {mostActiveLink && <li>
          <Link
            to={mostActiveLink}
            className="link"
            activeClassName="active"
          >
            Most active
          </Link>
        </li>}
      </ul>
    </div>
  );
}

DiscussionsNav.defaultProps = {
  alphabeticLink: '',
  mostRecentLink: '',
  mostActiveLink: '',
};

DiscussionsNav.propTypes = {
  alphabeticLink: string,
  mostRecentLink: string,
  mostActiveLink: string,
};

export default DiscussionsNav;
