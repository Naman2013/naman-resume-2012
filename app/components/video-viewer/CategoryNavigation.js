import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { white, black, pink } from '../../styles/variables/colors';

function CategoryNavigation({ navigationItems }) {
  return (
    <div className="category-navigation-root">
      <ul className="category-navigation">
        {
          navigationItems.map(navigationItem => (
            <li className="navigation-item">
              <Link
                activeClassName="active"
                to={navigationItem.link}
              >
                <a className="link">
                  {navigationItem.title}
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
      <style jsx>{`
          .category-navigation-root {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            background: ${white};
            padding: 10px 0;
          }
          .category-navigation {
            display: flex;
            margin: 0;
            padding: 0;
          }

          .navigation-item {
            list-style-type: none;
            padding: 0 25px;
          }

          .link {
            font-weight: normal;
            text-transform: none;
            display: block;
            color: ${pink};
            text-decoration: none;
            font-size: 16px;
          }

          :global(.active) .link {
            color: ${black};
          }
        `}</style>
    </div>
  );
}

CategoryNavigation.defaultProps = {
  navigationItems: [],
};

CategoryNavigation.propTypes = {
  navigationItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })),
};

export default CategoryNavigation;
