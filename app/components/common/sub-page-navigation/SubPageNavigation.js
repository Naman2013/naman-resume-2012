/***********************************
 * V4 Sub Page Navigation
 *  Component that will navigate through the different containers of a page
 *  Currently used by V4 Object Details and V4 Guide Details
 ***********************************/

import React, { Fragment, useEffect, createRef } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import style from './SubPageNavigation.style';

const SubPageNavigation = ({ items, locationPath }) => {
  const ref = createRef();

  useEffect(() => {
    const el = ref.current.querySelector('.subnav-active');
    el.scrollIntoView({ inline: 'start' });
  }, [locationPath]);

  return (
    <Fragment>
      <ul className="subnav" id="navigationId" ref={ref}>
        {items.map(item => (
          <li className="item" key={item.link}>
            <Link
              activeClassName="subnav-active"
              className="subnav-link"
              to={item.link}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <style jsx global>
        {style}
      </style>
    </Fragment>
  );
};

SubPageNavigation.defaultProps = {
  items: [],
};

SubPageNavigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

export default SubPageNavigation;
