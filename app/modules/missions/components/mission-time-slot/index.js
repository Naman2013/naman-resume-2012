import React, { PureComponent, Fragment } from 'react';
import Countdown from 'react-countdown-now';
import { twoDigitsTimeFormatting } from 'app/utils/time-formatting';
import { ThreeDotsMenu } from '../three-dots-menu';
import { Tooltip } from 'react-tippy';
import './styles.scss';
import { browserHistory } from 'react-router';

const SLOT_STATUS = {
  AVAILABLE: 'available',
  NOT_AVAILABLE: 'notavailable',
};

export class MissionTimeSlot extends PureComponent {
  navigateToPublicProfile(link){
    browserHistory.push(link);
  }
  render() {
    const {
      timeSlot,
      getTelescopeSlot,
      getMissionSlots,
      grabPiggyback,
      editCoordinates,
      timestamp,
      currenttime      
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
      hasLinkFlag,
      linkUrl,
      showSlotPrompt,
      slotPromptText,
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
                date={((expires*1000) + (currenttime-(timestamp*1000)))}
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
              <span>{slotPromptText} </span>
            ) : (
              <Fragment>
                {noReservationsExplanation && !showSlotPrompt ? null : <span>{slotPromptText} </span>}                
                <div className="profile" onClick={hasLinkFlag ? ()=>{this.navigateToPublicProfile(linkUrl)} : null} >
                {ownerAvatarURL && (
                  <div className={`${showSloohUser ? '':'avatar-container'}`}>
                  <img
                    className={`owner-avatar${
                      showSloohUser ? ' slooh-user' : ''
                    }`}
                    src={ownerAvatarURL}
                    alt=""
                  />
                  </div>
                )}

                {!showSloohUser && (
                  <div className="owner-name">{ownerDisplayName}</div>
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
            {SLOT_STATUS.AVAILABLE === slotStatus ? 'Open Slot' : title}{' '}
            {expires > 0 && userHasHold && (
              <Countdown
                date={((expires*1000) + (currenttime-(timestamp*1000)))}
                onComplete={getMissionSlots}
                renderer={props => (
                  <span>
                    {props.minutes}:{twoDigitsTimeFormatting(props.seconds)}
                  </span>
                )}
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
          <div className="mission-schedule">
          {SLOT_STATUS.AVAILABLE === slotStatus ? (
              <span>{slotPromptText}</span>
            ) : showSlotPrompt ? (
              <Fragment>
                <div>
                <span>{slotPromptText}</span>               
                </div>
              </Fragment>
            ):null}
          </div>
          <div className="mission-owner">     
          <div className="profile" onClick={hasLinkFlag ? ()=>{this.navigateToPublicProfile(linkUrl)} : null} >
             {ownerAvatarURL && (
                  <div className={`${showSloohUser ? '':'avatar-container'}`}>
                  <img
                    className={`owner-avatar${
                      showSloohUser ? ' slooh-user' : ''
                    }`}
                    src={ownerAvatarURL}
                    alt=""
                  />
                  </div>
                )}
                 {!showSloohUser && (
                  <div className="owner-name">{ownerDisplayName}</div>
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
      </div>
    );
  }
}
