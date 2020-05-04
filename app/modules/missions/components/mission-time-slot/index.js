import React, { PureComponent, Fragment } from 'react';
import Countdown from 'react-countdown-now';
import { twoDigitsTimeFormatting } from 'app/utils/time-formatting';
import { ThreeDotsMenu } from '../three-dots-menu';
import { Tooltip } from 'react-tippy';
import './styles.scss';

const SLOT_STATUS = {
  AVAILABLE: 'available',
  NOT_AVAILABLE: 'notavailable',
};

export class MissionTimeSlot extends PureComponent {
  render() {
    const {
      timeSlot,
      getTelescopeSlot,
      getMissionSlots,
      grabPiggyback,
      editCoordinates,
    } = this.props;
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
      showDotMenu,
      showDotMenuMobile,
      showNoReservations,
      noReservationsExplanation,
      showJoiningMission,
      joiningMissionIconURL,
      joiningMissionTooltipText,
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

    const title = showNoReservations ? noReservationsExplanation : slotTitle;
    
    return (
      <div
        className={`missions-list-item${
          SLOT_STATUS.AVAILABLE === slotStatus ? ' open' : ''
        }`}
        onClick={missionSlotOnClick}
        role="button"
        id={`mission-slot-${scheduledMissionId}`}
        tabIndex={0}
      >
        <div className="left">
          <div className="mission-title">
            {title}{' '}
            {expires > 0 && userHasHold && (
              <Countdown
                date={expires * 1000}
                onComplete={getMissionSlots}
                renderer={props => (
                  <span>
                    {props.minutes}:{twoDigitsTimeFormatting(props.seconds)}
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
                {noReservationsExplanation ? null : <span>Scheduled by: </span>}

                {ownerAvatarURL && (
                  <img
                    className={`owner-avatar${
                      showSloohUser ? ' slooh-user' : ''
                    }`}
                    src={ownerAvatarURL}
                    alt=""
                  />
                )}

                {!showSloohUser && (
                  <div className="owner-name">{ownerDisplayName}</div>
                )}
              </Fragment>
            )}
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
                finnishReservation={getTelescopeSlot}
                grabPiggyback={grabPiggyback}
                editCoordinates={editCoordinates}
              />
            )}
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
            {showDotMenuMobile && (
              <ThreeDotsMenu
                timeSlot={timeSlot}
                finnishReservation={getTelescopeSlot}
                grabPiggyback={grabPiggyback}
                editCoordinates={editCoordinates}
              />
            )}
          </div>

          <div className="mission-title">
            {SLOT_STATUS.AVAILABLE === slotStatus ? 'Open Slot' : title}
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
                <div>
                <span>Scheduled by: </span>

                {!showSloohUser && (
                  <div className="owner-name">{ownerDisplayName}</div>
                )}

                {ownerAvatarURL && (
                  <img
                    className={`owner-avatar${
                      showSloohUser ? ' slooh-user' : ''
                    }`}
                    src={ownerAvatarURL}
                    alt=""
                  />
                )}
                </div>
              </Fragment>
            )}
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
      </div>
    );
  }
}
