/***********************************
* V4 Sub Page Navigation
*  Component that will navigate through the different containers of a page
*  Currently used by V4 Object Details and V4 Guide Details
***********************************/

import React, { Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import style from './SubPageNavigation.style';

const SubPageNavigation = ({ items }) => (
  <Fragment>
    <ul className="navigation">
      {
        items.map(item => (
          <li className="item" key={item.link}>
            <Link
              activeClassName="subnav-active"
              className="subnav-link"              
              to={item.link}
            >
              {item.title}
            </Link>
          </li>
        ))
      }
    </ul>
    <style jsx global>{style}</style>
  </Fragment>
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
