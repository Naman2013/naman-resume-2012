import React, { PureComponent, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import './styles.scss';

export class FeaturedObjectCard extends PureComponent {
  render() {
    const {
      featureObject,
      getTelescopeSlot,
      onOptionClick,
      reservedButtonCaption,
      optionsButtonCaption,
    } = this.props;
    const {
      title,
      ownerAvatarURL,
      ownerDisplayName,
      showSloohUser,
      missionStartFormatted,
      objectIconURL,
      missionAvailable,
      userHasReservation,
    } = featureObject;
    const {
      displayOtherTimeZones,
      displayTime,
      displayTimeZone,
      displayWeekdayMonthDayUTC,
    } = missionStartFormatted;

    return (
      <div
        className={`featured-object-card${
          userHasReservation ? ' reserved' : ''
        }`}
      >
        <div className="mission-title">
          <img src={objectIconURL} alt="" />
          <span>{title}</span>
        </div>

        <div className="mission-time">
          <div className="large">
            {displayTime}
            <span className="timezone">{displayTimeZone}</span>
          </div>
        </div>

        <div className="featured-object-card-footer">
          <div className="mission-date">{displayWeekdayMonthDayUTC}</div>

          {missionAvailable && !userHasReservation && (
            <Button className="option-btn" onClick={onOptionClick}>
              {optionsButtonCaption || 'Options'}
            </Button>
          )}

          {userHasReservation && reservedButtonCaption && (
            <div className="reserved-mission-capture">
              {reservedButtonCaption}
            </div>
          )}
        </div>
      </div>
    );
  }
}
