import { ThreeDotsMenu } from 'app/modules/missions/components/three-dots-menu';
import React, { PureComponent } from 'react';
import { Tooltip } from 'react-tippy';
import './styles.scss';
import Button from '../../../../components/common/style/buttons/Button';

export class ObjectMissionCard extends PureComponent {
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
      showJoiningMission,
      joiningMissionTooltipText,
      joiningMissionIconURL,
      showJoinButton,
      joinButtonCaption,
      showDetails,
      details,
      hasWeatherForecastData,
      weatherForecastData,
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
        // onClick={onClickHandler}
        role="presentation"
      >
        <div className="left">
          <div className="mission-title">{title || missionTitle}</div>
          <div className="mission-owner">
            <div>
              <span>{telescopeName || telescopePierName}</span>
              {hasWeatherForecastData && weatherForecastData && (
                <div className="weather-div">
                  <span className="description"><b>{weatherForecastData.ForecastHeading}</b>{weatherForecastData.ForecastDetails}</span>
                  <img src={weatherForecastData.ForecastIconURL} className="weather-icon"/>
                </div>
              )}
            </div>
            
            {showJoiningMission ? ( 
              <Tooltip
              className="mission-tooltip"
              title={joiningMissionTooltipText}
              position="top"
              theme="light">
                  <img alt="" className="mission-icon" src={joiningMissionIconURL} />
              </Tooltip>) : null}
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
              {showJoinButton && (
                <Button
                  text={joinButtonCaption || 'Schedule Mission'}
                  onClickEvent={onClickHandler}
                />
              )}
            </div>

            <div
              className="mission-status"
              dangerouslySetInnerHTML={{ __html: missionStatusText }}
            />
          </div>
        </div>
        {showDetails && (
          <div className="end">
            <div className="date">{details.detailsHeader}</div>
            <br/>
            <div className="details-text">{details.objectAltitude}</div>
            <div className="details-text">{details.objectAzimuth}</div>
            <div className="details-text">{details.moonAltitude}</div>
            <div className="details-text">{details.moonIllumination}</div>
          </div>
        )}
        

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
            {showJoiningMission ? ( 
              <Tooltip
              className="mission-tooltip"
              title={joiningMissionTooltipText}
              position="top"
              theme="light">
                  <img alt="" className="mission-icon" src={joiningMissionIconURL} />
              </Tooltip>) : null}
          </div>

          <div
            className="mission-status"
            dangerouslySetInnerHTML={{ __html: missionStatusText }}
          />
        </div>
      </div>
    );
  }
}
