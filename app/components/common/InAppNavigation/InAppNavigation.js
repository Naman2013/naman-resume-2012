import React from 'react';
import PropTypes from 'prop-types';
import style from './InAppNavigation.style';
import { horizontalArrow } from 'styles/variables/iconURLs';

const InAppNavigation = ({ previousText, title }) => (
  <div className="root">
    <div className="back-text-container">
      <img className="icon-arrow" alt="" src={horizontalArrow} />
      <p className="back-text">back{previousText && ` to ${previousText}`}</p>
    </div>
    <h5 className="title">{title}</h5>
    <style jsx>{style}</style>
  </div>
);

InAppNavigation.propTypes = {
  previousText: PropTypes.string,
  title: PropTypes.string.isRequired,
};

InAppNavigation.defaultProps = {
  previousText: '',
};

export default InAppNavigation;
