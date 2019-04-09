import React, { Component } from 'react';
import moment from 'moment';
import { Modal } from 'app/components/modal';
import { AvailbleMissionTile } from '../available-mission-tile';
import { Box } from '../box';
import { ReservationModalSlotInfo } from '../reservation-modal-slot-info';
import './styles.scss';

export class TelescopeReservationModal extends Component {
  render() {
    const {
      onHide,
      show,
      selectedSlot,
      selectedTelescope,
      missionSlot,
      selectedDate,
    } = this.props;
    const { teleName } = selectedTelescope;
    const { missionStart } = selectedSlot;

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="telescope-reservation-modal-header">
          <h1 className="modal-h">
            Set Up a Mission on {teleName} at{' '}
            {moment(missionStart * 1000).format('HH:mm')} UTC
          </h1>
          <p className="modal-p">
            Set up a Mission using the Slooh Recommender, by Catalog, or by
            Coordinates. One credit is required to schedule your own Mission.
          </p>
        </div>

        <div className="telescope-reservation-modal-content">
          <div className="row">
            <div className="col-lg-8 setup-block">
              <Box>
                <ReservationModalSlotInfo
                  timeSlot={selectedSlot}
                  title={selectedDate.reservationDateFormatted}
                />
              </Box>
            </div>

            <div className="col-lg-4 reserved-mission">
              <Box inside>
                {missionSlot && missionSlot.missionAvailable ? (
                  <AvailbleMissionTile
                    title={missionSlot.title}
                    telescope={missionSlot.telescopeName}
                    description={missionSlot.explanation}
                    date={this.getMissionDate(missionSlot.missionStart)}
                    time={this.getMissionTime(missionSlot.missionStart)}
                    cancel={this.cancelMissionSlot}
                    scheduleMission={this.reserveMissionSlot}
                  />
                ) : (
                  <div className="reserved-mission-gag">
                    YOUR MISSION WILL APPEAR HERE
                  </div>
                )}
              </Box>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
