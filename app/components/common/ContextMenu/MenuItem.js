import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import MiraDot from 'atoms/icons/MiraDot';
import style from './MenuItem.style';

const MenuItem = ({ title, linkURL, iconUrl }) => (
  <Fragment>
    <li className="menu-item">
      <span className="item-container">
        <Link activeClassName="active" to={linkURL}>
          <span className="dot-container">
            <MiraDot />
          </span>
          {title}
        </Link>
        {iconUrl && (
          <div className="iconContainer">
            <img className="icon" src={iconUrl} />
          </div>
        )}
      </span>
    </li>
    <style jsx>{style}</style>
  </Fragment>
);

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
  iconUrl: PropTypes.string,
};

MenuItem.defaultProps = {
  iconUrl: null,
};

export default MenuItem;
