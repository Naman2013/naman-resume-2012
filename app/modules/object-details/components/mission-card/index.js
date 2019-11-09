import { ThreeDotsMenu } from 'app/modules/missions/components/three-dots-menu';
import React, { PureComponent } from 'react';
import './styles.scss';

export class MissionCard extends PureComponent {
  render() {
    const {
      timeSlot,
      onClickHandler,
      profileMission,
      cancelReservation,
      cancelPiggyback,
      grabPiggyback,
    } = this.props;
    const {
      telescopeName,
      title,
      missionTitle,
      missionStartFormatted,
      userHasReservation,
      telescopePierName,
      showDotMenu,
      missionStatusText,
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
        role="presentation"
      >
        <div className="left">
          <div className="mission-title">{title || missionTitle}</div>
          <div className="mission-owner">
            <span>{telescopeName || telescopePierName}</span>
          </div>
        </div>
        <div className="right">
          <div className="actions">
            {showDotMenu && (
              <ThreeDotsMenu
                timeSlot={timeSlot}
                cancelReservation={() => cancelReservation(timeSlot)}
                cancelPiggyback={() => cancelPiggyback(timeSlot)}
                grabPiggyback={grabPiggyback}
              />
            )}
          </div>

          <div className="mission-info">
            <div className="mission-datetime">
              <div className="date">{displayWeekdayMonthDayUTC}</div>

              <div className="time">
                <div className="large">
                  {displayTime}
                  <span className="timezone">{displayTimeZone}</span>
                </div>
              </div>
            </div>

            <div className="mission-status" dangerouslySetInnerHTML={{ __html: missionStatusText }}/>
          </div>
        </div>

        <div className="mobile">
          <div className="actions">
            {showDotMenu && (
              <ThreeDotsMenu
                timeSlot={timeSlot}
                cancelReservation={() => cancelReservation(timeSlot)}
                cancelPiggyback={() => cancelPiggyback(timeSlot)}
                grabPiggyback={grabPiggyback}
              />
            )}
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

          <div className="mission-status" dangerouslySetInnerHTML={{ __html: missionStatusText }}/>
        </div>
      </div>
    );
  }
}
