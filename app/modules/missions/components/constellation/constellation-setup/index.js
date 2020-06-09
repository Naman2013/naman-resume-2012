import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Select } from 'app/components/common/select';
import Button from 'app/components/common/style/buttons/Button';
import { ReservationModalCountdown } from '../../telescope-reservation/reservation-modal-countdown';
import './styles.scss';

export class ConstellationSetup extends Component {

  // callgetMissionSlot(){
  //   const {selectedObjectId, getMissionSlot} = this.props;   
  //   selectedObjectId ? getMissionSlot() : setTimeout(this.callgetMissionSlot.bind(this), 1000);;    
  // }
  state={
    showHoldOneHourButton: this.props.showHoldOneHourButtonWhenExpanded
  }

  render() {
    const {
      constellationListOpt,
      setConstellation,
      objectListOpts,
      setObject,
      getMissionSlot,
      selectedConstellation,
      selectedObjectId,
      disabled,
      availableMissions,
      noObjects,
      byTelescope,
      getTelescopeSlot,
      extendedTimer,
      onCountdownTick,
      countdown,
      onCountdownComplete,
      choosePrompt,
      completeReservationPromptLong,
      pageConfig,
      userHasHold,
      showHoldOneHourButtonWhenExpanded,
    } = this.props;
    const {
      header,
      step1Title,
      step1Tooltip,
      step2Title,
      step2Tooltip,
      step3ButtonCaption,
      step3Title,
      step3Tooltip,
      subheader,
    } = pageConfig;
    const { showHoldOneHourButton } = this.state;

    return (
      <div className="constellation-setup">
        <div className="row setup-header">
          <h2>{header}</h2>
          <p>{subheader}</p>
          {byTelescope && (
            <ReservationModalCountdown
              extendedTimer={extendedTimer}
              buttonOnClick={getTelescopeSlot}
              onCountdownTick={onCountdownTick}
              onCountdownComplete={onCountdownComplete}
              countdown={countdown}
              completeReservationPromptLong={completeReservationPromptLong}
              userHasHold={userHasHold}
              showHoldOneHourButtonWhenExpanded={showHoldOneHourButtonWhenExpanded}
              showHoldOneHourButton={showHoldOneHourButton}
            />
          )}
        </div>

        <div className="steps row">
          <div className="col-sm-6 step-1">
            {/* <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step1">
                  <span>{step1Tooltip}</span>
                </Tooltip>
              }
            > */}
              <span>{step1Title}</span>
            {/* </OverlayTrigger> */}
            <Select
              handleChange={setConstellation}
              options={constellationListOpt}
              placeholder={choosePrompt}
              value={selectedConstellation}
              isDisabled={disabled}
            />
          </div>

          <div className="col-sm-6 step-2">
            {/* <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step2">
                  <span>{step2Tooltip}</span>
                </Tooltip>
              }
            > */}
              <span>{step2Title}</span>
            {/* </OverlayTrigger> */}
            <Select
              handleChange={setObject}
              // handleChange={(e)=>{setObject(e); this.callgetMissionSlot()}}
              options={objectListOpts}
              placeholder={choosePrompt}
              isDisabled={objectListOpts.length === 0 || disabled}
              value={selectedObjectId}
            />

            {availableMissions && (
              <div className="explanation">
                No available missions were found
              </div>
            )}

            {noObjects && (
              <div className="explanation">
                No objects were found for {selectedConstellation}
              </div>
            )}
          </div>
        </div>

        <div className="steps row">
          <div className="col-sm-6 messages">
            {/* <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step3">
                  <span>{step3Tooltip}</span>
                </Tooltip>
              }
            > */}
              <span>{step3Title}</span>
            {/* </OverlayTrigger> */}
          </div>

          <div className="col-sm-6 step-3">
            <Button
              text={step3ButtonCaption}
              onClickEvent={()=>{getMissionSlot(); this.setState({showHoldOneHourButton:false});}}
              disabled={!selectedConstellation || !selectedObjectId || disabled}
            />
          </div>
        </div>
      </div>
    );
  }
}
