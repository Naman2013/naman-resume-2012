import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import MiraDot from 'atoms/icons/MiraDot';
import style from './MenuItem.style';

const MenuItem = ({ title, linkURL }) => (
  <Fragment>
    <li className="menu-item">
      <Link activeClassName="active" to={linkURL}>
        <span className="dot-container">
          <MiraDot />
        </span>
        {title}
      </Link>
    </li>
    <style jsx>{style}</style>
  </Fragment>
);

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
};

export default MenuItem;
