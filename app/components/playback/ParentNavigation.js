import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import s from './ParentNavigation.scss';

/**
  TODO: this could mature into a common navigation component
*/

function ParentNavigation({ navigationItems }) {
  return (
    <div className={s.parentNavigationRoot}>
      <ul className={s.parentNavigation}>
        {
          navigationItems.map(navigationItem => (
            <li className={s.navigationItem}>
              <Link
                activeClassName={s.active}
                to={navigationItem.link}
                className={s.link}
              >
                {navigationItem.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

ParentNavigation.defaultProps = {
  navigationItems: [],
};

ParentNavigation.propTypes = {
  navigationItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })),
};

export default ParentNavigation;
