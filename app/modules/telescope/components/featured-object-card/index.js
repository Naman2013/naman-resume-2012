import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import './styles.scss';

export class FeaturedObjectCard extends PureComponent {
  render() {
    const {
      featureObject,
      onOptionClick,
      reservedButtonCaption,
      optionsButtonCaption,
      readOnly,
    } = this.props;
    const {
      title,
      missionStartFormatted,
      objectIconURL,
      missionAvailable,
      userHasReservation,
      showJoiningMission,
      joiningMissionTooltipText,
      joiningMissionIconURL,
      telescopeName,
    } = featureObject;
    const {
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
            {showJoiningMission ? (   
              <Tooltip
              className="mission-tooltip"
              title={joiningMissionTooltipText}
              position="top"
              theme="light">
                  <img alt="" className="mission-icon-right" src={joiningMissionIconURL} />
              </Tooltip>) : null}
          </div>          
        </div>

        <div className="featured-object-card-footer">
          <div className="mission-date">{displayWeekdayMonthDayUTC}</div>
          <div className="mission-date">{ telescopeName }</div>
          {missionAvailable && !userHasReservation && !readOnly && (
            <Button className="option-btn" onClick={onOptionClick}>
              {optionsButtonCaption || 'Options'}
            </Button>
            )}

          {/* {userHasReservation && reservedButtonCaption && (
            <div className="reserved-mission-capture">
              {reservedButtonCaption}             
            </div>
          )} */}
        </div>
      </div>
    );
  }
}
