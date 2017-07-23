import React from 'react';
import PropTypes from 'prop-types';

const Spacer = ({ height }) => (
  <div style={{ height }} />
);

Spacer.propTypes = {
  height: PropTypes.string.isRequired,
};

export default Spacer;
