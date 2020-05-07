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
    const { reserveMissionSlot, missionSlot, updateMissionSlot, editCoordinates } = this.props;
    const reserveMission = editCoordinates ? updateMissionSlot : reserveMissionSlot;

    reserveMission({
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
    const { resetMissionsData, onComplete } = this.props;
    this.setState(
      {
        successModalShow: false,
      },
      () => {
        resetMissionsData();
        onComplete();
      }
    );
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
    const { getTelescopeSlot, selectedSlot, onHide } = this.props;
    const { uniqueId, scheduledMissionId } = selectedSlot;

    getTelescopeSlot({
      grabType: 'placeholder',
      scheduledMissionId,
      uniqueId,
    }).then(() => onHide(false));
  };

  scrollToGrabbedMission = () => {
    this.grabedMissionTile.scrollIntoView();
  };

  render() {
    const {
      selectedSlot,
      selectedTelescope,
      missionSlot,
      selectedDate,
      reservedMissionData,
      reservedMission,
      isFetching,
      isTelescopeFetching,
      onHide,
      pageSetup,
      navigationConfig,
      editCoordinates,
      showHoldOneHourButtonWhenExpanded,
      timestamp,
      currenttime,
    } = this.props;
    const { teleName } = selectedTelescope;
    const { missionStart } = selectedSlot;
    const {
      yourMissionPrompt,
      cancelButtonCaption,
      scheduleMissionCaption,
      completeReservationPromptShort,
      updateMissionCaption,
    } = pageSetup;
    const { successModalShow, extendedTimer } = this.state;
    const {
      pageHeader1,
      pageHeader2,
      pageSubheader,
      pageSubheaderEdit,
      timeSlotPrompt,
    } = navigationConfig;
    
    return (
      <Fragment>
        {/* <Spinner
          loading={isFetching || isTelescopeFetching}
          text={isTelescopeFetching && 'Calculating proper time and telescope'}
        /> */}

        <div className="telescope-reservation-modal-header">
          <h1 className="modal-h">
            {pageHeader1} {teleName} {pageHeader2}{' '}
            {moment.utc(missionStart * 1000).format('HH:mm')} UTC
          </h1>
          <p className="modal-p">{editCoordinates ? pageSubheaderEdit : pageSubheader}</p>
        </div>

        <div className="telescope-reservation-modal-content">
          <div className="row">
            <div className="col-lg-8 setup-block">
              <Box>
                <ReservationModalSlotInfo
                  timeSlot={selectedSlot}
                  title={selectedDate.reservationDateFormatted}
                  timeSlotPrompt={timeSlotPrompt}
                />

                <ReservationModalTabs
                  {...this.props}
                  cancelMissionSlot={this.cancelMissionSlot}
                  getTelescopeSlot={this.getTelescopeSlot}
                  extendedTimer={extendedTimer}
                  scrollToGrabbedMission={this.scrollToGrabbedMission}
                  pageSetup={pageSetup}
                  navigationConfig={navigationConfig}
                  showHoldOneHourButtonWhenExpanded={showHoldOneHourButtonWhenExpanded}
                  timestamp={timestamp}
                  currenttime={currenttime}
                />
              </Box>
            </div>

            <div
              className="col-lg-4 reserved-mission"
              ref={node => (this.grabedMissionTile = node)}
            >
              <Box inside>
                {missionSlot && missionSlot.missionAvailable ? (
                  <AvailbleMissionTile
                    missionSlot={missionSlot}
                    onCancel={onHide}
                    onSubmit={this.reserveMissionSlot}
                    cancelButtonCaption={cancelButtonCaption}
                    scheduleMissionCaption={editCoordinates ? updateMissionCaption : scheduleMissionCaption}
                    completeReservationPromptShort={
                      completeReservationPromptShort
                    }
                    byTelescope
                  />
                ) : (
                  <div className="reserved-mission-gag">
                    {yourMissionPrompt}
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
          customClass="mission-success-modal"
        />
      </Fragment>
    );
  }
}
