import React from 'react';
import PropTypes from 'prop-types';

const BobbieTile = ({ HTMLBlob }) => (
  <div dangerouslySetInnerHTML={{ __html: HTMLBlob }} />
);

BobbieTile.propTypes = {
  HTMLBlob: PropTypes.string.isRequired,
};

export default BobbieTile;
