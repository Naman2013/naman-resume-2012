import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

export default function ObservatoryBotMessage({ message }) {
  return (
    <div className="observatorybot-message" key={uniqueId()}>
      <p className="short" dangerouslySetInnerHTML={{ __html: message }}/>
      <br/>
    </div>
  );
}

ObservatoryBotMessage.defaultProps = {
  message: '',
};

ObservatoryBotMessage.propTypes = {
  message: PropTypes.string,
};
