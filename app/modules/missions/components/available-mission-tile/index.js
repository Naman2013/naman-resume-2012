import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from '../../../../components/common/style/buttons/Button';
import './styles.scss';

export class AvailbleMissionTile extends Component {
  render() {
    const {
      title,
      time,
      description,
      date,
      telescope,
      scheduleMission,
      cancel,
    } = this.props;

    return (
      <div className="mission-tile">
        <div className="countdown">
          <Countdown
            date={Date.now() + 5 * 60 * 1000}
            onComplete={cancel}
            renderer={props => (
              <div>
                Reservation ends in {props.minutes}:{props.seconds}
              </div>
            )}
          />
        </div>
        <h5 className="title">{title}</h5>
        <div className="time">{time}</div>
        <div className="info">
          <div className="date">{date}</div>
          <div className="time">{time}</div>
          <div className="telescope">{telescope}</div>
        </div>
        <div className="description">{description}</div>
        <div className="actions">
          <Button text="Cancel" onClickEvent={cancel} />
          <Button text="Schedule Mission" onClickEvent={scheduleMission} />
        </div>
      </div>
    );
  }
}
