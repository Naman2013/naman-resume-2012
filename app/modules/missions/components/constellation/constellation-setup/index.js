import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Select } from 'app/components/common/select';
import Button from 'app/components/common/style/buttons/Button';
import { ReservationModalCountdown } from '../../telescope-reservation/reservation-modal-countdown';
import './styles.scss';

export class ConstellationSetup extends Component {
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
      description,
      byTelescope,
      getTelescopeSlot,
      extendedTimer,
      onCountdownTick,
      countdown,
      onCountdownComplete,
      choosePrompt,
      completeReservationPromptLong,
    } = this.props;

    return (
      <div className="constellation-setup">
        <div className="row setup-header">
          <h2>Set up a reservation by constellation!</h2>
          <p>{description}</p>
          {byTelescope && (
            <ReservationModalCountdown
              extendedTimer={extendedTimer}
              buttonOnClick={getTelescopeSlot}
              onCountdownTick={onCountdownTick}
              onCountdownComplete={onCountdownComplete}
              countdown={countdown}
              completeReservationPromptLong={completeReservationPromptLong}
            />
          )}
        </div>

        <div className="steps row">
          <div className="col-sm-6 step-1">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step1">
                  <span>Step 1 info</span>
                </Tooltip>
              }
            >
              <span>Step 1: Choose Constellation</span>
            </OverlayTrigger>
            <Select
              handleChange={setConstellation}
              options={constellationListOpt}
              placeholder={choosePrompt}
              value={selectedConstellation}
              isDisabled={disabled}
            />
          </div>

          <div className="col-sm-6 step-2">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step2">
                  <span>Step 2 info</span>
                </Tooltip>
              }
            >
              <span>Step 2: Choose Object</span>
            </OverlayTrigger>
            <Select
              handleChange={setObject}
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
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step3">
                  <span>Step 3 info</span>
                </Tooltip>
              }
            >
              {byTelescope ? (
                <span>Step 3: Click or tap to define</span>
              ) : (
                <span>Step 3: Click or tap to find</span>
              )}
            </OverlayTrigger>
          </div>

          <div className="col-sm-6 step-3">
            <Button
              text={byTelescope ? 'Define Mission' : 'Find a Mission'}
              onClickEvent={getMissionSlot}
              disabled={!selectedConstellation || !selectedObjectId || disabled}
            />
          </div>
        </div>
      </div>
    );
  }
}
