import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import './styles.scss';

const SLOT_STATUS = {
  AVAILABLE: 'available',
  NOT_AVAILABLE: 'notavailable',
};

export class MissionTimeSlot extends PureComponent {
  render() {
    const { timeSlot } = this.props;
    const {
      slotStatus,
      slotTitle,
      ownerAvatarURL,
      ownerDisplayName,
      missionStart,
    } = timeSlot;

    const missionStartTime = moment(missionStart * 1000);

    return (
      <div className="missions-list-item">
        <div className="left">
          <div className="mission-title">
            {SLOT_STATUS.AVAILABLE === slotStatus ? 'Open Slot' : slotTitle}
          </div>
          <div className="mission-owner">
            {SLOT_STATUS.AVAILABLE === slotStatus ? (
              <span>Reserve this slot soon!</span>
            ) : (
              <Fragment>
                <span>Scheduled by:</span>

                {ownerAvatarURL && (
                  <img className="owner-avatar" src={ownerAvatarURL} />
                )}

                <div className="owner-name">{ownerDisplayName}</div>
              </Fragment>
            )}
          </div>
        </div>
        <div className="right">
          <div className="actions" />
          <div className="time">
            <div className="large">
              {missionStartTime.format('HH:mm')}
              <span className="timezone">UTC</span>
            </div>
            <div className="other">
              {missionStartTime.tz('America/New_York').format('LT')} EDT /{' '}
              {missionStartTime.tz('America/Los_Angeles').format('LT')} PDT
            </div>
          </div>
        </div>
      </div>
    );
  }
}
