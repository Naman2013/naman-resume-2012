import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { black, pink, gray } from '../../styles/variables/colors';


function BrowseShowsNavigation({ navigationItems }) {
  return (
    <div className="shows-navigation-root">
      <ul className="parent-navigation">
        {
          navigationItems.map(navigationItem => (
            <li className="navigation-item" key={navigationItem.title}>
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
        .shows-navigation-root {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          background: ${gray};
          padding: 10px 0;
        }

        .parent-navigation {
          display: flex;
          margin: 0;
          padding: 0;
        }

        .navigation-item {
          list-style-type: none;
          padding: 0 35px;
        }

        .link {
          font-weight: 600;
          text-transform: uppercase;
          display: block;
          color: ${black};
          text-decoration: none;
        }
        :global(.active) .link {
          border-bottom: 5px solid ${pink};
        }
      `}</style>
    </div>
  );
}

BrowseShowsNavigation.defaultProps = {
  navigationItems: [],
};

BrowseShowsNavigation.propTypes = {
  navigationItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })),
};

export default BrowseShowsNavigation;
