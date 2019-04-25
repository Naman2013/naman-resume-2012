import React, { PureComponent, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import './styles.scss';

export class FeaturedObjectCard extends PureComponent {
  render() {
    const { featureObject, getTelescopeSlot } = this.props;
    const {
      title,
      ownerAvatarURL,
      ownerDisplayName,
      showSloohUser,
      missionStartFormatted,
    } = featureObject;
    const {
      displayOtherTimeZones,
      displayTime,
      displayTimeZone,
      displayWeekdayMonthDayUTC,
    } = missionStartFormatted;

    return (
      <div className="featured-object-card">
        <div className="mission-title">{title}</div>

        <div className="mission-time">
          <div className="large">
            {displayTime}
            <span className="timezone">{displayTimeZone}</span>
          </div>
          <div className="other">{displayOtherTimeZones}</div>
        </div>

        <div className="featured-object-card-footer">
          <div className="mission-date">{displayWeekdayMonthDayUTC}</div>

          <Button className="option-btn" onClick={() => {}}>
            Options
          </Button>
        </div>
      </div>
    );
  }
}
