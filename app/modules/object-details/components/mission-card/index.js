import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import './styles.scss';

export class MissionCard extends PureComponent {
  render() {
    const { timeSlot, onClickHandler, profileMission } = this.props;
    const {
      telescopeName,
      title,
      missionTitle,
      missionStartFormatted,
      userHasReservation,
      telescopePierName,
    } = timeSlot;
    const {
      displayWeekdayMonthDayUTC,
      displayTime,
      displayTimeZone,
    } = missionStartFormatted;

    return (
      <div
        className={`missions-card${userHasReservation ? ' reserved' : ''}${
          profileMission ? ' profile-mission' : ''
        }`}
        onClick={onClickHandler}
      >
        <div className="left">
          <div className="mission-title">{title || missionTitle}</div>
          <div className="mission-owner">
            <span>{telescopeName || telescopePierName}</span>
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

          <div className="mission-title">{title || missionTitle}</div>

          <div className="time">
            <div className="large">
              {displayTime}
              <span className="timezone">{displayTimeZone}</span>
            </div>
          </div>

          <div className="mission-owner">
            <div className="date">{displayWeekdayMonthDayUTC}</div>
            <span>{telescopeName || telescopePierName}</span>
          </div>
        </div>
      </div>
    );
  }
}
