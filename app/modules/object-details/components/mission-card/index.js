import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import './styles.scss';

export class MissionCard extends PureComponent {
  render() {
    const { timeSlot, onClickHandler } = this.props;
    const {
      telescopeName,
      title,
      missionStartFormatted,
      userHasReservation,
    } = timeSlot;
    const {
      displayWeekdayMonthDayUTC,
      displayTime,
      displayTimeZone,
    } = missionStartFormatted;

    return (
      <div
        className={`missions-card${userHasReservation ? ' reserved' : ''}`}
        onClick={onClickHandler}
      >
        <div className="left">
          <div className="mission-title">{title}</div>
          <div className="mission-owner">
            <span>{telescopeName}</span>
          </div>
        </div>
        <div className="right">
          <div className="date">{displayWeekdayMonthDayUTC}</div>
          <div className="time">
            <div className="large">
              {displayTime}
              <span className="timezone">{displayTimeZone}</span>
            </div>
          </div>
        </div>

        <div className="mobile">
          <div className="actions">
            <i className="fa fa-ellipsis-h" aria-hidden="true" />
          </div>

          <div className="mission-title">{title}</div>

          <div className="time">
            <div className="large">
              {displayTime}
              <span className="timezone">{displayTimeZone}</span>
            </div>
          </div>

          <div className="mission-owner">
            <div className="date">{displayWeekdayMonthDayUTC}</div>
            <span>{telescopeName}</span>
          </div>
        </div>
      </div>
    );
  }
}
