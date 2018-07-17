import React from 'react';
import PropTypes from 'prop-types';
import style from './InAppNavigation.style';

const InAppNavigation = ({ previousText }) => (
  <div>
    <p className="back-text">back{previousText && ` to ${previousText}`}</p>
    <style jsx>{style}</style>
  </div>
);

InAppNavigation.propTypes = {
  previousText: PropTypes.string,
};

InAppNavigation.defaultProps = {
  previousText: '',
};

export default InAppNavigation;
