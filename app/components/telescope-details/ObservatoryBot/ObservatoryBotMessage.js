import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import isEmpty from 'lodash/fp/isEmpty';

const ObservatoryBotMessage = props => {
  if (isEmpty(props)) return null;
  const {
    message: { Message, DTG },
  } = props;
  return (
    <Fragment>
      <div className="observatorybot-message" key={`${Message}-${DTG}`}>
        <p dangerouslySetInnerHTML={{ __html: Message }} />
        <p className="observatorybot-message-time">
          {moment.utc(DTG).fromNow()}
        </p>
      </div>
      <hr className="hr" />
    </Fragment>
  );
};

ObservatoryBotMessage.defaultProps = {
  message: null,
};

ObservatoryBotMessage.propTypes = {
  message: PropTypes.shape({}),
};

export default ObservatoryBotMessage;
