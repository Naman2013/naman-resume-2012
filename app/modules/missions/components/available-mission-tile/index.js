import moment from 'moment';
import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import { FormattedNumber } from 'react-intl';
import Button from '../../../../components/common/style/buttons/Button';
import './styles.scss';

const getMissionDate = timestamp =>
  moment.unix(timestamp).format('ddd. MMM. DD');

const getMissionTime = timestamp => moment.unix(timestamp).format('HH:mm');

export class AvailbleMissionTile extends Component {
  render() {
    const { onSubmit, onCancel, missionSlot } = this.props;
    const { title, telescopeName, explanation, missionStart } = missionSlot;

    return (
      <div className="mission-tile">
        <div className="countdown">
          <Countdown
            date={Date.now() + 5 * 60 * 1000}
            onComplete={onCancel}
            renderer={props => (
              <div>
                Reservation ends in {props.minutes}:
                <FormattedNumber
                  value={props.seconds}
                  minimumIntegerDigits={2}
                />
              </div>
            )}
          />
        </div>
        <h5 className="title">{title}</h5>
        <div className="time">{getMissionTime(missionStart)}</div>
        <div className="info">
          <div className="date">{getMissionDate(missionStart)}</div>
          <div className="time">{getMissionTime(missionStart)}</div>
          <div className="telescope">{telescopeName}</div>
        </div>
        <div className="description">{explanation}</div>
        <div className="actions">
          <Button text="Cancel" onClickEvent={onCancel} />
          <Button text="Schedule Mission" onClickEvent={onSubmit} />
        </div>
      </div>
    );
  }
}
