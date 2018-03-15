/***********************************
* V4 Sub Page Navigation
*  Component that will navigate through the different containers of a page
*  Currently used by V4 Object Details and V4 Guide Details
***********************************/

import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const SubPageNavigation = ({ items }) => (
  <div className="navigation-root">
    <ul className="navigation">
      {
        items.map(item => (
          <li className="item" key={item.link}>
            <Link
              activeClassName="active"
              to={item.link}
            >
              <span className="link">
                {item.title}
              </span>
            </Link>
          </li>
        ))
      }
    </ul>
    <style jsx>{`

      .navigation {
        display: flex;
        flex-direction: row;
      }

      .item {
        list-style-type: none;
        padding: 0 25px;
      }

      :global(.active),
      :global(.active):link,
      :global(.active):active,
      :global(.active):visited {
        font-weight: normal;
        text-transform: none;
        display: block;
        text-decoration: none;
      }

      :global(.active) .link {
        font-weight: bold;
      }
    `}</style>
  </div>
);

SubPageNavigation.defaultProps = {
  items: [],
};

SubPageNavigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })),
};

export default SubPageNavigation;
