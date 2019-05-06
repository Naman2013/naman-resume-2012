import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router';
import Countdown from 'react-countdown-now';
import { FormattedNumber } from 'react-intl';
import Button from '../../../../components/common/style/buttons/Button';
import FollowObjectButton from 'app/components/object-details/FollowObjectButton.js';
import './styles.scss';

const getMissionDate = timestamp =>
  moment.utc(moment.unix(timestamp)).format('ddd. MMM. D');

const getMissionTime = timestamp =>
  moment.utc(moment.unix(timestamp)).format('HH:mm');

export class AvailbleMissionTile extends Component {
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
    } = missionSlot;
    const { displayWeekdayMonthDayUTC } = missionStartFormatted;

    return (
      <div className="mission-tile">
        <div className="countdown">
          {onSubmit && !byTelescope && (
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
        {onSubmit && (
          <div className="actions">
            <Button text="Cancel" onClickEvent={onCancel} />
            <Button text="Schedule Mission" onClickEvent={onSubmit} />
          </div>
        )}
        {communityMissions && (
          <div className="actions community-mission-actions">
            <div>
              <Link to={learnButtonLink} className="learn-btn">
                <Button text={learnButtonCaption}/>
              </Link>
              <FollowObjectButton
                objectId={objectId}
                user={user}
                followButtonText={followPrompt}
                followButtonIconURL={followPromptIconUrl}
              />
            </div>
            <div>
              <Button text={viewMissionButtonCaption} onClickEvent={onMissionView} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
