import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './TopicHeading.style';

const TopicHeading = ({ text }) => (
  <Fragment>
    <h2>{text}</h2>
    <style jsx>{style}</style>
  </Fragment>
);

TopicHeading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TopicHeading;
