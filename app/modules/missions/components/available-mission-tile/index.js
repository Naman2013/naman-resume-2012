import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router';
import Countdown from 'react-countdown-now';
import FollowObjectButton from 'app/components/object-details/FollowObjectButton';
import { twoDigitsTimeFormatting } from 'app/utils/time-formatting';
import Button from '../../../../components/common/style/buttons/Button';
import './styles.scss';

const getMissionDate = timestamp =>
  moment.utc(moment.unix(timestamp)).format('ddd. MMM. D');

const getMissionTime = timestamp =>
  moment.utc(moment.unix(timestamp)).format('HH:mm');

export class AvailbleMissionTile extends Component {

  constructor(props) {
    super(props);    
    this.state = {      
      countdown:  300000,
    };
  }

  onCountdownTick = data => {
    this.setState({ countdown: data.total });
  };

  render() {
    const {
      onSubmit,
      onCancel,
      missionSlot = {},
      byTelescope,
      tip,
      objectIconURL,
      communityMissions,
      user,
      onMissionView,
      cancelButtonCaption,
      scheduleMissionCaption,
      completeReservationPromptShort,
      piggyback,
          
    } = this.props;
    const {
      title,
      telescopeName,
      explanation,
      missionStart,
      learnButtonCaption,
      learnButtonLink,
      objectId,
      followPrompt,
      followPromptIconUrl,
      viewMissionButtonCaption,
      missionStartFormatted,
      showFollowPromptFlag,
      showLearnButton,
      hasWeatherForecastData,  
      weatherForecastData,
      joinButtonCaption,
      showJoinButton,
    } = missionSlot;
    const { displayWeekdayMonthDayUTC } = missionStartFormatted;
    const { countdown }=this.state;
    
    return (
      <div className="mission-tile">
        <div className="countdown">
          {onSubmit && !byTelescope && (
            <Countdown
              date={Date.now() + countdown}
              onComplete={onCancel}
              onTick={this.onCountdownTick}
              renderer={props => (
                <div>
                  {completeReservationPromptShort || 'Reservation ends in'}{' '}
                  {props.minutes}:{twoDigitsTimeFormatting(props.seconds)}
                </div>
              )}
            />
          )}
        </div>
        <h5 className="title">
          {objectIconURL && <img src={objectIconURL} alt="" />}
          <span>{title}</span>
        </h5>
        <div className="time">{getMissionTime(missionStart)}</div>
        <div className="info">
          <div className="date">{displayWeekdayMonthDayUTC}</div>
          <div className="time">{getMissionTime(missionStart)}</div>
          <div className="telescope">{telescopeName}</div>
        </div>
        <div className="description">{explanation}</div>
        {tip && <div className="description">{tip}</div>}

        {hasWeatherForecastData && weatherForecastData && (
          <div className="weather-div">
            <span className="description"><b>{weatherForecastData.ForecastHeading}</b>{weatherForecastData.ForecastDetails}</span>
            <img src={weatherForecastData.ForecastIconURL} className="weather-icon"/>
          </div>
        )}

        {onSubmit && (
          <div className="actions">
            <Button
              text={cancelButtonCaption || 'Cancel'}
              onClickEvent={onCancel}
            />
            {showJoinButton && (
              <Button
                text={joinButtonCaption || 'Schedule Mission'}
                onClickEvent={onSubmit}
              />
            )}            
          </div>
        )}
        {communityMissions && (
          <div className="actions community-mission-actions">
            {/* <div> */}
              {/* {!piggyback == undefined || showLearnButton ? ( */}
                {/* {showLearnButton ? (
                <Link to={learnButtonLink} className="learn-btn">
                  <Button text={learnButtonCaption} />
                </Link>
              ) : null} */}
              {/* {!piggyback || showFollowPromptFlag ? ( */}
                {/* {showFollowPromptFlag ? (
                <FollowObjectButton
                  objectId={objectId}
                  user={user}
                  followButtonText={followPrompt}
                  followButtonIconURL={followPromptIconUrl}
                />
              ) : null} */}
            {/* </div> */}
            <div>
              <Button
                text={viewMissionButtonCaption}
                onClickEvent={onMissionView}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
