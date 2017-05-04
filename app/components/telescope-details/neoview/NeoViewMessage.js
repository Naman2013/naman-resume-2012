import React from 'react';
import { uniqueId } from 'lodash';
import { PropTypes } from 'prop-types';

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
