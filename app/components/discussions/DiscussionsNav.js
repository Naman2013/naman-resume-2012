import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styles from './discussions-nav.scss';

const { string } = PropTypes;

function DiscussionsNav({
  alphabeticLink,
  defaultLink,
  featuredLink,
  followedTopicsLink,
  mostRecentLink,
  mostActiveLink
}) {
  return (
    <div className={styles.discussionsNav}>
      <ul className="discussions-nav-container">
        {featuredLink && <li>
          <Link
            to={featuredLink}
            className="link"
            activeClassName="active"
          >
            Featured Threads
          </Link>
        </li>}
        {defaultLink && <li>
          <Link
            to={defaultLink}
            className="link"
            activeClassName="active"
          >
            Default
          </Link>
        </li>}
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
        {followedTopicsLink && <li>
          <Link
            to={followedTopicsLink}
            className="link"
            activeClassName="active"
          >
            Topics I Follow
          </Link>
        </li>}
      </ul>
    </div>
  );
}

DiscussionsNav.defaultProps = {
  alphabeticLink: '',
  defaultLink: '',
  featuredLink: '',
  followedTopicsLink: '',
  mostRecentLink: '',
  mostActiveLink: '',
};

DiscussionsNav.propTypes = {
  alphabeticLink: string,
  defaultLink: string,
  featuredLink: string,
  followedTopicsLink: string,
  mostRecentLink: string,
  mostActiveLink: string,
};

export default DiscussionsNav;
