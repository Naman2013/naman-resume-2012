import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  content: PropTypes.string,
};

const defaultProps = {
  content: '',
};

const Description = ({ content }) => (
  <p>{content}</p>
);

Description.propTypes = propTypes;
Description.defaultProps = defaultProps;

export default Description;
