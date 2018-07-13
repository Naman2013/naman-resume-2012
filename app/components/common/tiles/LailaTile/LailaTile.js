import React from 'react';
import PropTypes from 'prop-types';
import style from './Laila.style';

const LailaTile = ({ iconURL, title }) => (
  <li className="root">
    <div className="container">
      <h5 className="title">{title}</h5>
      <a className="button" href="#">Explore now</a>
    </div>
    <style jsx>{style}</style>
  </li>
);

LailaTile.propTypes = {
  iconURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default LailaTile;
