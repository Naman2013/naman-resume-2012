import React from 'react';
import PropTypes from 'prop-types';
import { white, darkGray } from 'styles/variables/colors';
import { primaryFont } from 'styles/variables/fonts';

const {
  bool,
  number,
  string,
} = PropTypes;
const propTypes = {
  active: bool.isRequired,
  canDismiss: bool.isRequired,
  eventCountdown: number.isRequired,
  eventId: number.isRequired,
  eventLabel: string.isRequired,
  eventSubtitle: string.isRequired,
  eventTitle: string.isRequired,
  hasLink: bool.isRequired,
  linkLabel: string.isRequired,
  linkUrl: string.isRequired,
};

const defaultProps = {
};

const AlertTile = ({
  active,
  canDismiss,
  eventCountdown,
  eventId,
  eventLabel,
  eventSubtitle,
  eventTitle,
  hasLink,
  linkLabel,
  linkUrl,
}) => (
  <div className="root" key={eventId}>
    <h3>{eventTitle}</h3>
    {
      eventSubtitle &&
        <h5>{eventSubtitle}</h5>
    }
    <style jsx>{`
      .root {
        width: 90%;
        margin: 0 auto;
        background: ${white};
        padding: 15px;
        color: ${darkGray};
        font-family: ${primaryFont};
        margin-bottom: 10px;
      }
    `}
    </style>
  </div>
);

AlertTile.defaultProps = defaultProps;
AlertTile.propTypes = propTypes;

export default AlertTile;
