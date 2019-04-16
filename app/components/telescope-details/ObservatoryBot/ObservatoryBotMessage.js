import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import uniqueId from 'lodash/fp/uniqueId';
import isEmpty from 'lodash/fp/isEmpty';

const ObservatoryBotMessage = props => {
  if (isEmpty(props)) return null;
  const {
    message: { Message, DTG },
  } = props;
  return (
    <div className="observatorybot-message" key={uniqueId()}>
      <p>{moment.utc(DTG).fromNow()}</p>
      <p dangerouslySetInnerHTML={{ __html: Message }} />
    </div>
  );
};

ObservatoryBotMessage.defaultProps = {
  message: null,
};

ObservatoryBotMessage.propTypes = {
  message: PropTypes.shape({}),
};

export default ObservatoryBotMessage;
