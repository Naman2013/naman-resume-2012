import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import s from './ChildNavigation.scss';

function ChildNavigation({ navigationItems }) {
  return (
    <div className={s.childNavigationRoot}>
      <ul className={s.childNavigation}>
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

ChildNavigation.defaultProps = {
  navigationItems: [],
};

ChildNavigation.propTypes = {
  navigationItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })),
};

export default ChildNavigation;
