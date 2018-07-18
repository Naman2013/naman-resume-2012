import React from 'react';
import PropTypes from 'prop-types';
import style from './Laila.style';
import { horizontalArrow } from 'styles/variables/iconURLs';

const LailaTile = ({ iconURL, title }) => (
  <div className="root">
    <div className="container">

      <div className="icon-container">
        <div className="center-line" />
        <div className="border">
          <div className="icon">
            <img className="icon-content" alt="" width="40" height="40" src={iconURL} />
          </div>
        </div>
      </div>

      <h5 className="title">{title}</h5>
      <div className="button-container">
        <a className="button" href="#">Explore now</a>
        <img alt="" src={horizontalArrow} />
      </div>
    </div>
    <style jsx>{style}</style>
  </div>
);

LailaTile.propTypes = {
  iconURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default LailaTile;
