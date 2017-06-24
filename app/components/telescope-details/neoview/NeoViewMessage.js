import React from 'react';
import { PropTypes } from 'prop-types';
import uniqueId from 'lodash/uniqueId';

export default function NeoViewMessage({ message }) {
  return (
    <div className="neo-message" key={uniqueId()}>
      <div className="neo-message-text">{message}</div>
    </div>
  );
}

NeoViewMessage.defaultProps = {
  message: '',
};

NeoViewMessage.propTypes = {
  message: PropTypes.string,
};
