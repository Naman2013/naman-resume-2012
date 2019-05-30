import React, { PureComponent, Fragment } from 'react';
import Countdown from 'react-countdown-now';
import { FormattedNumber } from 'react-intl';
import { ThreeDotsMenu } from '../three-dots-menu';
import './styles.scss';

const SLOT_STATUS = {
  AVAILABLE: 'available',
  NOT_AVAILABLE: 'notavailable',
};

export class MissionTimeSlot extends PureComponent {
  render() {
    const { timeSlot, getTelescopeSlot } = this.props;
    const {
      slotStatus,
      slotTitle,
      ownerAvatarURL,
      ownerDisplayName,
      missionStartFormatted,
      showSloohUser,
      scheduledMissionId,
      expires,
      userHasHold,
    } = timeSlot;
    const {
      displayOtherTimeZones,
      displayTime,
      displayTimeZone,
    } = missionStartFormatted;
    const missionSlotOnClick =
      SLOT_STATUS.AVAILABLE === slotStatus
        ? () => getTelescopeSlot()
        : () => {};

    return (
      <div
        className={`missions-list-item${
          SLOT_STATUS.AVAILABLE === slotStatus ? ' open' : ''
        }`}
        onClick={missionSlotOnClick}
        id={`mission-slot-${scheduledMissionId}`}
      >
        <div className="left">
          <div className="mission-title">
            {slotTitle}{' '}
            {expires > 0 && userHasHold && (
              <Countdown
                date={expires * 1000}
                renderer={props => (
                  <span>
                    {props.minutes}:
                    <FormattedNumber
                      value={props.seconds}
                      minimumIntegerDigits={2}
                    />
                  </span>
                )}
              />
            )}
          </div>
          <div className="mission-owner">
            {SLOT_STATUS.AVAILABLE === slotStatus ? (
              <span>Reserve this slot soon!</span>
            ) : (
              <Fragment>
                <span>Scheduled by:</span>

                {ownerAvatarURL && (
                  <img
                    className={`owner-avatar${
                      showSloohUser ? ' slooh-user' : ''
                    }`}
                    src={ownerAvatarURL}
                  />
                )}

                {!showSloohUser && (
                  <div className="owner-name">{ownerDisplayName}</div>
                )}
              </Fragment>
            )}
          </div>
        </div>
        <div className="right">
          <div className="actions">
            <ThreeDotsMenu
              timeSlot={timeSlot}
              finnishReservation={getTelescopeSlot}
            />
          </div>
          <div className="time">
            <div className="large">
              {displayTime}
              <span className="timezone">{displayTimeZone}</span>
            </div>
            <div className="other">{displayOtherTimeZones}</div>
          </div>
        </div>

        <div className="mobile">
          <div className="actions">
            <ThreeDotsMenu
              timeSlot={timeSlot}
              finnishReservation={getTelescopeSlot}
            />
          </div>

          <div className="mission-title">
            {SLOT_STATUS.AVAILABLE === slotStatus ? 'Open Slot' : slotTitle}
          </div>

          <div className="time">
            <div className="large">
              {displayTime}
              <span className="timezone">{displayTimeZone}</span>
            </div>
            <div className="other">{displayOtherTimeZones}</div>
          </div>

          <div className="mission-owner">
            {SLOT_STATUS.AVAILABLE === slotStatus ? (
              <span>Reserve this slot soon!</span>
            ) : (
              <Fragment>
                <span>Scheduled by:</span>

                {ownerAvatarURL && (
                  <img
                    className={`owner-avatar${
                      showSloohUser ? ' slooh-user' : ''
                    }`}
                    src={ownerAvatarURL}
                  />
                )}

                {!showSloohUser && (
                  <div className="owner-name">{ownerDisplayName}</div>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
