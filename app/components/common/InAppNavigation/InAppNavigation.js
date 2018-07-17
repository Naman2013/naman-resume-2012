import React from 'react';
import PropTypes from 'prop-types';
import style from './InAppNavigation.style';

const InAppNavigation = ({ previousText, title }) => (
  <div>
    <p className="back-text">back{previousText && ` to ${previousText}`}</p>
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
