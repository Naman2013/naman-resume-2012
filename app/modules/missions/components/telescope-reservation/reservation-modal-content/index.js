import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Spinner } from 'app/components/spinner/index';
import { AvailbleMissionTile } from '../../available-mission-tile';
import { Box } from '../../box';
import { ReservationModalSlotInfo } from '../reservation-modal-slot-info';
import { ReservationModalTabs } from '../reservation-modal-tabs';
import { ExplanationModal } from '../../explanation-modal';
import { MissionSuccessModal } from '../../mission-success-modal';
import './styles.scss';

export class ReservationModalContent extends Component {
  state = {
    successModalShow: false,
    extendedTimer: false,
  };

  reserveMissionSlot = () => {
    const { reserveMissionSlot, missionSlot } = this.props;

    reserveMissionSlot({
      callSource: 'byTelescopeV4',
      catName: missionSlot.catName,
      catalog: missionSlot.catalog,
      designation: missionSlot.designation,
      domeId: missionSlot.domeId,
      missionStart: missionSlot.missionStart,
      missionType: missionSlot.missionType,
      objectDec: missionSlot.objectDec,
      objectIconURL: missionSlot.objectIconURL,
      objectId: missionSlot.objectId,
      objectRA: missionSlot.objectRA,
      objectTitle: missionSlot.title,
      objectType: missionSlot.objectType,
      objective: '',
      obsId: missionSlot.obsId,
      obsName: missionSlot.obsName,
      processingRecipe: missionSlot.processingRecipe,
      scheduledMissionId: missionSlot.scheduledMissionId,
      targetName: missionSlot.targetName,
      telescopeId: missionSlot.telescopeId,
      telescopeName: missionSlot.telescopeName,
      uniqueId: missionSlot.uniqueId,
    }).then(() => this.setState({ successModalShow: true }));
  };

  modalClose = () => {
    const { resetMissionsData } = this.props;
    this.setState({ successModalShow: false }, () => resetMissionsData());
  };

  cancelMissionSlot = () => {
    const { cancelMissionSlot, missionSlot } = this.props;
    const { uniqueId, scheduledMissionId } = missionSlot;

    if (missionSlot && scheduledMissionId) {
      cancelMissionSlot({
        callSource: 'byTelescopeV4',
        grabType: 'notarget',
        scheduledMissionId,
        uniqueId,
      });
    }
  };

  getTelescopeSlot = () => {
    const { getTelescopeSlot, selectedSlot } = this.props;
    const { uniqueId, scheduledMissionId } = selectedSlot;

    getTelescopeSlot({
      finalizeReservation: true,
      grabType: 'notarget',
      scheduledMissionId,
      uniqueId,
    }).then(() => this.setState({ extendedTimer: true }));
  };

  render() {
    const {
      selectedSlot,
      selectedTelescope,
      missionSlot,
      selectedDate,
      reservedMissionData,
      reservedMission,
      resetMissionsData,
      isFetching,
      isTelescopeFetching,
      onHide,
    } = this.props;
    const { teleName } = selectedTelescope;
    const { missionStart } = selectedSlot;
    const { successModalShow, extendedTimer } = this.state;

    return (
      <Fragment>
        {/* <Spinner
          loading={isFetching || isTelescopeFetching}
          text={isTelescopeFetching && 'Calculating proper time and telescope'}
        /> */}

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

                <ReservationModalTabs
                  {...this.props}
                  cancelMissionSlot={this.cancelMissionSlot}
                  getTelescopeSlot={this.getTelescopeSlot}
                  extendedTimer={extendedTimer}
                />
              </Box>
            </div>

            <div className="col-lg-4 reserved-mission">
              <Box inside>
                {missionSlot && missionSlot.missionAvailable ? (
                  <AvailbleMissionTile
                    missionSlot={missionSlot}
                    onCancel={resetMissionsData}
                    onSubmit={this.reserveMissionSlot}
                    byTelescope
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

        {missionSlot && !missionSlot.missionAvailable && (
          <ExplanationModal
            show
            onHide={onHide}
            text={missionSlot.explanation}
          />
        )}

        <MissionSuccessModal
          show={successModalShow}
          onHide={this.modalClose}
          reservedMissionData={reservedMissionData}
          reservedMission={reservedMission}
          missionSlot={missionSlot}
        />
      </Fragment>
    );
  }
}
